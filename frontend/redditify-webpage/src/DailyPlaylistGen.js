import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import './App.css'
import { mySub } from "./Subreddit.js";;

//LoginStatus.js: Returns the user's local login status

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
//export let username = '';
//export let password = '';

function TopPosts() {
  //using useState to declare and assign setPosts
  //represents the posts received from the backend
  var [playlists, setPlaylists] = useState('');
  var [loading, setLoading] = useState(true);
  var [errorMessage, setErrorMessage] = useState('');
  var [searchTerm, setSearchTerm] = useState(mySub);

  const debouncedFetch = debounce((searchTerm) => {
    setLoading(true);
    fetch('http://localhost:5000/topposts', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data['error']) {
          setErrorMessage(data['error']);
        } else {
          setPlaylists(data['status']);
        }
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage(error);
        setLoading(false);
      });
  }, 500);

  useEffect(() => {
    debouncedFetch(searchTerm);
  }, [searchTerm]);
  return(
      <div className="Default">
          {/*Basic titles and then a preformatted list should appear unless it errors*/}
          {console.log(playlists)}
          <h1>Redditify</h1>
          <h2>Spotify Playlist Generation</h2>
          {console.log(errorMessage)}
          {(errorMessage !== '') ? <p>Error: {errorMessage}. Please try logging in again.</p>
           : <div className='PostNames'> 
              {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: playlists}} /> }
             </div>
          }
          {/*Button to return to home page*/}
          <div className='App-buttons'>
          <Link to="/">
              <button className='App-buttons' type="button">
                  Return to Home
              </button>
          </Link>
          </div>
      </div>
  );
}

export default TopPosts;
