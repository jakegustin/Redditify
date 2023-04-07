import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';

function ButtonTest() {
    var [posts, setPosts] = useState(''); 


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
            <h1>Top Posts on Reddit</h1>
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