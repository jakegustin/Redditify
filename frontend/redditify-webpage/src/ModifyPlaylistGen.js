import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { myName, myDepth } from "./App.js";

//TopPosts.js: Returns a list of the top posts on Reddit

function buttonGenerator(subreddits, num) {
    var mybuttons = []
    for (var i = 0; i < num; i++) {
        mybuttons.push(
            <button className='Default-topic-buttons' type='checkbox' key={i}>
                {subreddits[i]}
            </button>
        );
    }
    return <>{mybuttons}</>;
}

function ModifyPlaylistGen() {
    //declaring variable / initialization function for top posts
    var [topposts, setTopPosts] = useState();
    var [loading, setLoading] = useState(true);
    var [postButtons, setPostButtons] = useState();

    useEffect(() => {
        //fetching top posts from backend
        fetch('http://localhost:5000/getUserActiveSubreddits', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({'username': myName})
        })
        //If we get a response, assign it accordingly
        //If we get an error, log it instead
        .then(response => response.json())
        .then(data => {
            console.log(typeof(data['subreddits'][0]))
            setPostButtons(buttonGenerator(data['subreddits'], data['subreddits'].length));
            console.log(postButtons)
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
            <h1>Customize Playlist Generation</h1>
            <h2>Choose which subreddits you would like to exclude</h2>
            <div /*className="Default-topic-buttons"*/>
            {loading ? 'Loading...' : postButtons }
            </div>
            <div className="Default-buttons">
            <Link to="/">
                <button className='App-buttons' type="button">
                    Return to Home
                </button>
            </Link>
            </div>
        </div>
    );
}

export default ModifyPlaylistGen;