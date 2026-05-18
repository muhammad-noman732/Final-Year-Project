"""
forecasting_model.py
---------------------
30-Day Revenue Forecasting Model for VC Dashboard.

Approach:
1. Load historical completed payments grouped by date.
2. Engineer time features (day_of_week, day_of_month, month, week_of_year).
3. Train LinearRegression on those features vs daily collected amount.
4. Predict the expected daily collection for the next 30 days.
5. Overlay upcoming unpaid fee assignment due amounts to enrich the forecast.
6. Save model to ML/models/forecasting_model.pkl.
"""
import os
import datetime
import logging
import warnings
import joblib
import psycopg2
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from dotenv import load_dotenv

from config import MIN_HISTORICAL_DAYS, FORECAST_SCHEDULED_WEIGHT

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
MODEL_PATH = os.path.join(MODELS_DIR, "forecasting_model.pkl")

env_path = os.path.join(PROJECT_ROOT, ".env")
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)


def get_db_connection():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise ValueError("DATABASE_URL environment variable is missing!")
    return psycopg2.connect(db_url)


def load_forecasting_data():
    """
    Loads historical payment data and upcoming fee assignment deadlines.
    Returns:
        daily_df    - aggregated historical payment amounts per day
        upcoming_df - unpaid/overdue fee assignments due in next 30 days
        conn        - open DB connection (caller must close)
    """
    conn = get_db_connection()
    try:
        logger.info("Fetching historical completed payments...")
        payments_df = pd.read_sql_query(
            """SELECT "paidAt", amount
               FROM "Payment"
               WHERE status = 'COMPLETED' AND "paidAt" IS NOT NULL""",
            conn,
        )

        payments_df["paidAt"] = pd.to_datetime(payments_df["paidAt"], utc=True)
        payments_df["date"] = payments_df["paidAt"].dt.date
        daily_df = (
            payments_df.groupby("date")["amount"]
            .sum()
            .reset_index()
            .rename(columns={"amount": "totalAmount"})
        )
        daily_df["date"] = pd.to_datetime(daily_df["date"])

        logger.info("Fetching upcoming unpaid fee assignments (next 30 days)...")
        today = datetime.date.today()
        future_30 = today + datetime.timedelta(days=30)
        upcoming_df = pd.read_sql_query(
            f"""SELECT "dueDate", SUM("amountDue" - "amountPaid") AS "expectedAmount"
                FROM "FeeAssignment"
                WHERE status IN ('UNPAID', 'PARTIAL', 'OVERDUE')
                  AND "dueDate" >= '{today}'
                  AND "dueDate" <= '{future_30}'
                GROUP BY "dueDate"
                ORDER BY "dueDate" ASC""",
            conn,
        )
        upcoming_df["dueDate"] = pd.to_datetime(upcoming_df["dueDate"], utc=True)

        return daily_df, upcoming_df, conn
    except Exception:
        conn.close()
        raise


def _build_features(dates: pd.Series) -> pd.DataFrame:
    """Converts a Series of dates into ML feature columns."""
    df = pd.DataFrame({"date": pd.to_datetime(dates)})
    df["day_of_week"] = df["date"].dt.dayofweek
    df["day_of_month"] = df["date"].dt.day
    df["month"] = df["date"].dt.month
    df["week_of_year"] = df["date"].dt.isocalendar().week.astype(int)
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)
    return df[["day_of_week", "day_of_month", "month", "week_of_year", "is_weekend"]]


def train_forecasting_model():
    """
    Trains a LinearRegression model on historical daily payment amounts.
    Saves model + scaler artifact to ML/models/forecasting_model.pkl.
    Returns a preview dict of next-30-day forecast.
    """
    daily_df, upcoming_df, conn = load_forecasting_data()
    conn.close()

    if len(daily_df) < MIN_HISTORICAL_DAYS:
        return {
            "status": "warning",
            "message": (
                f"Not enough historical payment data to train "
                f"(need at least {MIN_HISTORICAL_DAYS} days)."
            ),
            "forecast": [],
        }

    logger.info("Training on %d historical day records...", len(daily_df))

    X_train = _build_features(daily_df["date"])
    y_train = daily_df["totalAmount"].values

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_train)

    model = LinearRegression()
    model.fit(X_scaled, y_train)

    os.makedirs(MODELS_DIR, exist_ok=True)
    joblib.dump({"model": model, "scaler": scaler}, MODEL_PATH)
    logger.info("Model saved -> %s", MODEL_PATH)

    forecast = _generate_forecast(model, scaler, upcoming_df)
    total_predicted = sum(d["predictedAmount"] for d in forecast)
    logger.info("Done — predicted PKR %,.0f over next 30 days.", total_predicted)

    return {
        "status": "success",
        "message": f"Forecasting model trained. Predicted PKR {total_predicted:,.0f} over next 30 days.",
        "forecast": forecast,
    }


def _generate_forecast(model, scaler, upcoming_df: pd.DataFrame) -> list:
    """
    Generates daily predictions for the next 30 days.
    Blends ML estimate with scheduled due amounts using FORECAST_SCHEDULED_WEIGHT.
    """
    today = datetime.date.today()
    future_dates = [today + datetime.timedelta(days=i) for i in range(1, 31)]
    future_series = pd.to_datetime(future_dates)

    X_future = _build_features(future_series)
    predictions = np.clip(model.predict(scaler.transform(X_future)), 0, None)

    upcoming_map: dict[datetime.date, float] = {}
    for _, row in upcoming_df.iterrows():
        d = row["dueDate"].date() if hasattr(row["dueDate"], "date") else row["dueDate"]
        upcoming_map[d] = float(row["expectedAmount"])

    forecast = []
    for i, date in enumerate(future_dates):
        ml_amount = round(float(predictions[i]), 2)
        scheduled = round(upcoming_map.get(date, 0), 2)
        blended = (
            round(max(ml_amount, scheduled * FORECAST_SCHEDULED_WEIGHT), 2)
            if scheduled > 0
            else ml_amount
        )
        forecast.append({
            "date": date.isoformat(),
            "predictedAmount": blended,
            "mlEstimate": ml_amount,
            "scheduledDue": scheduled,
        })

    return forecast


def get_30day_forecast() -> dict:
    """
    Loads trained model and returns 30-day forecast.
    Fetches latest upcoming unpaid amounts from DB for the scheduled overlay.
    """
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Forecasting model not trained yet. Call /train-forecast first.")

    artifact = joblib.load(MODEL_PATH)
    model = artifact["model"]
    scaler = artifact["scaler"]

    conn = get_db_connection()
    try:
        today = datetime.date.today()
        future_30 = today + datetime.timedelta(days=30)
        upcoming_df = pd.read_sql_query(
            f"""SELECT "dueDate", SUM("amountDue" - "amountPaid") AS "expectedAmount"
                FROM "FeeAssignment"
                WHERE status IN ('UNPAID', 'PARTIAL', 'OVERDUE')
                  AND "dueDate" >= '{today}'
                  AND "dueDate" <= '{future_30}'
                GROUP BY "dueDate"
                ORDER BY "dueDate" ASC""",
            conn,
        )
        upcoming_df["dueDate"] = pd.to_datetime(upcoming_df["dueDate"], utc=True)
    finally:
        conn.close()

    forecast = _generate_forecast(model, scaler, upcoming_df)
    total = sum(d["predictedAmount"] for d in forecast)
    return {
        "status": "success",
        "totalPredicted30Days": round(total, 2),
        "currency": "PKR",
        "forecast": forecast,
    }
