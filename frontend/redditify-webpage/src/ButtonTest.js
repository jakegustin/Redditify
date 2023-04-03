import { Link } from "react-router-dom";
import './Default.css';
import { myName } from "./App.js";

function ButtonTest() {
    return(
        <div className="Default">
            <h1>Welcome to Redditify, {myName}!</h1>
            <h2>Here are some of your most recent posts:</h2>
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;