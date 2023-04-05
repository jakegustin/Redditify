from flask import Flask, jsonify, request
from flask_cors import CORS
import requests, json, sys

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

@app.route("/test", methods=['POST'])
def hello_world():
    data= request.get_json()
    print(data)
    user = data['username']
    print(user)
    postNames = ""
    res = requests.get('https://www.reddit.com/user/' + user + '/submitted.json', headers = {'User-agent': 'redditifybot 0.0.1'})
    response = json.loads(res.text)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)