"""
ml_server.py
------------
Unified FastAPI server that exposes APIs for BOTH ML models:
  1. Defaulter Prediction   (from defaulter_model.py)
  2. 30-Day Revenue Forecast (from forecasting_model.py)

Usage:
  python ML/ml_server.py                  - Start FastAPI server on port 8000
  python ML/ml_server.py --train-all      - Train both models from DB and exit
  python ML/ml_server.py --port 8001      - Start server on custom port
"""
import os
import sys
import argparse
import logging
import uvicorn
from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from defaulter_model import (
    train_defaulter_model,
    load_defaulter_model,
    run_defaulter_prediction,
)
from forecasting_model import (
    train_forecasting_model,
    get_30day_forecast,
)
from config import RISK_LEVEL_MEDIUM_THRESHOLD, RISK_LEVEL_HIGH_THRESHOLD

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="GCUF Intelligent Fee ML Engine",
    description="Defaulter Prediction + 30-Day Revenue Forecasting APIs",
    version="2.0",
)


# ─── Pydantic Schemas ────────────────────────────────────────────────────────

class StudentFeatures(BaseModel):
    studentId: str
    currentSemester: int
    totalLateFeesApplied: int
    averageDaysToPay: int
    isScholarshipHolder: int  # 1 or 0

class PredictionResponse(BaseModel):
    studentId: str
    riskScore: float
    riskLevel: str


# ─── Health Check ────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"message": "GCUF Intelligent Fee ML Engine v2.0 is online."}


# ═══════════════════════════════════════════════════════════════════════════════
# DEFAULTER MODEL ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════════

@app.post("/train-defaulter")
def api_train_defaulter():
    """Train defaulter model from live DB and sync riskLevel/riskScore back."""
    try:
        msg = train_defaulter_model()
        return {"status": "success", "message": msg}
    except Exception as e:
        logger.exception("Defaulter training failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict-defaulters-db")
def api_predict_defaulters_db():
    """Run risk predictions using already trained model and update DB."""
    try:
        msg = run_defaulter_prediction()
        return {"status": "success", "message": msg}
    except Exception as e:
        logger.exception("DB prediction run failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict", response_model=List[PredictionResponse])
def api_predict_defaulters(data: List[StudentFeatures]):
    """Predict defaulter risk for a list of students using the trained model."""
    try:
        import pandas as pd
        model = load_defaulter_model()

        df = pd.DataFrame([d.dict() for d in data])
        X = df[["currentSemester", "totalLateFeesApplied", "averageDaysToPay", "isScholarshipHolder"]]
        probabilities = model.predict_proba(X)[:, 1] * 100

        results = []
        for idx, row in df.iterrows():
            score = round(float(probabilities[idx]), 2)
            if score > RISK_LEVEL_HIGH_THRESHOLD:
                level = "HIGH"
            elif score > RISK_LEVEL_MEDIUM_THRESHOLD:
                level = "MEDIUM"
            else:
                level = "LOW"
            results.append(PredictionResponse(
                studentId=row["studentId"],
                riskScore=score,
                riskLevel=level,
            ))
        return results
    except FileNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.exception("Inline prediction failed")
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════════════════════════════════════════════
# FORECASTING MODEL ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════════

@app.post("/train-forecast")
def api_train_forecast():
    """Train 30-day revenue forecasting model from historical payments."""
    try:
        result = train_forecasting_model()
        return result
    except Exception as e:
        logger.exception("Forecast training failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/forecast")
def api_get_forecast():
    """Get 30-day revenue forecast using trained model + live scheduled fees."""
    try:
        result = get_30day_forecast()
        return result
    except FileNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.exception("Forecast retrieval failed")
        raise HTTPException(status_code=500, detail=str(e))


# ═══════════════════════════════════════════════════════════════════════════════
# COMBINED TRAIN-ALL ENDPOINT
# ═══════════════════════════════════════════════════════════════════════════════

@app.post("/train-all")
def api_train_all():
    """Train both models (defaulter + forecasting) in sequence."""
    results = {}

    try:
        results["defaulter"] = train_defaulter_model()
    except Exception as e:
        logger.exception("Defaulter training failed in train-all")
        results["defaulter"] = f"ERROR: {e}"

    try:
        forecast_result = train_forecasting_model()
        results["forecast"] = forecast_result.get("message", str(forecast_result))
    except Exception as e:
        logger.exception("Forecast training failed in train-all")
        results["forecast"] = f"ERROR: {e}"

    return {"status": "success", "results": results}


# ─── CLI Entry Point ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="GCUF Intelligent Fee ML Engine")
    parser.add_argument("--train-all", action="store_true", help="Train both models from DB then exit")
    parser.add_argument("--port", type=int, default=8000, help="Port for FastAPI server (default: 8000)")
    args = parser.parse_args()

    if args.train_all:
        logger.info("=" * 60)
        logger.info("  TRAINING ALL MODELS FROM DATABASE")
        logger.info("=" * 60)

        logger.info("[1/2] Training Defaulter Prediction Model...")
        try:
            msg = train_defaulter_model()
            logger.info("[OK] %s", msg)
        except Exception as e:
            logger.error("[FAIL] Defaulter training failed: %s", e)
            sys.exit(1)

        logger.info("[2/2] Training Revenue Forecasting Model...")
        try:
            result = train_forecasting_model()
            logger.info("[OK] %s", result.get("message", result))
        except Exception as e:
            logger.error("[FAIL] Forecast training failed: %s", e)
            sys.exit(1)

        logger.info("ALL MODELS TRAINED SUCCESSFULLY!")
        sys.exit(0)
    else:
        logger.info("Starting GCUF ML Engine on port %d...", args.port)
        uvicorn.run(app, port=args.port)
