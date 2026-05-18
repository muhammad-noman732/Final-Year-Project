"""
defaulter_model.py
------------------
Student Fee Defaulter Prediction using Random Forest Classifier.
Trains on historical payment behaviour and updates DB with riskLevel, riskScore.
"""
import os
import json
import datetime
import logging
import warnings
import joblib
import psycopg2
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from dotenv import load_dotenv

from config import (
    LATE_FEE_THRESHOLD,
    DAYS_TO_PAY_THRESHOLD,
    MIN_TRAINING_SAMPLES,
    OVERDUE_OVERRIDE_SCORE,
    RISK_LEVEL_MEDIUM_THRESHOLD,
    RISK_LEVEL_HIGH_THRESHOLD,
)

warnings.simplefilter(action="ignore", category=UserWarning)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
MODELS_DIR = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODELS_DIR, "defaulter_model.pkl")

env_path = os.path.join(PROJECT_ROOT, ".env")
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)


def get_db_connection():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise ValueError("DATABASE_URL environment variable is missing!")
    if "sslmode=verify-full" in db_url:
        db_url = db_url.replace("sslmode=verify-full", "sslmode=require")
    return psycopg2.connect(db_url)


def _classify_risk(score: float, fee_status: str) -> tuple[float, str]:
    """Returns (final_score, risk_level) applying the OVERDUE floor if needed."""
    if fee_status == "OVERDUE":
        score = max(score, OVERDUE_OVERRIDE_SCORE)
    if score > RISK_LEVEL_HIGH_THRESHOLD:
        level = "HIGH"
    elif score > RISK_LEVEL_MEDIUM_THRESHOLD:
        level = "MEDIUM"
    else:
        level = "LOW"
    return score, level


def load_defaulter_data():
    """
    Fetches student features from PostgreSQL and returns (DataFrame, open connection).
    The caller is responsible for closing the connection.
    """
    conn = get_db_connection()
    try:
        logger.info("Fetching students...")
        students_df = pd.read_sql_query(
            'SELECT id AS "studentId", "currentSemester", "feeStatus", metadata FROM "Student"',
            conn,
        )

        if students_df.empty:
            return pd.DataFrame(), conn

        logger.info("Fetching fee assignments...")
        late_fees_df = pd.read_sql_query(
            '''SELECT "studentId", COUNT(*) AS "totalLateFeesApplied"
               FROM "FeeAssignment"
               WHERE "lateFeeApplied" > 0
               GROUP BY "studentId"''',
            conn,
        )

        logger.info("Fetching payments...")
        payments_df = pd.read_sql_query(
            """SELECT "studentId", "paidAt", "createdAt"
               FROM "Payment"
               WHERE status = 'COMPLETED'""",
            conn,
        )

        def get_scholarship(meta):
            if not meta:
                return 0
            try:
                d = meta if isinstance(meta, dict) else json.loads(meta)
                return 1 if d.get("scholarship") or d.get("isScholarshipHolder") else 0
            except Exception:
                return 0

        students_df["isScholarshipHolder"] = students_df["metadata"].apply(get_scholarship)

        df = pd.merge(students_df, late_fees_df, on="studentId", how="left")
        df["totalLateFeesApplied"] = df["totalLateFeesApplied"].fillna(0).astype(int)

        payments_df["paidAt"] = pd.to_datetime(payments_df["paidAt"], utc=True)
        payments_df["createdAt"] = pd.to_datetime(payments_df["createdAt"], utc=True)
        payments_df["daysToPay"] = (payments_df["paidAt"] - payments_df["createdAt"]).dt.days
        payments_df["daysToPay"] = payments_df["daysToPay"].clip(lower=0)

        avg_days_df = payments_df.groupby("studentId")["daysToPay"].mean().reset_index()
        avg_days_df.columns = ["studentId", "averageDaysToPay"]

        df = pd.merge(df, avg_days_df, on="studentId", how="left")
        df["averageDaysToPay"] = df["averageDaysToPay"].fillna(0).astype(int)
        df = df.drop(columns=["metadata"])

        return df, conn
    except Exception:
        conn.close()
        raise


def train_defaulter_model():
    """
    Trains Random Forest Classifier and writes riskLevel/riskScore/lastPredictionAt
    back to the Student table. Returns a summary string.
    """
    df, conn = load_defaulter_data()
    try:
        if df.empty:
            return "No student records found."

        if len(df) < MIN_TRAINING_SAMPLES:
            return (
                f"Not enough student records to train "
                f"(need at least {MIN_TRAINING_SAMPLES}, got {len(df)})."
            )

        logger.info("Loaded %d students for training.", len(df))

        df["isDefaulter"] = (
            (df["feeStatus"] == "OVERDUE")
            | (df["totalLateFeesApplied"] > LATE_FEE_THRESHOLD)
            | (df["averageDaysToPay"] > DAYS_TO_PAY_THRESHOLD)
        ).astype(int)

        X = df[["currentSemester", "totalLateFeesApplied", "averageDaysToPay", "isScholarshipHolder"]]
        y = df["isDefaulter"]

        logger.info("Training Random Forest Classifier...")
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)

        os.makedirs(MODELS_DIR, exist_ok=True)
        joblib.dump(model, MODEL_PATH)
        logger.info("Model saved -> %s", MODEL_PATH)

        probabilities = model.predict_proba(X)[:, 1] * 100
        now = datetime.datetime.now()
        update_query = """
            UPDATE "Student"
            SET "riskLevel" = %s, "riskScore" = %s, "lastPredictionAt" = %s
            WHERE id = %s
        """
        cur = conn.cursor()
        try:
            for idx, row in df.iterrows():
                score, level = _classify_risk(float(probabilities[idx]), row["feeStatus"])
                cur.execute(update_query, (level, round(score, 2), now, row["studentId"]))
            conn.commit()
        finally:
            cur.close()

        msg = f"Done — {len(df)} students updated in DB."
        logger.info(msg)
        return msg
    finally:
        conn.close()


def load_defaulter_model():
    """Returns the trained model or raises FileNotFoundError if not yet trained."""
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Defaulter model not trained yet. Call /train-defaulter first.")
    return joblib.load(MODEL_PATH)


def run_defaulter_prediction():
    """
    Loads the already-trained model and refreshes riskLevel/riskScore in the DB
    without retraining.
    """
    df, conn = load_defaulter_data()
    try:
        if df.empty:
            return "No student records found."

        logger.info("Running predictions on %d students using saved model...", len(df))
        model = load_defaulter_model()

        X = df[["currentSemester", "totalLateFeesApplied", "averageDaysToPay", "isScholarshipHolder"]]
        probabilities = model.predict_proba(X)[:, 1] * 100

        now = datetime.datetime.now()
        update_query = """
            UPDATE "Student"
            SET "riskLevel" = %s, "riskScore" = %s, "lastPredictionAt" = %s
            WHERE id = %s
        """
        cur = conn.cursor()
        try:
            for idx, row in df.iterrows():
                score, level = _classify_risk(float(probabilities[idx]), row["feeStatus"])
                cur.execute(update_query, (level, round(score, 2), now, row["studentId"]))
            conn.commit()
        finally:
            cur.close()

        msg = f"Prediction complete — {len(df)} student risk profiles synced."
        logger.info(msg)
        return msg
    finally:
        conn.close()
