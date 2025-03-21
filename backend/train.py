from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import joblib
import pandas as pd

# Load dataset
df = pd.read_csv("student_performance.csv")

# Features and target
X = df.drop("Performance_Score", axis=1)
y = df["Performance_Score"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
r2 = r2_score(y_test, y_pred)
print(f"R² Score: {r2}")  # Should be > 0.8

# Save the model
joblib.dump(model, "student_performance_model.pkl")