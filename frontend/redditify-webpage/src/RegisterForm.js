import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {getDatabase, ref, set} from "firebase/database"

//RegisterForm.js: Webpage allowing the user to register on the website

//Checks if user has successfully registered
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

//Creates a new user in the database - note Firebase handles the password hashing
async function newAuth() {
  //There's a better way to assign variables but I'm too lazy to change it
  let username = document.getElementById('usernameInput').value;
  let password = document.getElementById('passwordInput').value;
  let redditName = document.getElementById('redditNameInput').value;
  //Initiate the Firebase request to register a user
  await createUserWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    // Signed in successfully
    const user = userCredential.user;
    const uid = user.uid;
    //Write the user's data to the database
    writeUserData(uid, username, redditName);
    //Confirm to other components that registration was successful
    regStatus = true;
    return true;
    // ...
  })
  .catch((error) => {
    //Registration failed - likely due to existing user
    const errorCode = error.code;
    const errorMessage = error.message;
    regStatus = false;
    return false;
    // ..
  });
  return regStatus;
}

//Writes the user's data to the database
async function writeUserData(userId, name, redditName) {
  set(ref(db, 'users/' + userId), {
    username: name,
    redditName: redditName
  });
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

  {/* Checks if input is non-empty and passwords match, redirects if all good */ }
  function checkInput() {
    if (username === '' || password === '' || redditName === '' || confirmPassword === '') {
      //A field is empty
      setInputError(true);
      setErrorReason('Empty fields');
    } else if (password !== confirmPassword) {
      //Passwords don't match
      setInputError(true);
      setErrorReason('Passwords do not match');
    } else if (password.length < 6) {
      //Password is too short - mandated by Firebase
      setInputError(true);
      setErrorReason('Password must be at least 6 characters');
    } else {
      // send username, password, reddit name to backend database via fetch
      fetch('http://localhost:5000/register', {

        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: [username, password, redditName].join('%')
      })
      window.location.href = '/loginStatus';
    }
  }
}
  return (
    <div className="App">
      <header className="App-header">
        {/*title */}
        <h1>Redditify Registration</h1>
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
          <label for="passwordInput">Password:</label>
          <input onChange={myInput => {
            setPassword(myInput.target.value);
          }}
            className='App-username-input' type="password" id="passwordInput" name="password">
          </input>
        </div>
        {/*Confirm password input */}
        <div className="Login-input-container">
          <label for="confirmPasswordInput">Confirm Password:</label>
          <input onChange={myInput => {
            setConfirmPassword(myInput.target.value);
          }}
            className='App-username-input' type="password" id="confirmPasswordInput" name="confirmPassword">
          </input>
        </div>
        {/*Reddit username input */}
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
        </div>
      </header>
    </div>
  );
}

export default RegisterForm;
