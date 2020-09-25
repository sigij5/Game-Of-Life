# Game-Of-Life

This project is John Conway's Game of Life, built in React JS.

The page will include inputs to set the dimensions of the game grid, as well as control buttons.
I've used a simple state management system that includes the number of rows and columns, generation number, interval time, array of cells that are alive, and whether the game is running.  For my version of the Game Of Life, I chose to give the cells either a true/false value to represent their being alive or dead.  

The function to calculate the neighbors was tricky, and I had to draw a visualization in order to see all the directions that needed to be checked, and how to get there.  In the end, it loops through an array of directions, specified by their relation to the chosen cell on the x and y axis of the grid.

TODO list:
  - Add state and inputs/buttons to choose a color, or switch to random colors for cells
  - Design the page to be more appealing
  - Deploy the app
