

    //Check every neighboring cell, as long as it is within grid, return amount that are true
    const countNeighbors = (board, x, y) => {
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

    export default countNeighbors;