import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import redditlogo from './redditlogo.png'
import './App.css';

//App.js: The homepage of the website, allowing for username search

//Declaring default values - would use useState, but it errors
//so imma let it live here for now
export let myName = 'Anonymous';
export let myDepth = 10;

function App() {
  var [spLoggedIn, setspLoggedIn] = useState(false);
  var [redditLoggedIn, setRedditLoggedIn] = useState(false);
  var [loading, setLoading] = useState(true);
  var [show, setShow] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:5000/checkLogin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  })
    .then(response => response.json())
    .then(data => {
      setspLoggedIn(data['status']);
      setLoading(false);
      })
  .catch(error => {
      console.log(error)
      setLoading(false);
      })

    fetch('http://localhost:5000/checkRedditLogin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  })
    .then(response => response.json())
    .then(data => {
      setRedditLoggedIn(data['status']);
      setLoading(false);
      })
  .catch(error => {
      console.log(error)
      setLoading(false);
      })
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [])

  //reinitializing username in case we end up back here.
  myName = 'Anonymous'

  return (
    <div className="App">
      <header className="App-header">
        {/*title and spinny logo :) */}
        <h1>Redditify</h1>
        <img src={redditlogo} className="App-logo" alt="logo" />
        {/*input prompt and box */}
        <p>
          Enter Reddit Username:
        </p>
        <div className="App-input-container">
          <label for="usernameInput">u/</label>
          <input onChange={myInput => {
            if (myInput.target.value !== '') {
              myName = myInput.target.value;
            } else {
              myName = 'Anonymous';
            }
          }}
          className='App-username-input' type="text" id="usernameInput" name="username">
          </input>
          <label for="depthInput">Depth:</label>
          <input onChange={myInput => {
            if (myInput.target.value !== '') {
              myDepth = myInput.target.value;
            } else {
              myDepth = 10;
            }
          }}
          className='App-depth-input' type="number" min="1" id="depthInput" name="depth">
          </input>
        </div>
        {/*buttons to navigate to other pages */}
        <div className='App-buttons-container'>
        {loading ? null :
        <div className={`App-buttons ${show ? "loaded" : "loading"}`}> 
        <Link to="/userPosts">
          <button onClick={e => {
          }} >Submit</button>
        </Link>
        {redditLoggedIn  && spLoggedIn ? 
        <Link to="/loggedInPlaylist">
          <button onClick={e => {
          }} >Generate Your Playlist</button>
        </Link> : null}
        {spLoggedIn ?
        <div className='App-buttons'>
          <Link to="/spotifyPlaylists">
          <button onClick={e => {
          }} >See Spotify Playlists</button>
          </Link> 
          <Link to="/topPosts">
            <button onClick={e => {
            }} >Generate Playlist of the Day</button>
          </Link>
          <Link to="/findSubreddit">
            <button onClick={e => {
            }} >Find Your Next Subreddit</button>
          </Link>
          </div> :          
          <Link to="/spotifyLogin">
          <button onClick={e => {
          }} >Login to Spotify</button>
          </Link>
          }
        <Link to="/subredditSearch">
          <button onClick={e => {
          }} >Switch to Subreddit Search</button>
        </Link>
        <Link to="/loginForm">
          <button onClick={e => {
          }} >Login / Register</button>
        </Link>
        </div>
        }
        </div>
      </header>
    </div>
  );
}

export default App;
