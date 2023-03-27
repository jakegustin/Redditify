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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
