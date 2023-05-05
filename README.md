# Redditify
Spotify Playlist Generator based on your Reddit History.

## Startup
To start the Redditify application locally, Node.js is required for the frontend and Flask for the backend. This application was tested on Node.js v18.15.0, Javascript v1.5, Flask v2.2.0, and Python 3.11.2, though most current and future versions should be compatible. 

Once installed, navigate to ```.../<project-directory>/frontend/redditify-webpage``` in the powershell / terminal. By default, the project directory name is ```Redditify```. For the first startup, you should run ```npm install``` in the directory to install all the required prerequisites. Afterwards, you can run ```npm start``` to start up the frontend, which includes remote database functionality.

In a separate shell/terminal, navigate to ```.../<project-directory>/backend/venv``` and execute the command ```flask run``` to startup the backend service.

At this stage, all functionality should be enabled. To stop either service, simply close the shell/terminal window. Alternatively, use Ctrl-C to stop the server(s). For the frontend, you may also need to type 'Y' in response to "terminate batch job?".

## Required: Spotify Account
Effectively all of the application's features will be dependent on the user having a Spotify account linked. If no Spotify login is detected, all unavailable features will be hidden from the homepages in the form of buttons that are not visible. To log into Spotify, click "Login to Spotify" in order to be redirected and allow Redditify to access your Reddit account. You should recieve a confirmation if the authorization was successful, and the homepage will contain new features. As such, the main username/subreddit search will remain functional, but playlist generation will not succeed.

## Functionality

### Primary Feature: Playlist Generation Based on Reddit User Post History
Enter a reddit username (without the u/ prefix) into the input box and specify how many posts you want to search through in the Depth box. Note that a larger depth may be more time consuming, and if a number larger than the user's current post history is entered, the program will attempt to go through the maximum available posts from the user. Note that in the event of a blank field, a default value will be provided (u/Anonymous, depth=5). After searching, a list of post titles will appear confirming the user's most recent posts, and from there a playlist can be generated from those posts by clicking "Generate Spotify Playlist", the title of which will be u/<reddit username>.

#### OPTIONAL: Modify Playlist Generation
To remove posts from particular subreddits from consideration, click "Modify Playlist Generation". From there, enter the names of any subreddits to be excluded from consideration and then click "Add". You may also click the button with the subreddit's name to bring posts from it back into consideration. After all exclusions have been made, click "Generate Playlist"

### Alternate Primary Feature: Playlist Generation Based on Subreddit Post History
Instead of a reddit user, the hottest posts from a subreddit can be fetched in order to form a playlist. To do so, on the home page, click "Switch to Subreddit Search" (if you only see "Switch to Username Search", you're already where you need to be!). From there, enter the subreddit name (without the r/ prefix) and the depth of how many posts should be searched. Note that in the event of a blank field, a default value will be provided (r/popular, depth=5). After searching, a list of posts from that subreddit will appear, and from there, click "Generate Spotify Playlist" to create the playlist, which will be titled r/<subreddit name>. Note that currently, there is no customization allowed for subreddit search unlike the username search.

### Secondary Feature: Playlist of the Day
On the homepage, you can create a Spotify playlist based on the hottest posts on Reddit at the time of creation. As such, the default playlist title is "Redditify [Date]". At this time, the depth of the search cannot be adjusted.

### Secondary Feature: Find Your Next Subreddit
The "Reverse-Search" mechanism of the site, this feature analyzes your Spotify listening history and finds a number of subreddits that may be interesting to you based off of that history.

### Secondary Feature: Personalization / Generate Your Playlist
By utilizing the registration/login feature (see Login/Register on the homepage), you can accelerate the process of generating a playlist based on your reddit history as your contributions to reddit continue to grow.  Upon creating an account and logging into it, the homepage will present you with the option to "Generate Your Playlist", bypassing the username entry and confirmation and directly creating a new Spotify playlist with your associated username.

### Additional Feature: See Spotify Playlists
This mostly serves as a troubleshooting measure between the Spotify API and the Redditify client. It should return a number of your existing Spotify playlist names...and nothing more.

##
That's all for now, though more changes may come in the near future :)
