import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { myName } from "./App.js";

function ButtonTest() {
    var [test, setTest] = useState(''); 

    useEffect(() => {
        fetch('http://localhost:5000/test')
        .then(response => response.json())
        .then(data => {
            test = setTest(data.message)
            })
        .catch(error => {
            console.log(error)
            })
    }, []);
    return(
        <div className="Default">
            <h1>Welcome to Redditify, {myName}!</h1>
            <h2>Here are some of your most recent posts:</h2>
            <h2>{test}</h2>
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;