import redditlogo from './redditlogo.png'
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Redditify</h1>
        <img src={redditlogo} className="App-logo" alt="logo" />
        <p>
          Enter Reddit Username:
        </p>
        <div class="App-input-container">
          <label for="usernameInput">u/</label>
          <input className='App-username-input' type="text" id="usernameInput" name="username"></input>
        </div>
        <Link to="/button">
          <button className='App-username-submit'>Submit</button>
        </Link>
      </header>
    </div>
  );
}

export default App;
