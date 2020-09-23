import React from 'react';

const cell_size = 25;
const width = 600;
const height = 400;

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;

        return(
            <div className = "Cell" style={{ left: `${cell_size * x + 1}px`, top: `${cell_size * y + 1}px`, width: `${cell_size - 1}px`, height: `${cell_size - 1}px`}}></div>
        );
    }
}

export default Cell;