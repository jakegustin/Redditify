import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import redditlogo from './redditlogo.png'
import './App.css';

//Subreddit.js: Alternate homepage, instead allowing for subreddit search

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
export let mySub = 'popular';
export let myDepth = 10;

function Subreddit() {
  var [loggedIn, setLoggedIn] = useState(false);
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
      setLoggedIn(data['status']);
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
  mySub = 'popular'
  return (
    <div className="App">
      <header className="App-header">
        {/*title and spinny logo :) */}
        <h1>Redditify</h1>
        <img src={redditlogo} className="App-logo" alt="logo" />
        {/*input prompt and box */}
        <p>
          Enter Subreddit Name:
        </p>
        <div className="App-input-container">
          <label for="usernameInput">r/</label>
          <input onChange={myInput => {
            if (myInput.target.value !== '') {
              mySub = myInput.target.value;
            } else {
              mySub = 'popular';
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
        <div className='App-buttons-container'>
        {/*buttons to navigate to other pages */}
        {loading ? null :
        <div className={`App-buttons ${show ? "loaded" : "loading"}`}> 
        <Link to="/subredditPosts">
          <button onClick={e => {
          }} >Submit</button>
        </Link>
        {loggedIn ?
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
          </div>:           
          <Link to="/spotifyLogin">
          <button onClick={e => {
          }} >Login to Spotify</button>
          </Link>
          }
        <Link to="/">
          <button onClick={e => {
          }} >Switch to Username Search</button>
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

export default Subreddit;
