from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

@app.route("/test")
def hello_world():
    data = {'message': 'Hello, World!'}
    return jsonify(data)