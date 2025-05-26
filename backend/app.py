from flask import Flask, request, jsonify
import joblib
import numpy as np
import shap
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so React can call this API

# Load the trained model and explainer
model = joblib.load('model.pkl')
explainer = shap.Explainer(model)

# Define the API route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['features']  # Should be a list of 41 values
    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]
    shap_vals = explainer(df)

    explanation = dict(zip(df.columns, shap_vals.values[0].tolist()))

    return jsonify({
        'prediction': prediction,
        'shap': explanation
    })

if __name__ == '__main__':
    app.run(debug=True)
