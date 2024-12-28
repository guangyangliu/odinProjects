import { Ship, Gameboard, Player } from './modules.js';



export function Game(playerOne, playerTwo) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.currentPlayer = playerOne;
  this.nextPlayer = playerTwo;
  this.isGameStart = true;
}

Game.prototype = {
  constructor: Game,
  placeShips: function (player) {
    let gameboard = player.gameboard;
    gameboard.placeShip(new Ship(5), 3, 3);
    gameboard.placeShip(new Ship(4), 2, 4, true);
    gameboard.placeShip(new Ship(3), 0, 0);
    gameboard.placeShip(new Ship(2), 5, 7, true);
    gameboard.placeShip(new Ship(1), 1, 1, true);
  },

  display: function (player, elementId) {
    const board = document.getElementById(elementId);
    const table = document.createElement("table");
    
    const name = document.createElement("p");
    name.textContent = `Player: ${player.name}`;
    board.appendChild(name);

    const gameboard = player.gameboard.board;
    for (let x = 0; x < gameboard.length; x++) {
      const tr = document.createElement("tr");
      table.appendChild(tr);
      for (let y = 0; y < gameboard[0].length; y++) {
        const td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = gameboard[y][x].ship == null ? '' : "ship";
        
        /*
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
        })*/

      }
    }
  board.appendChild(table);
  },

}



function setGame() {
  const human = new Player('human');
  const computer = new Player('computer');

  const game = new Game(human, computer);
  game.placeShips(human);
  game.display(human, "board-one");
  game.placeShips(computer);
  game.display(computer, "board-two");
};

setGame();




