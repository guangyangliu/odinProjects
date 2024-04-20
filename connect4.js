/*
** The Gameboard represents the state of the board
** Each equare holds a Cell (defined later)
** and we expose a dropToken method to be able to add Cells to squares
*/

function Gameboard() {
    const rows = 6;
    const columns = 7;
    const board = [];
  
    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    // This nested-loop technique is a simple and common way to create a 2d array.
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  
    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;
  
    // In order to drop a token, we need to find what the lowest point of the
    // selected column is, *then* change that cell's value to the player number
    const dropToken = (column, player) => {
      // Our board's outermost array represents the row,
      // so we need to loop through the rows, starting at row 0,
      // find all the rows that don't have a token, then take the
      // last one, which will represent the bottom-most empty cell
      const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
  
      // If no cells make it through the filter, 
      // the move is invalid. Stop execution.
      if (!availableCells.length) return;
  
      // Otherwise, I have a valid cell, the last one in the filtered array
      const lowestRow = availableCells.length - 1;
      board[lowestRow][column].addToken(player);
    };
  
    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    };
  
    // Here, we provide an interface for the rest of our
    // application to interact with the board
    return { getBoard, dropToken, printBoard };
  }
  
  /*
  ** A Cell represents one "square" on the board and can have one of
  ** 0: no token is in the square,
  ** 1: Player One's token,
  ** 2: Player 2's token
  */
  
  function Cell() {
    let value = 0;
  