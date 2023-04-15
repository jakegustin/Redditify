import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { myName } from "./App.js";

function SpotifyPlaylists() {
    //using useState to declare and assign setPosts
    //represents the posts received from the backend
    var [playlists, setPlaylists] = useState('');
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState('');

    function checkSuccess(res) {
        errorMessage = res['error'];
        if (errorMessage !== '') {
          return <p>Error: {errorMessage}. Please try again.</p>;
        }
        return <div className='PostNames'> 
        {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: playlists}} /> }
       </div>
      }

    //fetching the posts from the backend
    useEffect(() => {
        fetch('http://localhost:5000/getPlaylists', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data['error']) {
                setErrorMessage(data['error']);
                console.log(data['error'])
            }
            setPlaylists(data['playlistNames']);
            console.log("Got data")
            setLoading(false);
            })
        .catch(error => {
            console.log(error)
            setPlaylists(error)
            setLoading(false);
            })
    }, []);
    return(
        <div className="Default">
            {/*Basic titles and then a preformatted list should appear*/}
            {console.log(playlists)}
            <h1>Your Spotify Playlists</h1>
            <h2>Here are some of your most recent playlists:</h2>
            {console.log(errorMessage)}
            {(errorMessage !== '') ? <p>Error: {errorMessage}. Please try logging in again.</p>
             : <div className='PostNames'> 
                {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: playlists}} /> }
               </div>
            }
            {/*Button to return to home page*/}
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default SpotifyPlaylists;