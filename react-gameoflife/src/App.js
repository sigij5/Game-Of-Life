import React from 'react';
import Game from './components/Game'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Game Of Life</h1>
      </header>
      <section className="Main">
        <Game />
        <div className="Instructions">
          Rules:
        </div>
      </section>
    </div>
  );
}

export default App;
