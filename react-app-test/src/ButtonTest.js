import { Link } from "react-router-dom";
import { myName } from "./App.js";

function ButtonTest() {
    return(
        <div>
            <h1>Welcome to Button Test, {myName}!</h1>
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;