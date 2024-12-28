import { Ship, Gameboard, Player } from './modules.js';

/*

function Game(playerOne, playerTwo) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.currentPlayer = playerOne;
  this.nextPlayer = playerTwo;
  this.isGameStart = true;
}

Game.prototype = {
  constructor: Game,
  placeShips: function (gameboard) {
    console.log(gameboard.placeShip(new Ship(1), 3, 3));
    console.log(gameboard.placeShip(new Ship(1), 2, 4, true));
    console.log(gameboard.placeShip(new Ship(1), 0, 0));
    console.log(gameboard.placeShip(new Ship(1), 5, 7, true));
    console.log(gameboard.placeShip(new Ship(1), 1, 1, true));
  },

  display: function (player, elementId) {
    const board = document.getElementById(elementId);
    const table = document.createElement("table");
    const gameboard = player.gameboard.board;
    for (let x = 0; x < gameboard.length; x++) {
      const tr = document.createElement("tr");
      table.appendChild(tr);
      for (let y = 0; y < gameboard[0].length; y++) {
        const td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = gameboard[x][y].ship == null ? '' : "ship";
        
        td.addEventListener('click', ()=>{
          if(this.isGameStart) {
            if(this.currentPlayer != player) {
              if(!player.gameboard.missedAttacks.contains([x,y]) &&
            !player.gameboard.hitedAttacks.contains([x,y])
            ) {
          
              console.log(player.gameboard.receiveAttack(x,y))
              
              }
            }
          }
        })
      }
    }
  board.appendChild(table);
  },

  render: function() {

  }
}


function setGame() {
  const game = new Game(new Player('human'), new Player('computer', true));
  game.placeShips(game.playerOne.gameboard);
  game.display(game.playerOne, "board-one");
  game.placeShips(game.playerTwo.gameboard);
  game.display(game.playerTwo, "board-two");
};

setGame();

*/

