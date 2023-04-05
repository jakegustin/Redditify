from flask import Flask, jsonify

app = Flask(__name__)

import praw

reddit = praw.Reddit(
    client_id="OywDN09vVyHZAq2TYkyQkw",
    client_secret="ODm2vOgJ_DnnyghMKLKRj8V7Q2pyHg",
    user_agent="flask:OywDN09vVyHZAq2TYkyQkw:v1.0 (by u/Friendly_Insurance60)"
)
  
#route
@app.route('/')
def topposts(): #displays top 10 posts in r/all
    posts= reddit.subreddit("all").top(limit=10)
    post_titles = [post.title for post in posts]
    return jsonify(post_titles)

# this needs to be at the end of the file to run the app
if __name__ == '__main__':
    app.run(debug=True)