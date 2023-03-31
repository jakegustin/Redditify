import { Link } from "react-router-dom";
import './ButtonTest.css';
import { myName } from "./App.js";

function ButtonTest() {
    return(
        <div className="Button">
            <h1>Welcome to Button Test, {myName}!</h1>
            <body>
                <h2>Here are some of your most recent posts:</h2>
            </body>
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;