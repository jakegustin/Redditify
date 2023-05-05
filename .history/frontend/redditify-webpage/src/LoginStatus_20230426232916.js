import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//LoginStatus.js: Returns the user's local login status

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
//export let username = '';
//export let password = '';

function LoginStatus() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [redditName, setRedditName] = useState('');
  var [defaultReddit, setDefaultReddit] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          NEED CODE HERE
        </p>
        {/*buttons to navigate to other pages */}
        <Link to="/">
          <button onClick={e => {
          }} className='App-username-submit'>Go Home</button>
        </Link>
      </header>
    </div>
  );
}

export default LoginStatus;
