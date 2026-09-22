import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Mock training data: [hours_operated, days_since_last_maintenance, temperature_celsius, vibration_mm_s]
# Label: 1 (will fail soon), 0 (healthy)
data = {
    'hours': [100, 5000, 200, 8000, 1500, 9000, 50, 7500],
    'days_no_maint': [10, 300, 20, 365, 40, 400, 5, 200],
    'temp': [40, 85, 45, 95, 50, 90, 35, 80],
    'vib': [0.5, 5.5, 0.6, 6.0, 1.0, 7.5, 0.2, 4.0],
    'failure': [0, 1, 0, 1, 0, 1, 0, 1]
}

df = pd.DataFrame(data)
X = df[['hours', 'days_no_maint', 'temp', 'vib']]
y = df['failure']

model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X, y)

joblib.dump(model, 'model.pkl')
print("Model trained and saved to model.pkl")
