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

  display: function (player) {

    //create a board with player's name.
    const boardContainer = document.getElementById('boardContainer');
    const board = document.createElement('div');
    board.id = player.name;
    boardContainer.appendChild(board);

    //show player's name in the board.
    const name = document.createElement("p");
    name.textContent = `Player: ${player.name}`;
    board.appendChild(name);

    //create a table to represent the board.
    const table = document.createElement("table");
    board.appendChild(table);

    const gameboard = player.gameboard.board;
    for (let x = 0; x < gameboard.length; x++) {
      const tr = document.createElement("tr");
      table.appendChild(tr);
      for (let y = 0; y < gameboard[0].length; y++) {
        const td = document.createElement("td");
        td.id = `position-${x}${y}`;
        
        //store data
        td.setAttribute('data-x',x);
        td.setAttribute('data-y', y);

        tr.appendChild(td);
        td.textContent = gameboard[y][x].ship == null ? '' : "ship";
      }
    }
  },
  render: function(player) {
    const {missedAttacks, hitedAttacks} = player.gameboard;
    let boardDiv = document.getElementById(player.name);
    missedAttacks.forEach(postion => {
      let td = boardDiv.querySelector(`#position-${postion[0]}${postion[1]}`);
      td.classList.add('missed');
    });

    hitedAttacks.forEach(postion => {
      let td = boardDiv.querySelector(`#position-${postion[0]}${postion[1]}`);
      td.classList.add('hited');
    });
  },
  attackEvent: function(player) {
    if(this.isGameStart) {
      if(this.currentPlayer !== player) {
        let board = document.getElementById(player.name);
        board.addEventListener('click', (e) => {
          let target = e.target;
          let x = target.dataset.x
          let y = target.dataset.y;
          console.log(`x${x}y${y}`);
        })
      }
    }
  }

}



function setGame() {
  const human = new Player('human');
  const computer = new Player('computer');

  const game = new Game(human, computer);
  game.placeShips(human);
  game.display(human, "board-one");
  game.placeShips(computer);
  game.display(computer, "board-two");
  human.gameboard.missedAttacks.push([0,0]);
  human.gameboard.hitedAttacks.push([1,1]);
  game.render(human);
  game.attackEvent(computer);
};

setGame();




