import logo from './logo.svg';
import redditlogo from './redditlogo.png'
import './App.css';

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
          <label for="username">u/</label>
          <input className='App-username-input' type="text" id="username" name="username"></input>
        </div>
        <button className='App-username-submit'>Submit</button>
      </header>
    </div>
  );
}

export default App;
