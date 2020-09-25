import React from 'react';
import Cell from './Cell'
import getElementOffset from '../utils/GetElement'
import './Game.css';


const cell_size = 25;

class Game extends React.Component {
    constructor() {
        super();
        this.board = this.makeEmptyBoard();
    }
    state = { 
        cells: [],
        interval: 100,
        isRunning: false,
        rows: 25,
        cols: 25,
        gen: 0,
    }

    runIteration = () => {
        console.log('running iteration');
        let newBoard = this.makeEmptyBoard();
        const { rows, cols } = this.state;

        for( let y = 0; y < rows; y++) {
            for( let x = 0; x < cols; x++) {
                let neighbors = this.countNeighbors(this.board, x, y);
                if(this.board[y][x]) {
                    if(neighbors === 2 || neighbors === 3 ) {
                        newBoard[y][x] = true;
                    } else{
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard; 
        this.setState({ cells: this.makeCells() });
        this.setState({ gen: this.state.gen + 1 })
        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        },
        this.state.interval);
    }

    //Check every neighboring cell, as long as it is within grid, return amount that are true
    countNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for( let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if( x1 >= 0 && x1 < this.state.cols && y1 >= 0 && y1 < this.state.rows && board[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors;
    }
    
    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if(this.timeoutHandler){
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    handleIntervalChange = e => {
        this.setState({ interval: e.target.value })
    }


    // Makes a 2D array, arrays of rows filled with columns
    makeEmptyBoard() {
        let board = [];
        for(let y = 0; y < this.state.rows; y++) {
            board[y] = [];
            for(let x = 0; x < this.state.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

    //Returns the cells that are true(on, black)
    makeCells() {
        let cells = [];
        for(let y = 0; y < this.state.rows; y++) {
            for(let x = 0; x < this.state.cols; x++) {
                if(this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }

    // Find Element in viewport regardless of scrolling
    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x:(rect.left + window.pageXOffset) - doc.clientLeft, 
            y:(rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    //Click cell based on location in viewport, if within range of the grid, change state of cell.
    handleClick = e => {
        const elemOffset = this.getElementOffset();
        const offsetX = e.clientX - elemOffset.x;
        const offsetY = e.clientY - elemOffset.y;
        const x = Math.floor(offsetX / cell_size);
        const y = Math.floor(offsetY / cell_size);
        // const x = Math.floor(e.clientX / cell_size);
        // const y = Math.floor(e.clientY / cell_size)

        if(x >= 0 && x<= this.state.cols && y>= 0 && y<= this.state.rows) {
            this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells() });
    }

    //Returns either true or false cells depending on whether it is given a random number lower or higher than .05
    handleRandom = () => {
        for (let y = 0; y < this.state.rows; y++) {
            for (let x = 0; x < this.state.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

    //Resets state to a new empty board(2D array of all false cells)
    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
        this.setState({ gen: 0 });
    }

    handleRowChange = e => {
        this.setState({ rows: e.target.value })
    }
    handleColChange = e => {
        this.setState({ cols: e.target.value })
    }

    render() {
        const { cells, isRunning, rows, cols } = this.state;
        return (
            <div className = "Game">
                <h4>Generation #{this.state.gen}</h4>
                <div className = "Board" style = {{width: cols * cell_size, height: rows * cell_size, 
                    backgroundSize: `${cell_size}px ${cell_size}px`
                    }}
                    onClick = {this.handleClick}
                    ref={(n) => {this.boardRef = n; }}>
                    {cells.map(cell => (
                        <Cell x={cell.x} y ={cell.y} key= {`${cell.x}, ${cell.y}`}/>
                    ))}
                </div>

                <div className = "Controls">
                    <div className= "Inputs">
                        Rows: <input value = {this.state.rows} onChange={this.handleRowChange} />
                        Columns: <input value = {this.state.cols} onChange={this.handleColChange} />
                        Generation time in msec:<input value = {this.state.interval} onChange={this.handleIntervalChange} />
                    </div>
                    <div className="Buttons">
                        {isRunning ?
                            <button className="button" onClick={this.stopGame}>Stop</button> :
                            <button className="button" onClick={this.runGame}>Start</button>
                        }
                        <button className="button" onClick={this.handleRandom}>Random</button>
                        <button className="button" onClick={this.handleClear}>Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Game;