import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';

function TopPosts() {
    var [topposts, setTopPosts] = useState(''); 

    /*async function formatPostsFromJSON(json) {
        console.log(json)
        const myPosts = topposts
        const myObject = JSON.parse(myPosts)
        const myStringList = document.getElementById('stringlist');
        myObject.children.forEach((string) => {
            const li = document.createElement('li');
            const textitem = document.createTextNode(string);
            li.appendChild(string);
            myStringList.appendChild(li);
        })
    }*/


    useEffect(() => {
        fetch('http://localhost:5000/topposts', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTopPosts(data['postNames']);
            console.log("Got data")
            })
        .catch(error => {
            console.log(error)
            setTopPosts(error)
            })
    }, []);
    return(
        <div className="Default">
            <h1>Top Posts on Reddit</h1>
            <div className='PostNames' dangerouslySetInnerHTML={{__html: topposts}} />
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default TopPosts;