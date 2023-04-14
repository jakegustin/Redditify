import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
//export let username = '';
//export let password = '';

function LoginForm() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [redditName, setRedditName] = useState('');
  var [defaultReddit, setDefaultReddit] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {/*title and spinny logo :) */}
        <h1>Redditify Login</h1>
        {/*input prompt and box */}
        <div className="Login-input-container">
          <label for="usernameInput">Username:</label>
          <input onChange={myInput => {
              username = myInput.target.value;
          }}
          className='App-username-input' type="text" id="usernameInput" name="username">
          </input>
        </div>
        <div className="Login-input-container">
          <label for="passwordInput">Password:</label>
          <input onChange={myInput => {
              password = myInput.target.value;
          }}
          className='App-username-input' type="password" id="passwordInput" name="password">
          </input>
        </div>
        {/*buttons to navigate to other pages */}
        <Link to="/loginStatus">
          <button onClick={e => {
          }} className='App-username-submit'>Login</button>
        </Link>
        <Link to="/registerForm">
          <button onClick={e => {
          }} className='App-username-submit'>New User? Register</button>
        </Link>
        <Link to="/">
          <button onClick={e => {
          }} className='App-username-submit'>Go Home</button>
        </Link>
      </header>
    </div>
  );
}

export default LoginForm;
