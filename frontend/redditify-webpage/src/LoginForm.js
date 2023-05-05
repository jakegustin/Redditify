import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {getDatabase, ref, get} from "firebase/database"

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

//Attempts to login user via Firebase - note passwords are automatically hashed via Firebase
async function newAuth() {
  //There's a better way to assign variables but I'm too lazy to change it
  let username = document.getElementById('usernameInput').value;
  let password = document.getElementById('passwordInput').value;
  //Initiate the Firebase request to login a user
  await signInWithEmailAndPassword(auth, username, password)
  .then(async (userCredential)=> {
    // Signed in 
    const user = userCredential.user;
    const uid = user.uid;
    //Obtain the current user's reddit username
    redditName = await getRedditName(uid);
    logStatus = true;
    return true;
    // ...
  })
  .catch((error) => {
    //Something went wrong (likely incorrect username/password)
    const errorCode = error.code;
    const errorMessage = error.message;
    logStatus = false;
    return false;
    // ..
  });
  return logStatus;
}

//A function that obtains the user's reddit username from the database
async function getRedditName(inputUserId) {
  const redditRef = (ref(db, 'users/' + inputUserId + '/redditName'));
  const snapshot = await get(redditRef);
  let newRedditName = snapshot.val();
  return newRedditName;
}

function LoginForm() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [inputError, setInputError] = useState(false);
  var [errorReason, setErrorReason] = useState('');


  {/* Checks if input is non-empty, redirects if all good*/ }
  function checkInput() {
    if (username === '' || password === '') {
      //A field is empty
      setInputError(true);
      setErrorReason('Empty fields');
    } else {

      fetch('http://localhost:5000/applogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      }).then(response => { window.location.href = '/loginStatus'; })
    }
  }
}

  return (
    <div className="App">
      <header className="App-header">
        {/*title */}
        <h1>Redditify Login</h1>
        {/*Email input */}
        <div className="Login-input-container">
          <label for="usernameInput">Email:</label>
          <input onChange={myInput => {
            setUsername(myInput.target.value);
          }}
            className='App-username-input' type="text" id="usernameInput" name="username">
          </input>
        </div>
        {/*Password input */}
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
        <button onClick={e => {
          checkInput()
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
