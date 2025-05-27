import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import shap
import joblib
import matplotlib.pyplot as plt

# Load the dataset (update the path if needed)
df = pd.read_csv(r'C:\Users\Subham\Desktop\hackathon_project_xids\data\Dataset.csv', header=None)
print("Number of columns in the new dataset: ", df.shape[1])

# Assign all 43 column names
columns = [
    'duration','protocol_type','service','flag','src_bytes','dst_bytes','land',
    'wrong_fragment','urgent','hot','num_failed_logins','logged_in','num_compromised',
    'root_shell','su_attempted','num_root','num_file_creations','num_shells',
    'num_access_files','num_outbound_cmds','is_host_login','is_guest_login','count',
    'srv_count','serror_rate','srv_serror_rate','rerror_rate','srv_rerror_rate',
    'same_srv_rate','diff_srv_rate','srv_diff_host_rate','dst_host_count',
    'dst_host_srv_count','dst_host_same_srv_rate','dst_host_diff_srv_rate',
    'dst_host_same_src_port_rate','dst_host_srv_diff_host_rate','dst_host_serror_rate',
    'dst_host_srv_serror_rate','dst_host_rerror_rate','dst_host_srv_rerror_rate',
    'label','difficulty'
]
df.columns = columns

# Drop the 'difficulty' column
df = df.drop('difficulty', axis=1)

# Clean labels
df['label'] = df['label'].apply(lambda x: 'normal' if x == 'normal' else 'attack')

# Encode categorical features
for col in ['protocol_type', 'service', 'flag']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])

print("✅ Labels cleaned and categorical columns encoded!")
print(df[['protocol_type', 'service', 'flag', 'label']].head())

# Split data
X = df.drop('label', axis=1)
y = df['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)
print(f"✅ Model trained! Accuracy: {accuracy:.4f}")

# SHAP Explainer
explainer = shap.Explainer(model, X_train)

# Sample prediction
sample = X_test.iloc[[0]]
prediction = model.predict(sample)[0]
print("📢 Model Prediction:", prediction)

# SHAP values
shap_values = explainer(sample)

# Get class index
class_names = model.classes_  # ['attack', 'normal']
predicted_class = prediction
class_index = list(class_names).index(predicted_class)

# Get SHAP values for predicted class
shap_vals = shap_values.values[0][:, class_index]  # Shape (41,)

# Format input values
feature_values = sample.to_numpy().flatten()
features = sample.columns.to_list()

# Sanity check
print(f"\nFeature length: {len(features)}")
print(f"Value length: {len(feature_values)}")
print(f"SHAP Value length: {len(shap_vals)}")

# Create DataFrame
if len(features) == len(feature_values) == len(shap_vals):
    shap_df = pd.DataFrame({
        'Feature': features,
        'Value': feature_values,
        'SHAP Value': shap_vals
    })

    print("\n📊 SHAP explanation (Top features):")
    print(shap_df.reindex(shap_df['SHAP Value'].abs().sort_values(ascending=False).index).head())

    # SHAP plot (optional)
    shap.plots.waterfall(shap.Explanation(
        values=shap_vals,
        base_values=shap_values.base_values[class_index],
        data=feature_values,
        feature_names=features
    ))
else:
    print("❌ Length mismatch! Could not build SHAP DataFrame.")

# Save model
joblib.dump(model, 'model.pkl')
print("💾 Model saved as 'model.pkl'")

# Reload model test
loaded_model = joblib.load('model.pkl')
print("✅ Model loaded. Test prediction:", loaded_model.predict(X_test.iloc[[0]]))

# Count attack samples
print(df[df['label'] == 'attack'].shape[0], "attack samples in the dataset.")
