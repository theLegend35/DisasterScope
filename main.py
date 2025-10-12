from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pandas as pd
import numpy as np

# === Setup app ===
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Load historical FEMA data ===
CSV_PATH = os.path.join(os.path.dirname(__file__), "data", "DisasterDeclarationsSummaries.csv")
historical_df = pd.read_csv(CSV_PATH, low_memory=False)

# Normalize fields to match model input
historical_df["incidentType"] = historical_df["incidentType"].astype(str).str.lower().str.strip()
historical_df["state"] = historical_df["state"].astype(str).str.upper().str.strip()
historical_df["designatedArea"] = (
    historical_df["designatedArea"]
    .astype(str)
    .str.replace(r"\s*\(County\)$", "", regex=True)
    .str.upper()
    .str.strip()
)
historical_df["declarationType"] = historical_df["declarationType"].astype(str).str.upper().str.strip()

# === Load model ===
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "risk_model_pipeline.joblib")
model = joblib.load(MODEL_PATH)

# === Disaster types ===
DISASTER_TYPES = [
    "hurricane", "flood", "fire", "tornado", "winter storm", "drought"
]

STORM_TYPES = ["hurricane", "flood", "tornado", "winter storm"]

DISASTER_MAX = {
    "hurricane": 15,
    "flood": 20,
    "fire": 12,
    "tornado": 10,
    "winter storm": 18,
    "drought": 8
}

# === Severity weight function ===
def severity_weight(state, county, dtype):
    subset = historical_df[
        (historical_df["state"] == state) &
        (historical_df["designatedArea"] == county) &
        (historical_df["incidentType"] == dtype)
    ]
    if subset.empty:
        return 0.5  # fallback weight if no match

    weight = 0
    for _, row in subset.iterrows():
        if row["declarationType"] == "DR":
            weight += 2
        elif row["declarationType"] == "EM":
            weight += 1
        elif row["declarationType"] == "FM":
            weight += 0.5

        weight += row.get("iaProgramDeclared", 0)
        weight += row.get("paProgramDeclared", 0)
        weight += row.get("hmProgramDeclared", 0)

    return min(weight / len(subset), 3.0)

# === Score normalization
def normalize(score, dtype, severity):
    max_val = DISASTER_MAX.get(dtype, 12.5)
    scaled = np.log1p(score * severity) / np.log1p(max_val)
    return round(min(scaled * 100, 100), 2)

# === Recent event lookup
def get_recent_event(state: str, county: str, dtype: str) -> str:
    subset = historical_df[
        (historical_df["state"] == state) &
        (historical_df["designatedArea"] == county) &
        (historical_df["incidentType"] == dtype)
    ]
    if not subset.empty:
        if "declarationDate" in subset.columns:
            subset = subset.sort_values("declarationDate", ascending=False)
        row = subset.iloc[0]
        year = pd.to_datetime(row.get("declarationDate", ""), errors="coerce").year
        return f"{dtype.title()} in {county.title()}, {state} ({year})" if year else f"{dtype.title()} in {county.title()}, {state}"

    # fallback to state-level
    state_subset = historical_df[
        (historical_df["state"] == state) &
        (historical_df["incidentType"] == dtype)
    ]
    if not state_subset.empty:
        state_subset = state_subset.sort_values("declarationDate", ascending=False)
        row = state_subset.iloc[0]
        year = pd.to_datetime(row.get("declarationDate", ""), errors="coerce").year
        return f"{dtype.title()} in {state} ({year})" if year else f"{dtype.title()} in {state}"

    return "No recent event found"

# === Request model ===
class Location(BaseModel):
    state: str
    county: str

# === Main endpoint ===
@app.post("/risk")
def get_risk(loc: Location):
    try:
        state_norm = loc.state.upper().strip()
        county_norm = loc.county.upper().strip()

        rows = [
            {"state": state_norm, "designatedArea": county_norm, "incidentType": dtype}
            for dtype in DISASTER_TYPES
        ]
        input_df = pd.DataFrame(rows)
        preds = model.predict(input_df)

        scores = {}
        events = {}
        for dtype, score in zip(DISASTER_TYPES, preds):
            severity = severity_weight(state_norm, county_norm, dtype)
            scores[dtype] = normalize(score, dtype, severity) if severity > 0 else 0.0
            events[dtype] = get_recent_event(state_norm, county_norm, dtype)

        # Add storm average
        storm_scores = [scores[d] for d in STORM_TYPES if d in scores]
        if storm_scores:
            scores["storm"] = round(sum(storm_scores) / len(storm_scores), 2)

        return {"ok": True, "scores": scores, "events": events}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
