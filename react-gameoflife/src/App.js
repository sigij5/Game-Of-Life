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
          <h4>Rules:</h4>
          <ul>
            <li>Any live cell with fewer than two living neighbors dies (underpopulation).</li>
            <li>Any live cell with two or three living neighbors live on to the next generation.</li>
            <li>Any cell with more than three living neighbors dies (overpopulation).</li>
            <li>Any dead cell with exactly three living neighbors becomes a live cell (reproduction).</li>
          </ul>
        </div>
      </section>
      <section className="About">
        <h2>About</h2>
        <p>Conway's Game of Life is an algorithmic problem developed by British mathematician John Conway.  
          The game contains a grid of cells, that live and die based on a set of rules.  
          The algorithms created based on these rules, result in an animation in which a user can 
          visually experience how digital cells may live/die through a series of generations.
        </p>
        <br></br>
        <p>Conway began doing cell automaton experiments in 1968, his earliest works being done with a pen 
          and paper.  The Game of Life made it's first public appearance in Science Magazine in 1970,
          since then scholars in various fields have made use of the pattern complexity that can emerge from
          game's simple rules.
        </p>
        <br></br>
        <p>The Game of Life is known to be Turing complete, meaning it is capable of computing every Turing
          computable function, or simulate a Turing Machine.
        </p>
        
      </section>
      <section className="Memoriam">
        <h2>RIP John Conway</h2>
        <h2>1937-2020</h2>
        <img src="https://pbs.twimg.com/media/EVWTbgbWoAgf4OV.jpg" alt="conway" />
      </section>
    </div>
  );
}

export default App;
