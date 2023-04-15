import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

function SpotifyLoginStatus() {
  const location = useLocation();
  const errorMessage = new URLSearchParams(location.search).get('errorcode');
  function checkSuccess() {
    if (errorMessage) {
      return <p>Error: {errorMessage}. Please try again.</p>;
    }
    return <p>Spotify Login Successful!</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {checkSuccess()}
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

export default SpotifyLoginStatus;
