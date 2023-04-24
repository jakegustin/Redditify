import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {getDatabase, ref, set} from "firebase/database"
import bcrypt from 'bcryptjs';

//RegisterForm.js: Webpage allowing the user to register on the website

export let regStatus = false;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNZdWFNxr7TTHfw7LbvPQfifIT1mha3Dg",
  authDomain: "redditify-db.firebaseapp.com",
  projectId: "redditify-db",
  storageBucket: "redditify-db.appspot.com",
  messagingSenderId: "840263488875",
  appId: "1:840263488875:web:144020c948f361acb2282e",
  databaseURL: "https://redditify-db-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

async function newAuth() {
  let username = document.getElementById('usernameInput').value;
  let password = document.getElementById('passwordInput').value;
  let hashedPassword = await hashPassword(password);
  let redditName = document.getElementById('redditNameInput').value;
  await createUserWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const uid = user.uid;
    writeUserData(uid, username, redditName);
    regStatus = true;
    return true;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    regStatus = false;
    return false;
    // ..
  });
  return regStatus;
}

async function writeUserData(userId, name, redditName) {
  set(ref(db, 'users/' + userId), {
    username: name,
    redditName: redditName
  });
}

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

function RegisterForm() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [redditName, setRedditName] = useState('');
  var [inputError, setInputError] = useState(false);
  var [errorReason, setErrorReason] = useState('');

  {/* Checks if input is non-empty and passwords match, redirects if all good */}
  async function checkInput() {
    if (username === '' || password === '' || redditName === '' || confirmPassword === '') {
      setInputError(true);
      setErrorReason('Empty fields');
    } else if (password !== confirmPassword) {
      setInputError(true);
      setErrorReason('Passwords do not match');
    } else if (password.length < 6) {
      setInputError(true);
      setErrorReason('Password must be at least 6 characters');
    } else {
      let regStatus = await newAuth()
      if (regStatus === true) {
        alert('Registration successful! Please log in.');
      } else {
        setInputError(true);
        setErrorReason('Invalid username or password');
    }
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
          <label for="redditNameInput">u/</label>
          <input onChange={myInput => {
              setRedditName(myInput.target.value);
          }}
          className='App-username-input' type="text" id="redditNameInput" name="password">
          </input>
        </div>
        {/*Display error message if needed */}
        {inputError && <p>Invalid input: {errorReason}.</p>}
        {/*buttons to navigate to other pages */}
        <div className='App-buttons'>
          <button onClick={e => {checkInput()
          }} className='App-username-submit'>Register</button>
        <Link to="/loginform">
          <button onClick={e => {
          }} className='App-username-submit'>Existing User? Log In</button>
        </Link>
        <Link to="/">
          <button onClick={e => {
          }} className='App-username-submit'>Go Home</button>
        </Link>
        </div>
      </header>
    </div>
  );
}

export default RegisterForm;
