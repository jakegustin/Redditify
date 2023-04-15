import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import redditlogo from './redditlogo.png'
import './App.css';

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
export let myName = 'Anonymous';

function App() {
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
        </div>
        {/*buttons to navigate to other pages */}
        <Link to="/userPosts">
          <button onClick={e => {
          }} className='App-username-submit'>Submit</button>
        </Link>
        <Link to="/spotifyLogin">
          <button onClick={e => {
          }} className='App-username-submit'>Login to Spotify</button>
        </Link>
        <Link to="/spotifyPlaylists">
          <button onClick={e => {
          }} className='App-username-submit'>See Spotify Playlists</button>
        </Link>        
        <Link to="/topPosts">
          <button onClick={e => {
          }} className='App-username-submit'>See Reddit Top Posts</button>
        </Link>
        <Link to="/subredditSearch">
          <button onClick={e => {
          }} className='App-username-submit'>Switch to Subreddit Search</button>
        </Link>
        <Link to="/loginForm">
          <button onClick={e => {
          }} className='App-username-submit'>Login / Register</button>
        </Link>
      </header>
    </div>
  );
}

export default App;
