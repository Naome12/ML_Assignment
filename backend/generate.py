import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(19)

# Generate synthetic data
n_rows = 550
data = {
    "Hours_Studied": np.round(np.random.uniform(1, 10, n_rows), 1),
    "Sleep_Hours": np.round(np.random.uniform(4, 10, n_rows), 1),
    "Physical_Activity": np.round(np.random.uniform(0, 10, n_rows), 1),
    "Extracurricular_Activities": np.random.randint(0, 5, n_rows),
    "Healthy_Diet": np.random.randint(0, 2, n_rows),
    "Previous_Score": np.round(np.random.uniform(50, 100, n_rows), 1),
}

# Calculate Performance_Score with some noise
data["Performance_Score"] = np.round(
    0.5 * data["Hours_Studied"] +
    0.3 * data["Sleep_Hours"] +
    0.2 * data["Physical_Activity"] +
    0.1 * data["Extracurricular_Activities"] +
    0.4 * data["Healthy_Diet"] +
    0.6 * data["Previous_Score"] +
    np.random.normal(0, 5, n_rows),
    1  # Round to 1 decimal place
)

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("student_performance.csv", index=False)
