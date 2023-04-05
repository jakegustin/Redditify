import React, {useState, useEffect } from "react";
import { Link, json } from "react-router-dom";
import './Default.css';
import { myName } from "./App.js";

function getMultiplePosts(res, num) {
    var postNamesStr = ""
    if (res.length < num) {
        num = res.length;
    }
    for (var i = 0; i < num; i++) {
        postNamesStr = postNamesStr + "~ " + res.data.children[i].data.title + "<br>";
        console.log(postNamesStr)
    }
    var postNamesElem = document.getElementById('postNames');
    postNamesElem.innerHTML = postNamesStr;
    return postNamesElem;
}

function ButtonTest() {
    var [test, setTest] = useState(''); 
    var [myData, setMyData] = useState('');


    useEffect(() => {
        fetch('http://localhost:5000/test', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': myName})})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setMyData(data);
            setTest(getMultiplePosts(data, 10));
           console.log(data.data.children[0].data.title)
            })
        .catch(error => {
            console.log(error)
            })
    }, []);
    return(
        <div className="Default">
            <h1>Welcome to Redditify, u/{myName}!</h1>
            <h2>Here are some of your most recent posts:</h2>
            <div id='postNames' className='PostNames' mypostnames={{__html: test}} />
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;