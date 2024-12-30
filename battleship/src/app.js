import { Ship, Gameboard, Player } from './modules.js';



export function Game(playerOne, playerTwo) {
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.currentPlayer = playerOne;
  this.nextPlayer = playerTwo;
  this.gameStatus = true;
}

Game.prototype = {
  constructor: Game,
  placeShips: function (player) {
    let gameboard = player.gameboard;
    /*
    gameboard.placeShip(new Ship(5), 3, 3);
    gameboard.placeShip(new Ship(4), 2, 4, true);
    gameboard.placeShip(new Ship(3), 1, 1);
    gameboard.placeShip(new Ship(2), 5, 7, true);*/
    gameboard.placeShip(new Ship(1), 0, 0, true);
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

        //td.textContent = gameboard[y][x].ship == null ? '' : "ship";
      }
    }
  },
  render: function(player) {
    document.getElementById('gameInfo').innerHTML = 
    `<strong>Game Info:</strong>
    <p>Who's turn: ${this.currentPlayer.name}</span></p>
    <p>${this.gameStatus ? "" : `Winner: ${this.nextPlayer.name}`}</p>
    `;

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
    let board = document.getElementById(player.name);

        board.addEventListener('click', (e) => {

          let target = e.target;
          let x = target.dataset.x
          let y = target.dataset.y;
          if(this.gameStatus) {
          if(this.currentPlayer !== player) {
            if(!player.gameboard.isAttacked(x,y)) {
              player.gameboard.receiveAttack(x,y);

              let tempPlayer = this.currentPlayer;
              this.currentPlayer = this.nextPlayer;
              this.nextPlayer = tempPlayer;
              if(player.gameboard.allShipsSunk()) {
                this.gameStatus = false;
              }
              this.render(player);
            }

          }
        }
          
        })
    
  }

}


function startGame() {
  const boardContainer = document.getElementById('boardContainer');
  boardContainer.innerHTML = '';
  const human = new Player('human');
  const computer = new Player('computer');

  const game = new Game(human, computer);
  game.placeShips(human);
  game.display(human, "board-one");
  game.placeShips(computer);
  game.display(computer, "board-two");
  game.render(human);
  game.attackEvent(game.playerOne);
  game.attackEvent(game.playerTwo);
};


const button = document.querySelector('button');
    button.addEventListener('click', ()=> {
      startGame();
    })








