import pandas as pd
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import shap
import joblib
import matplotlib.pyplot as plt




df = pd.read_csv(r'C:\Users\Subham\Desktop\hackathon_project_xids\data\Test_data.csv')
print("Number of columns in the new dataset: ", df.shape[1])

# Assign column names (without 'label')
columns = [
    'duration',
    'protocol_type',
    'service',
    'flag',
    'src_bytes',
    'dst_bytes',
    'land',
    'wrong_fragment',
    'urgent',
    'hot',
    'num_failed_logins',
    'logged_in',
    'num_compromised',
    'root_shell',
    'su_attempted',
    'num_root',
    'num_file_creations',
    'num_shells',
    'num_access_files',
    'num_outbound_cmds',
    'is_host_login',
    'is_guest_login',
    'count',
    'srv_count',
    'serror_rate',
    'srv_serror_rate',
    'rerror_rate',
    'srv_rerror_rate',
    'same_srv_rate',
    'diff_srv_rate',
    'srv_diff_host_rate',
    'dst_host_count',
    'dst_host_srv_count',
    'dst_host_same_srv_rate',
    'dst_host_diff_srv_rate',
    'dst_host_same_src_port_rate',
    'dst_host_srv_diff_host_rate',
    'dst_host_serror_rate',
    'dst_host_srv_serror_rate',
    'dst_host_rerror_rate',
    'dst_host_srv_rerror_rate'
]

df.columns = columns

# Add a dummy label column for later use
df['label'] = df['service'].apply(lambda x: 'attack' if x == 'private' else 'normal')

# Encode categorical columns (convert text to numbers)
from sklearn.preprocessing import LabelEncoder 

for col in ['protocol_type', 'service', 'flag']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])

# Confirm the updates
# print(" Categorical columns encoded!")
# print(df[['protocol_type', 'service', 'flag', 'label']].head())

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Split features and labels
X = df.drop('label', axis=1)
y = df['label']

# Split into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest Classifier
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Check accuracy
accuracy = model.score(X_test, y_test)
print(f"Model trained! Accuracy: {accuracy:.4f}")

# Use SHAP Explainer
explainer = shap.Explainer(model, X_train)

# Select a sample row
sample = X_test.iloc[[0]]
prediction = model.predict(sample)[0]
print("Model Prediction:", prediction)

# Get SHAP values
shap_values = explainer(sample)

# Ensure proper 1D values
shap_vals = shap_values.values[0].flatten()                 # Make sure 1D
feature_values = sample.to_numpy().flatten()                # Make sure 1D
features = sample.columns.to_list()                         # List of column names

# Check all lengths
print(f"\nFeature length: {len(features)}")
print(f"Value length: {len(feature_values)}")
print(f"SHAP Value length: {len(shap_vals)}")

# Create DataFrame only if lengths match
if len(features) == len(feature_values) == len(shap_vals):
    shap_df = pd.DataFrame({
        'Feature': features,
        'Value': feature_values,
        'SHAP Value': shap_vals
    })

    # Show top contributing features
    print("\nSHAP explanation (Top features):")
    print(shap_df.reindex(shap_df['SHAP Value'].abs().sort_values(ascending=False).index).head())

    # Show waterfall plot (optional)
    shap.plots.waterfall(shap_values[0])
else:
    print("Length mismatch! Could not build SHAP DataFrame.")

# Save the trained model to a file
joblib.dump(model, 'model.pkl')
print("Model saved as 'model.pkl'")

# Load the model again (to test)
loaded_model = joblib.load('model.pkl')
print("Model loaded. Test prediction:", loaded_model.predict(X_test.iloc[[0]]))





