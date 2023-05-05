from flask import Flask, jsonify, g, request, redirect, url_for, session
from flask_cors import CORS, cross_origin
import praw, spotipy, requests, json, sys, os
from spotipy.oauth2 import SpotifyOAuth
import sqlite3

# intializes an instance of the flask app
app = Flask(__name__) 
# allows cross origin requests
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)
# stores access token across the whole app
global access_token 
access_token = ""
# stores Spotipy instance
global sp
sp = None

#secret key to protect user session data in flask
app.secret_key = "asdd"

# name says it all - gets multiple posts from a list of post titles
def get_multiple_posts(res, num):
    post_names_str = ""
    if res is None:
        return "No posts found."
    if len(res) < num:
        num = len(res)
    for i in range(num):
        post_names_str += "~ " + res[i] + "<br>"
    return post_names_str

# method to get connection with the user info database
def connect_db():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    return connection

#authentication with Spotify API
sp_oauth = SpotifyOAuth(
    client_id="d8c48211c35f430fb4a4a72bd65b0d9d",
    client_secret="4c4b92dbfca14f0ca001befd65e1d288",
    redirect_uri="http://127.0.0.1:5000/callback",
    scope="playlist-modify-private playlist-read-private user-library-read"
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
@cross_origin()
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

#default spotify callback path - confirming if token exists
@app.route("/callback")
def callback():
    global access_token, sp
    code = request.args.get("code")
    token_info = sp_oauth.get_access_token(code)
    if "error" in token_info:
        error = token_info["error"]
        return redirect("http://localhost:3000/spotifyLoginStatus?status=error&errorcode=" + error)
    access_token = token_info["access_token"]
    sp = spotipy.Spotify(auth=access_token)
    return redirect("http://localhost:3000/spotifyLoginStatus?status=success")
    
    # ATTEMPTING TO IMPLEMENT IN GETPLAYLISTS
    playlists = sp.current_user_playlists()
    return playlists

#Gathers a user's spotify playlists
@app.route("/getPlaylists")
@cross_origin()
def getPlaylists():
    global access_token, sp
    if access_token == "":
        return {'error': 'No access token.', 'playlistNames': '(Not applicable)'}
    sp = spotipy.Spotify(auth=access_token)
    playlists = sp.current_user_playlists()
    playlist_names = [playlist['name'] for playlist in playlists['items']]
    playlist_names_str = get_multiple_posts(playlist_names, 10)
    print(playlist_names_str)
    return {'error': '', 'playlistNames': playlist_names_str}

#Gathers the top posts in reddit of all time
@app.route("/topposts")
def topposts(): #displays top 10 posts in r/all
    posts = reddit.subreddit("all").top(limit=10)
    post_titles = [post.title for post in posts]
    print(post_titles)
    postNamesStr = get_multiple_posts(post_titles, 10)
    print(postNamesStr)
    return {'postNames': postNamesStr}

#Gathers a chosen user's most recent posts
@app.route("/userPosts", methods=['POST'])
def getPosts():
    data= request.get_json()
    user = data['username']
    reddituser = reddit.redditor(user)
    posts = reddituser.submissions.new(limit=10)
    try: #If no posts exist, return 'no posts found'
        item1 = next(posts)
    except:
        return {'postNames': 'No posts found.'}
    else:
        post_titles = [post.title for post in posts]
        print(post_titles)
        postNamesStr = get_multiple_posts(post_titles, 10)
        print(postNamesStr)
        return {'postNames': postNamesStr}
    
#Gathers a chosen subreddit's most recent posts
@app.route("/subredditPosts", methods=['POST'])
def getSubredditPosts():
    data= request.get_json()
    sr = data['subreddit']
    subreddit = reddit.subreddit(sr)
    posts = subreddit.hot(limit=10)
    try: #If no posts exist, return 'no posts found'
        item2 = next(posts)
    except:
        return {'postNames': 'No posts found.'}
    else:
        post_titles = [post.title for post in posts]
        print(post_titles)
        postNamesStr = get_multiple_posts(post_titles, 10)
        print(postNamesStr)
        return {'postNames': postNamesStr}


@app.route("/register", methods=['POST'])
def register():
    data = request.data.decode('utf-8')
    info_list = data.split('%')
    db = connect_db()
    db.execute('INSERT INTO userinfo (username, userpassword, redditname) VALUES (?, ?, ?)',
                         (info_list[0], info_list[1], info_list[2]))
    db.commit()
    db.close()
    return

@app.route('/applogin', methods=['POST'])
def applogin():
    data = request.get_json()
    print(data['username'])
    db = connect_db()
    res = db.execute('SELECT username FROM userinfo WHERE username = ?', (data['username'],))
    if res.fetchone() is None:
        session['auth'] = False
        print('isNone')
    else:
        session['auth'] = True
    print(request.cookies)
    db.commit()
    db.close()
    
    # no actual meaning for the returned val
    return "response" 

@app.route('/applogin', methods=['GET'])
def getAuth():
    res = session.get('auth', False)
    msg = ''
    
    if res:
        msg = "success"
    else:
        msg = "username not exist"
    return {'msg': msg}

# this needs to be at the end of the file to run the app
if __name__ == '__main__':
    app.run(debug=True)