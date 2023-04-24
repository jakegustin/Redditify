from flask import Flask, jsonify, g, request, redirect, url_for
from flask_cors import CORS, cross_origin
from collections import Counter
from nltk.corpus import stopwords
import nltk
import praw, spotipy, requests, json, sys, os
from datetime import date
from spotipy.oauth2 import SpotifyOAuth

"///////////////////INITIALIZATION///////////////////"

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
# stores local depth of search
global depth
depth = 10

"///////////////////HELPER FUNCTIONS///////////////////"

#delays execution of other functions until stopwords are loaded
def load_stopwords(num_retries=3):
    try:
        stop_words = set(stopwords.words('english'))
        return('Success')
    except LookupError:
        if num_retries > 0:
            nltk.download('stopwords')
            load_stopwords(num_retries=num_retries - 1)
        else:
            print("unable to get stopwords")
            return("Failure")

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

#Gets the most prominent keywords from a list of titles
def get_top_keywords(titles, num):
    if load_stopwords() == "Failure":
        return []
    if titles is None: #in case there is no input
        return []
    words = []
    stop = set(stopwords.words('english')) #Define unusable words
    for item in titles:
        words = words + (item.split())
    newWords = [word.lower() for word in words if #Create list of words that are not in stop
                word.isalpha() and 
                word.lower() not in stop]
    c = Counter(newWords)
    if len(c) < num:
        num = len(c)
    topkeys = (c.most_common(num)) #Find most common words
    topwords = []
    for i in range(num): #Get the top <num> words
        topwords.append(topkeys[i][0])
    return topwords

"///////////////////EXTERNAL API SETUP///////////////////"

#secret key to protect user session data in flask
app.secret_key = os.environ.get("FLASK_SECRET_KEY")

#authentication with Spotify API
sp_oauth = SpotifyOAuth(
    client_id="d8c48211c35f430fb4a4a72bd65b0d9d",
    client_secret="4c4b92dbfca14f0ca001befd65e1d288",
    redirect_uri="http://127.0.0.1:5000/callback",
    scope="playlist-modify-private playlist-modify-public playlist-read-private user-library-read user-read-recently-played user-top-read"
)

#reddit stuff
reddit = praw.Reddit(
    client_id="OywDN09vVyHZAq2TYkyQkw",
    client_secret="ODm2vOgJ_DnnyghMKLKRj8V7Q2pyHg",
    user_agent="flask:OywDN09vVyHZAq2TYkyQkw:v1.0 (by u/Friendly_Insurance60)"
)

"///////////////////SPOTIFY OAUTH ENDPOINTS///////////////////"

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

@app.route("/checkLogin")
def verifyLogin():
    global access_token
    if access_token == "":
        return {'error': 'No access token.', 'status': False}
    return {'error': '', 'status': True}

"///////////////////GENERIC ENDPOINTS///////////////////"

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
    return {'error': '', 'playlistNames': playlist_names_str}

"""
DEPRECATED
#Gathers the top posts in reddit of all time
@app.route("/topposts")
def topposts(): #displays top 10 posts in r/all
    posts = reddit.subreddit("all").top(limit=10)
    post_titles = [post.title for post in posts]
    postNamesStr = get_multiple_posts(post_titles, 10)
    return {'postNames': postNamesStr}
"""

"///////////////////REDDIT USER ENDPOINTS///////////////////"

#Gathers a chosen user's most recent posts
@app.route("/userPosts", methods=['POST'])
def getPosts():
    global depth
    data= request.get_json()
    user = data['username']
    depth = int(data['depth'])
    reddituser = reddit.redditor(user)
    posts = reddituser.submissions.new(limit=depth+1)
    try: #If no posts exist, return 'no posts found'
        item1 = next(posts)
    except:
        return {'postNames': 'No posts found.'}
    else:
        post_titles = [post.title for post in posts]
        print(get_top_keywords(post_titles, depth))
        postNamesStr = get_multiple_posts(post_titles, depth)
        return {'postNames': postNamesStr}

#Generates a Spotify playlist based on a user's reddit posts    
@app.route("/createUserSpotifyPlaylist", methods=['POST'])
def createUserPlaylist():
    global access_token, sp, depth
    if access_token == "":
        return {'error': 'No access token.', 'playlistNames': '(Not applicable)'}
    sp = spotipy.Spotify(auth=access_token)
    data= request.get_json()
    inputname = data['username']
    reddituser = reddit.redditor(inputname)
    posts = reddituser.submissions.new(limit=depth)
    try: #If no posts exist, return 'no posts found'
        item1 = next(posts)
    except:
        return {'error': 'No posts found.'}
    else:
        post_titles = [post.title for post in posts]
        tops = get_top_keywords(post_titles, depth)
        spotifyUserInfo = sp.me()
        spotifyUserID = spotifyUserInfo['id']
        playlistinfo = sp.user_playlist_create(spotifyUserID, 'u/' + inputname, public=False)
        playlistID = playlistinfo['id']
        for key in tops:
            results = sp.search(q=key, limit=1)
            for idx, track in enumerate(results['tracks']['items']):
                sp.user_playlist_add_tracks(spotifyUserID, playlistID, [track['id']])
        return {'status': 'Success'}
    
