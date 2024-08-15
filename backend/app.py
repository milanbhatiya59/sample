from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

CSV_FILE_PATH = 'customer_purchase_data.csv'
UPDATED_CSV_FILE_PATH = 'updated_dataset.csv'

@app.route('/api/run-python', methods=['POST'])
def run_python():

    data = request.json
    try:
        df = pd.read_csv('customer_purchase_data.csv', encoding='ISO-8859-1')

        df['productPrice'] = float(data['productprice'])
        df['productCategories'] = data['productcategory']
        df['productRating'] = float(data['productrating'])

        label_encoder = LabelEncoder()

        originalCityName = df['cityName']
        originalArea = df['area']
        originalCategories = df['productCategories']

        df['cityName'] = label_encoder.fit_transform(df['cityName'])
        df['area'] = label_encoder.fit_transform(df['area'])
        df['productCategories'] = label_encoder.fit_transform(df['productCategories'])
        
        print(df)
        X = df.drop('successProbability', axis=1, errors='ignore')

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        model = load_model('model.h5')

        predictions = model.predict(X_scaled)

        print(predictions)
        df['successProbability'] = predictions

        df['cityName'] = originalCityName
        df['area'] = originalArea
        df['productCategories'] = originalCategories


        print(df)
        df.to_csv('predictions.csv', index=False)

        updated_data = df.to_dict(orient='records')

        result = {"status": "success", "received_data": updated_data}
        # result = {"status": "Success"}
        return jsonify(result), 200

    except Exception as e:
        print('Error Hello')
        print(f"Error: {e}")
        result = {"status": "Failed"}
        return jsonify(result), 500
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
