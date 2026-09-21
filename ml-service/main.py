from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="AssetFlow Predictive Maintenance API")

try:
    model = joblib.load('model.pkl')
except Exception as e:
    model = None
    print("Warning: Model not found. Run train.py first.")

class AssetMetrics(BaseModel):
    hours_operated: float
    days_since_last_maintenance: float
    temperature_celsius: float
    vibration_mm_s: float

@app.post("/predict")
def predict_failure(metrics: AssetMetrics):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    # Format input for scikit-learn
    features = np.array([[
        metrics.hours_operated, 
        metrics.days_since_last_maintenance, 
        metrics.temperature_celsius, 
        metrics.vibration_mm_s
    ]])
    
    # Get probability of failure (class 1)
    probabilities = model.predict_proba(features)[0]
    failure_probability = float(probabilities[1])
    
    return {
        "failure_probability": round(failure_probability * 100, 2), # Return as percentage
        "risk_level": "HIGH" if failure_probability > 0.7 else "MEDIUM" if failure_probability > 0.3 else "LOW"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "model_loaded": model is not None}