@app.route("/getUserActiveSubreddits", methods=['POST'])
def getActiveSubs():
    data = request.get_json()
    user = data['username']
    reddituser = reddit.redditor(user)
    recentPosts = reddituser.submissions.new(limit=3)
    prominentSubs = []
    for post in recentPosts:
        print(post)
        if post.subreddit.display_name_prefixed not in prominentSubs:
            prominentSubs.append(post.subreddit.display_name_prefixed)
    print(prominentSubs)
    return {'subreddits': prominentSubs}


"///////////////////SUBREDDIT ENDPOINTS///////////////////"

#Gathers a chosen subreddit's most recent posts
@app.route("/subredditPosts", methods=['POST'])
def getSubredditPosts():
    global depth
    data= request.get_json()
    sr = data['subreddit']
    depth = int(data['depth'])
    print(sr, depth)
    subreddit = reddit.subreddit(sr)
    posts = subreddit.hot(limit=depth+1)
    try: #If no posts exist, return 'no posts found'
        item2 = next(posts)
    except:
        return {'postNames': 'No posts found.'}
    else:
        post_titles = [post.title for post in posts]
        postNamesStr = get_multiple_posts(post_titles, depth)
        return {'postNames': postNamesStr}

# Generates a Spotify playlist based on a subreddit's top posts
@app.route("/createSubSpotifyPlaylist", methods=['POST'])
def createSubPlaylist():
    global access_token, sp, depth
    if access_token == "":
        return {'error': 'No access token.', 'playlistNames': '(Not applicable)'}
    sp = spotipy.Spotify(auth=access_token)
    data= request.get_json()
    inputname = data['username']
    posts = reddit.subreddit(inputname).hot(limit=depth)
    try: #If no posts exist, return 'no posts found'
        item1 = next(posts)
    except:
        return {'error': 'No posts found.'}
    else:
        post_titles = [post.title for post in posts]
        tops = get_top_keywords(post_titles, depth)
        spotifyUserInfo = sp.me()
        spotifyUserID = spotifyUserInfo['id']
        playlistinfo = sp.user_playlist_create(spotifyUserID, 'r/' + inputname, public=False)
        playlistID = playlistinfo['id']
        for key in tops:
            results = sp.search(q=key, limit=1)
            for idx, track in enumerate(results['tracks']['items']):
                sp.user_playlist_add_tracks(spotifyUserID, playlistID, [track['id']])
        return {'status': 'Success'}
    
# Generates a Spotify playlist based on a subreddit's top posts
@app.route("/topposts", methods=['GET'])
def createTopPostPlaylist():
    global access_token, sp
    if access_token == "":
        return {'error': 'No access token.', 'playlistNames': '(Not applicable)'}
    sp = spotipy.Spotify(auth=access_token)
    posts = reddit.subreddit('all').hot(limit=25)
    try: #If no posts exist, return 'no posts found'
        item1 = next(posts)
    except:
        return {'error': 'No posts found.'}
    else:
        post_titles = [post.title for post in posts]
        tops = get_top_keywords(post_titles, 25)
        spotifyUserInfo = sp.me()
        spotifyUserID = spotifyUserInfo['id']
        currentDate = date.today().isoformat()
        playlistinfo = sp.user_playlist_create(spotifyUserID, 'Redditify ' + currentDate, public=False)
        playlistID = playlistinfo['id']
        for key in tops:
            results = sp.search(q=key, limit=1)
            for idx, track in enumerate(results['tracks']['items']):
                sp.user_playlist_add_tracks(spotifyUserID, playlistID, [track['id']])
        return {'status': 'Success'}
    
# Generates a list of relevant subreddits based on recent listening history
@app.route("/getSubredditFromListeningHistory", methods=['GET'])
def findSubreddit():
    global access_token, sp
    if access_token == "":
        return {'error': 'No access token.', 'postNames': '(Not applicable)'}
    sp = spotipy.Spotify(auth=access_token)
    spotifyHistory = sp.current_user_recently_played(limit=5)
    track_titles = []
    for i in range(5):
        track_titles.append(spotifyHistory['items'][i]['track']['name'])
    print(track_titles)
    bestSubs = []
    for track in track_titles:
        try:
            sub = reddit.subreddits.search_by_name(track)[0].display_name
            print(sub)
        except:
            continue
        if sub not in bestSubs:
            bestSubs.append("r/"+sub)
    return {'postNames': get_multiple_posts(bestSubs, len(bestSubs)+1)}


"///////////////////INITIALIZATION///////////////////"

# this needs to be at the end of the file to run the app
if __name__ == '__main__':
    app.run(debug=True)