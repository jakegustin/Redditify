from flask import Flask, jsonify, request
from flask_cors import CORS
import requests, json, sys

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

def get_multiple_posts(res, num):
    post_names_str = ""
    if res is None:
        return "No posts found."
    if len(res["data"]["children"]) < num:
        num = len(res["data"]["children"])
    for i in range(num):
        post_names_str += "~ " + res["data"]["children"][i]["data"]["title"] + "<br>"
    return post_names_str

@app.route("/test", methods=['POST'])
def getPosts():
    data= request.get_json()
    user = data['username']
    res = requests.get('https://www.reddit.com/user/' + user + '/submitted.json', headers = {'User-agent': 'redditifybot 0.0.1'})
    postNamesStr = get_multiple_posts(res.json(), 10)
    print(postNamesStr)
    return {'postNames': postNamesStr}

if __name__ == "__main__":
    app.run(debug=True)