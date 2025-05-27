from flask import Flask, request, jsonify
import joblib
import shap
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so React can call this API

# Load the trained model and explainer
model = joblib.load('model.pkl')
explainer = shap.Explainer(model)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 1. Get features from request
        data = request.json['features']
        df = pd.DataFrame([data])

        # 2. Make prediction
        prediction = model.predict(df)[0]

        # 3. Get SHAP values for the predicted sample
        shap_values = explainer(df)
        shap_explained = shap_values.values[0]  # Already 1D for one sample

        # 4. Match SHAP values with feature names
        explanation = dict(zip(df.columns, shap_explained.tolist()))

        return jsonify({
            'prediction': prediction,
            'shap': explanation
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
