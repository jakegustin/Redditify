import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';

//ModifyPlaylistGen.js: Allows the user to remove subreddits from playlist generation

//global variable to store exclusions
export let myFinalExclusions = [];

//set global var equal to local, useState var
function setFinalExclusions(exclusions) {
    myFinalExclusions = exclusions;
}

//removes an exclusion from the list and regenerates the buttons
function removeExclusion(subreddit, myExclusions, setMyExclusions, setPostButtons) {
    const updatedExclusions = myExclusions.filter((item) => item !== subreddit);
    setMyExclusions(updatedExclusions)
    setPostButtons(buttonGenerator(updatedExclusions, setMyExclusions, setPostButtons));
}

//renders the buttons based on the exclusions
function buttonGenerator(myExclusions, setMyExclusions, setPostButtons) {
    var mybuttons = []
    for (var i = 0; i < myExclusions.length; i++) {
        let sub = myExclusions[i]
        mybuttons.push(
            <button 
            className='Default-topic-buttons' 
            type='checkbox' 
            key={i} 
            onClick={
                () => removeExclusion(sub, myExclusions, setMyExclusions, setPostButtons)
            }>
                r/{myExclusions[i]}
            </button>
        );
    }
    return <>{mybuttons}</>;
}

//adds an exclusion to the list based on the input
function addExclusion(subreddit, myExclusions, setMyExclusions) {
    if (myExclusions.includes(subreddit)) {
    } else {
        const updatedExclusions = [...myExclusions, subreddit];
        setMyExclusions(updatedExclusions);
    }
}

function ModifyPlaylistGen() {
    //declaring variable / initialization function for top posts
    var [postButtons, setPostButtons] = useState();
    var [exclusion, setExclusion] = useState('');
    var [myExclusions, setMyExclusions] = useState([]);

    useEffect(() => {
        setPostButtons(buttonGenerator(myExclusions, setMyExclusions, setPostButtons));
    }, [myExclusions]);
    return(
        <div className="Default">
            {/*Basic title and then a preformatted list should appear*/}
            <h1>Customize Playlist Generation</h1>
            <h2>Choose which subreddits you would like to exclude</h2>
            <div className="App-input-container">
            <label for='ExclusionInput'>r/</label>
            <input className="App-username-input" type='text' id='ExclusionInput' name='ExclusionInput'
                onChange={myInput => {
                    if (myInput.target.value !== '') {
                      setExclusion(myInput.target.value);
                    } else {
                      setExclusion('');
                    }
            }}></input>
            </div>
            <h2>Click any buttons to include them again.</h2>
            <div>
            {postButtons}
            </div>
            <div className="Default-buttons">
            <button className='App-buttons' type="button" onClick={() => addExclusion(exclusion, myExclusions, setMyExclusions)}>
                Add
            </button>
            <Link to="/createCustomUserPlaylist">
                <button className='App-buttons' type="button" onClick={() => setFinalExclusions(myExclusions)}>
                    Generate Playlist
                </button>
            </Link>
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