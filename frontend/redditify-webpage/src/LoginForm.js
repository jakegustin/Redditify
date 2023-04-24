import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {getDatabase, ref, get} from "firebase/database"
import bcrypt from 'bcryptjs';

//RegisterForm.js: Webpage allowing the user to register on the website

export let redditName = '';
export let logStatus = false;

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
  await signInWithEmailAndPassword(auth, username, password)
  .then(async (userCredential)=> {
    // Signed in 
    const user = userCredential.user;
    const uid = user.uid;
    redditName = await getRedditName(uid);
    logStatus = true;
    return true;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    logStatus = false;
    return false;
    // ..
  });
  return logStatus;
}

async function getRedditName(inputUserId) {
  const redditRef = (ref(db, 'users/' + inputUserId + '/redditName'));
  const snapshot = await get(redditRef);
  let newRedditName = snapshot.val();
  return newRedditName;
}

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

function LoginForm() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [inputError, setInputError] = useState(false);
  var [errorReason, setErrorReason] = useState('');

  {/* Checks if input is non-empty and passwords match, redirects if all good */}
  async function checkInput() {
    if (username === '' || password === '') {
      setInputError(true);
      setErrorReason('Empty fields');
    } else {
      let logStatus = await newAuth()
      if (logStatus === true) {
        fetch('http://localhost:5000/saveRedditLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({'username': redditName}),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        alert('Login Successful, welcome u/' + redditName + '! Head to the home page to get started.');
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
        <h1>Redditify Login</h1>
        {/*input prompts and boxes */}
        <div className="Login-input-container">
          <label for="usernameInput">Email:</label>
          <input onChange={myInput => {
              setUsername(myInput.target.value);
          }}
          className='App-username-input' type="text" id="usernameInput" name="username">
          </input>
        </div>
        <div className="Login-input-container">
          <label htmlFor="passwordInput">Password:</label>
          <input onChange={myInput => {
              setPassword(myInput.target.value);
          }}
          className='App-username-input' type="password" id="passwordInput" name="password">
          </input>
        </div>
        {/*Display error message if needed */}
        <div className='App-buttons'>
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
        </div>
      </header>
    </div>
  );
}

export default LoginForm;
