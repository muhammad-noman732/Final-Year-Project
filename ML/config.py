"""
config.py
---------
Central configuration for all ML model thresholds and tuneable constants.
Adjust these values to tune classification sensitivity without touching model code.
"""

# ── Defaulter Classification ──────────────────────────────────────────────────
# A student is labelled a defaulter during training if ANY condition is true:
LATE_FEE_THRESHOLD: int = 2        # Late-fee incidents needed to flag as defaulter
DAYS_TO_PAY_THRESHOLD: int = 15    # Avg days from fee creation → payment to flag
MIN_TRAINING_SAMPLES: int = 5      # Minimum student records required to train

# ── Risk Score Overrides ──────────────────────────────────────────────────────
OVERDUE_OVERRIDE_SCORE: float = 98.0  # Floor score forced onto currently OVERDUE students

# ── Risk Level Bucketing ──────────────────────────────────────────────────────
# score <= MEDIUM_THRESHOLD        → LOW
# MEDIUM_THRESHOLD < score <= HIGH → MEDIUM
# score > HIGH_THRESHOLD           → HIGH
RISK_LEVEL_MEDIUM_THRESHOLD: float = 40.0
RISK_LEVEL_HIGH_THRESHOLD: float = 75.0

# ── Forecasting ───────────────────────────────────────────────────────────────
MIN_HISTORICAL_DAYS: int = 5        # Minimum days of payment history needed to train
FORECAST_SCHEDULED_WEIGHT: float = 0.6  # Weight on scheduled due amounts when blending
                                         # blended = max(ml_estimate, scheduled * weight)
