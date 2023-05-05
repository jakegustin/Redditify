import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//LoginForm.js: Webpage that allows for local user login

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
//export let username = '';
//export let password = '';

function LoginForm() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [inputError, setInputError] = useState(false);
  var [errorReason, setErrorReason] = useState('');

  {/* Checks if input is non-empty, redirects if all good*/}
  function checkInput() {
    if (username === '' || password === '') {
      setInputError(true);
      setErrorReason('Empty fields');
    } else {
      window.location.href = '/loginStatus';
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {/*title */}
        <h1>Redditify Login</h1>
        {/*input prompts and boxes */}
        <div className="Login-input-container">
          <label for="usernameInput">Username:</label>
          <input onChange={myInput => {
              setUsername(myInput.target.value);
          }}
          className='App-username-input' type="text" id="usernameInput" name="username">
          </input>
        </div>
        <div className="Login-input-container">
          <label for="passwordInput">Password:</label>
          <input onChange={myInput => {
              setPassword(myInput.target.value);
          }}
          className='App-username-input' type="password" id="passwordInput" name="password">
          </input>
        </div>
        {/*Display error message if needed */}
        {inputError && <p>Invalid Input: {errorReason}</p>}
        {/*buttons to navigate to other pages */}
          <button onClick={e => {checkInput()
          }} className='App-username-submit'>Login</button>
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
