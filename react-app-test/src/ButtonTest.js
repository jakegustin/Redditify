import { Link } from "react-router-dom";

function ButtonTest() {
    return(
        <div>
            <h1>Welcome to Button Test!</h1>
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;