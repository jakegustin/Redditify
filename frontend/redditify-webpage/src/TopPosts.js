import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';

function TopPosts() {
    //declaring variable / initialization function for top posts
    var [topposts, setTopPosts] = useState('');
    var [loading, setLoading] = useState(true);

    useEffect(() => {
        //fetching top posts from backend
        fetch('http://localhost:5000/topposts', { 
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
            <h1>Top Posts on Reddit</h1>
            <div className="PostNames">
            {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: topposts}} /> }
            </div>
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default TopPosts;