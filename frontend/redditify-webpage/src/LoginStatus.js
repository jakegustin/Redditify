import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//LoginStatus.js: Returns the user's local login status
//NOTE: THIS FILE IS NOT USED IN THE FINAL PRODUCT (but im keeping it in case it in fact is)

function LoginStatus() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Successfully Logged In!
        </p>
        {/*buttons to navigate to other pages */}
        <Link to="/">
          <button onClick={e => {
          }} className='App-buttons'>Go Home</button>
        </Link>
      </header>
    </div>
  );
}

export default LoginStatus;
