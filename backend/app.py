from flask import Flask, jsonify, g, request, redirect, url_for
import os
import praw, spotipy
from spotipy.oauth2 import SpotifyOAuth

# intializes an instance of the flask app
app = Flask(__name__) 

#secret key to protect user session data in flask
app.secret_key = os.environ.get("FLASK_SECRET_KEY")

#authentication with Spotify API
sp_oauth = SpotifyOAuth(
    client_id="d8c48211c35f430fb4a4a72bd65b0d9d",
    client_secret="4c4b92dbfca14f0ca001befd65e1d288",
    redirect_uri="http://127.0.0.1:5000/callback",
    scope="playlist-modify-private user-library-read"
)

#reddit stuff
reddit = praw.Reddit(
    client_id="OywDN09vVyHZAq2TYkyQkw",
    client_secret="ODm2vOgJ_DnnyghMKLKRj8V7Q2pyHg",
    user_agent="flask:OywDN09vVyHZAq2TYkyQkw:v1.0 (by u/Friendly_Insurance60)"
)

#root URL
@app.route("/")
def index():
    return "<a href='/login'>Login with Spotify</a>"

#redirects user to spotify Oauth
@app.route("/login")
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route("/callback")
def callback():
    code = request.args.get("code")
    token_info = sp_oauth.get_access_token(code)
    access_token = token_info["access_token"]

    sp = spotipy.Spotify(auth=access_token)

    playlists = sp.current_user_playlists()
    return jsonify(playlists)

@app.route("/topposts")
def topposts(): #displays top 10 posts in r/all
    posts= reddit.subreddit("all").top(limit=10)
    post_titles = [post.title for post in posts]
    return jsonify(post_titles)



# this needs to be at the end of the file to run the app
if __name__ == '__main__':
    app.run(debug=True)