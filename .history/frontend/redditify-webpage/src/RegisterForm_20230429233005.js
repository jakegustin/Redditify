import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//RegisterForm.js: Webpage allowing the user to register on the website

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
//export let username = '';
//export let password = '';

function RegisterForm() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [redditName, setRedditName] = useState('');
  var [inputError, setInputError] = useState(false);
  var [errorReason, setErrorReason] = useState('');

  {/* Checks if input is non-empty and passwords match, redirects if all good */ }
  function checkInput() {
    if (username === '' || password === '' || redditName === '' || confirmPassword === '') {
      setInputError(true);
      setErrorReason('Empty fields');
    } else if (password !== confirmPassword) {
      setInputError(true);
      setErrorReason('Passwords do not match');
    } else {
      // send username, password, reddit name to backend database via fetch
      fetch('http://localhost:3000/register', {

        method: 'POST',
        mode: 'cors',
        body: [username, password, redditName].join('$')
      })
      window.location.href = '/loginStatus';
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {/*title */}
        <h1>Redditify Registration</h1>
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
        <div className="Login-input-container">
          <label for="confirmPasswordInput">Confirm Password:</label>
          <input onChange={myInput => {
            setConfirmPassword(myInput.target.value);
          }}
            className='App-username-input' type="password" id="confirmPasswordInput" name="confirmPassword">
          </input>
        </div>
        <div className="Login-input-container">
          <label for="redditNameInput">Reddit Username:</label>
        </div>
        <div className="Login-input-redditName-container">
          <label for="redditNameInput">r/</label>
          <input onChange={myInput => {
            setRedditName(myInput.target.value);
          }}
            className='App-username-input' type="text" id="redditNameInput" name="password">
          </input>
        </div>
        {/*Display error message if needed */}
        {inputError && <p>Invalid input: {errorReason}.</p>}
        {/*buttons to navigate to other pages */}
        <button onClick={e => {
          checkInput()
        }} className='App-username-submit'>Register</button>
        <Link to="/loginform">
          <button onClick={e => {
          }} className='App-username-submit'>Existing User? Log In</button>
        </Link>
        <Link to="/">
          <button onClick={e => {
          }} className='App-username-submit'>Go Home</button>
        </Link>
      </header>
    </div>
  );
}

export default RegisterForm;
