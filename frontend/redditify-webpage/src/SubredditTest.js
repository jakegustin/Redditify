import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { mySub } from "./Subreddit.js";

function SubredditTest() {
    //using useState to declare and assign setPosts
    //represents the posts received from the backend
    var [posts, setPosts] = useState(''); 

    //fetching the posts from the backend
    useEffect(() => {
        fetch('http://localhost:5000/subredditPosts', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'subreddit': mySub})})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPosts(data['postNames']);
            console.log("Got data")
            })
        .catch(error => {
            console.log(error)
            setPosts(error)
            })
    }, []);
    return(
        <div className="Default">
            {/*Basic titles and then a preformatted list should appear*/}
            <h1>Welcome to r/{mySub}!</h1>
            <h2>Here are some of the hottest posts:</h2>
            {console.log(posts)}
            <div className='PostNames' dangerouslySetInnerHTML={{__html: posts}} />
            {/*Button to return to home page*/}
            <Link to="/subredditSearch">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default SubredditTest;