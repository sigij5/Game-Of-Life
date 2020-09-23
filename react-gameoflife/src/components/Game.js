import React from 'react';
import Cell from './Cell'
import './Game.css';


const cell_size = 25;
const width = 500;
const height = 500;

class Game extends React.Component {
    constructor() {
        super();
        this.rows = height / cell_size;
        this.cols = width / cell_size;
        this.board = this.makeEmptyBoard();
    }
    state = { cells: [], interval: 100, isRunning: false, }

    runIteration = () => {
        console.log('running iteration');
        let newBoard = this.makeEmptyBoard();

        // Logic for each iteration here

        for( let y = 0; y < this.rows; y++) {
            for( let x = 0; x < this.cols; x++) {
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
        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        },
        this.state.interval);
    }

    countNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for( let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if( x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
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

    makeEmptyBoard() {
        let board = [];
        for(let y = 0; y < this.rows; y++) {
            board[y] = [];
            for(let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }

    makeCells() {
        let cells = [];
        for(let y = 0; y < this.rows; y++) {
            for(let x = 0; x < this.cols; x++) {
                if(this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x:(rect.left + window.pageXOffset) - doc.clientLeft, 
            y:(rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    handleClick = e => {
        const elemOffset = this.getElementOffset();
        const offsetX = e.clientX - elemOffset.x;
        const offsetY = e.clientY - elemOffset.y;
        const x = Math.floor(offsetX / cell_size);
        const y = Math.floor(offsetY / cell_size);

        if(x >= 0 && x<= this.cols && y>= 0 && y<= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells() });
    }

    render() {
        const { cells } = this.state;
        return (
            <div className = "Game">
                <div className = "Board" style = {{width: width, height: height, 
                    backgroundSize: `${cell_size}px ${cell_size}px`
                    }}
                    onClick = {this.handleClick}
                    ref={(n) => {this.boardRef = n; }}>
                    {cells.map(cell => (
                        <Cell x={cell.x} y ={cell.y} key= {`${cell.x}, ${cell.y}`}/>
                    ))}
                </div>

                <div className = "Controls">
                    Update every <input value = {this.state.interval} onChange={this.handleIntervalChange} /> msec
                    {this.isRunning ? <button className= "button" onClick={this.stopGame}>Stop</button> : 
                    <button className= "button"  onClick= {this.runGame}>Start</button>}
                </div>
            </div>
        );
    }
}


export default Game;