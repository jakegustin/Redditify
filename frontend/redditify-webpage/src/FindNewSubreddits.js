import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';

//TopPosts.js: Returns a list of the top posts on Reddit

function FindSubreddits() {
    //declaring variable / initialization function for top posts
    var [topposts, setTopPosts] = useState('');
    var [loading, setLoading] = useState(true);

    useEffect(() => {
        //fetching top posts from backend
        fetch('http://localhost:5000/getSubredditFromListeningHistory', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        //If we get a response, assign it accordingly
        //If we get an error, log it instead
        .then(response => response.json())
        .then(data => {
            setTopPosts(data['postNames']);
            setLoading(false);
            })
        .catch(error => {
            console.log(error)
            setLoading(false);
            })
    }, []);
    return(
        <div className="Default">
            {/*Basic title and then a preformatted list should appear*/}
            <h1>Recommended Subreddits for You</h1>
            <div className="PostNames">
            {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: topposts}} /> }
            </div>
            <div className="App-buttons">
            <Link to="/">
                <button classname='App-buttons' type="button">
                    Return to Home
                </button>
            </Link>
            </div>
        </div>
    );
}

export default FindSubreddits;