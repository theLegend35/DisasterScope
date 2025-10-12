import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, FunctionTransformer
from sklearn.feature_extraction import FeatureHasher
from sklearn.metrics import mean_squared_error
import joblib
import numpy as np

from preprocessors import get_county_array, wrap_list

# === Load CSV ===
csv_path = os.path.join(os.path.dirname(__file__), "data", "DisasterDeclarationsSummaries.csv")
df = pd.read_csv(csv_path, low_memory=False)

# === Normalize fields ===
df["incidentType"] = df["incidentType"].astype(str).str.lower().str.strip()
df["state"] = df["state"].astype(str).str.upper().str.strip()
df["designatedArea"] = (
    df["designatedArea"]
    .astype(str)
    .str.replace(r"\s*\(County\)$", "", regex=True)
    .str.upper()
    .str.strip()
)

# === Group similar disaster types ===
GROUP_MAP = {
    "hurricane": "hurricane",
    "typhoon": "hurricane",
    "tropical storm": "hurricane",
    "fire": "fire",
    "flood": "flood",
    "snowstorm": "winter storm",
    "winter storm": "winter storm",
    "icestorm": "winter storm",
    "severe storm": "severe storm",
    "tornado": "tornado",
    "biological": "biological",
    "dam/levee break": "infrastructure",
    "volcanic": "volcanic",
    "drought": "drought",
    "toxic substance": "hazmat",
    "mudslide": "landslide",
    "landslide": "landslide"
}

df["incidentType"] = df["incidentType"].map(GROUP_MAP).dropna()

# === Features & target ===
X = df[["state", "designatedArea", "incidentType"]].copy()
y = (
    df.groupby(["state", "designatedArea", "incidentType"])["disasterNumber"]
    .count()
    .reset_index(name="count")
)
X = pd.merge(X, y, on=["state", "designatedArea", "incidentType"], how="left")
target = X.pop("count").fillna(0)

# === Preprocessor ===
ohe = OneHotEncoder(handle_unknown="ignore")
county_transform = Pipeline([
    ("to_str", FunctionTransformer(get_county_array)),
    ("wrap", FunctionTransformer(wrap_list, validate=False)),
    ("hash", FeatureHasher(n_features=32, input_type="string")),
])
preprocessor = ColumnTransformer(
    transformers=[
        ("state_type", ohe, ["state", "incidentType"]),
        ("county", county_transform, ["designatedArea"]),
    ],
    remainder="drop",
)

# === Model pipeline ===
model = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(n_estimators=200, random_state=42)),
])

# === Train/test split ===
X_train, X_test, y_train, y_test = train_test_split(X, target, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# === Evaluate ===
rmse = mean_squared_error(y_test, model.predict(X_test)) ** 0.5
print(f"Validation RMSE: {rmse:.4f}")

# === Save model ===
model_path = os.path.join(os.path.dirname(__file__), "model", "risk_model_pipeline.joblib")
os.makedirs(os.path.dirname(model_path), exist_ok=True)
joblib.dump(model, model_path)
print(f"Saved pipeline to {model_path}")
