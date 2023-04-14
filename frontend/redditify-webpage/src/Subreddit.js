import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import redditlogo from './redditlogo.png'
import './App.css';

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
export let mySub = 'popular';

function Subreddit() {
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
          Enter Subreddit:
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
        </div>
        {/*buttons to navigate to other pages */}
        <Link to="/subredditPosts">
          <button onClick={e => {
          }} className='App-username-submit'>Submit</button>
        </Link>
        <Link to="/loginPage">
          <button onClick={e => {
          }} className='App-username-submit'>Login to Spotify</button>
        </Link>
        <Link to="/topPosts">
          <button onClick={e => {
          }} className='App-username-submit'>See Reddit Top Posts</button>
        </Link>
        <Link to="/">
          <button onClick={e => {
          }} className='App-username-submit'>Switch to Username Search</button>
        </Link>
      </header>
    </div>
  );
}

export default Subreddit;
