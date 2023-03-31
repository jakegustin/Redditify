import redditlogo from './redditlogo.png'
import './App.css';
import { Link } from 'react-router-dom';

export let myName = 'Anonymous';

function App() {
  myName = 'Anonymous'
  return (
    <div className="App">
      <header className="App-header">
        <h1>Redditify</h1>
        <img src={redditlogo} className="App-logo" alt="logo" />
        <p>
          Enter Reddit Username:
        </p>
        <div className="App-input-container">
          <label for="usernameInput">u/</label>
          <input onChange={myInput => {
            if (myInput.target.value !== '') {
              myName = "u/" + myInput.target.value;
            } else {
              myName = 'Anonymous';
            }
          }}
          className='App-username-input' type="text" id="usernameInput" name="username">
          </input>
        </div>
        <Link to="/button">
          <button onClick={e => {
          }} className='App-username-submit'>Submit</button>
        </Link>
      </header>
    </div>
  );
}

export default App;
