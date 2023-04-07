import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import redditlogo from './redditlogo.png'
import './App.css';

export let myName = 'Anonymous';

function App() {
  myName = 'Anonymous'
  return (
    <div className="App">
      <header className="App-header">
        <h1>Redditify</h1>
        <img src={redditlogo} className="App-logo" alt="logo" />
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
        <Link to="/userPosts">
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
      </header>
    </div>
  );
}

export default App;
