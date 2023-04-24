import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import './App.css'

//LoginStatus.js: Returns the user's local login status

//Declaring custom username - would use useState, but it errors
//so imma let it live here for now
//export let username = '';
//export let password = '';

function LoggedInSpotifyPlaylistGen() {
  //using useState to declare and assign setPosts
  //represents the posts received from the backend
  var [redditName, setRedditName] = useState('');
  var [playlists, setPlaylists] = useState('');
  var [loading, setLoading] = useState(true);
  var [errorMessage, setErrorMessage] = useState('');
  var [searchTerm, setSearchTerm] = useState('');

  const debouncedFetch = debounce(() => {
    setLoading(true);
    fetch('http://localhost:5000/checkRedditLogin', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data['error'] !== "") {
          setErrorMessage(data['error']);
        } else {
          setRedditName(data['redditName']);
          console.log("NAME"+redditName)
          generatePlaylist();
        }
      })
      .catch(error => {
        setErrorMessage(error);
        setLoading(false);
      });
  }, 500);

  function generatePlaylist() {
    if (redditName === '') {
      return false;
    }
    fetch('http://localhost:5000/createUserSpotifyPlaylist', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 'username': redditName, 'auto': true })
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
      return true;
  }
  useEffect(() => {
    debouncedFetch(searchTerm);
    console.log("THISIS" + redditName)
  }, [searchTerm, redditName]);

  return(
      <div className="Default">
          {/*Basic titles and then a preformatted list should appear unless it errors*/}
          <h1>Redditify</h1>
          <h2>Spotify Playlist Generation</h2>
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

export default LoggedInSpotifyPlaylistGen;
