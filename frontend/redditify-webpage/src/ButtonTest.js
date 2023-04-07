import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { myName } from "./App.js";

function ButtonTest() {
    var [posts, setPosts] = useState(''); 


    useEffect(() => {
        fetch('http://localhost:5000/userPosts', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': myName})})
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
            <h1>Welcome to Redditify, u/{myName}!</h1>
            <h2>Here are some of your most recent posts:</h2>
            {console.log(posts)}
            <div className='PostNames' dangerouslySetInnerHTML={{__html: posts}} />
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;