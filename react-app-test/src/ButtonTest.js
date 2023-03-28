import { Link } from "react-router-dom";

function ButtonTest() {
    return(
        <div>
            <h1>WELCOME TO BUTTON TEST</h1>
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;