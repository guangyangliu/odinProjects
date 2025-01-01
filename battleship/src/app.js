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
  placeShips: function () {
    randomPlaceShips(this.playerOne);
    randomPlaceShips(this.playerTwo);
    function randomPlaceShips(player) {
    let gameboard = player.gameboard;
    randomPlaceShip(gameboard, new Ship(5));
    randomPlaceShip(gameboard, new Ship(4));
    randomPlaceShip(gameboard, new Ship(3));
    randomPlaceShip(gameboard, new Ship(2));
    randomPlaceShip(gameboard, new Ship(1));
    function randomPlaceShip (gameBoard, ship) {
      while(!gameBoard.ships.includes(ship)) {
        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);
        let pointer = Math.random() < 0.5 ? true : false;
        gameBoard.placeShip(ship, x, y, pointer);
      }
    }
  }
  },

  displayBoards: function () {
    display(this.playerOne, "board-one");
    display(this.playerTwo, "board-two");

    function display (player) {
      //create a board with player's name.
      const boardContainer = document.getElementById('boardContainer');
      const board = document.createElement('div');
      board.id = player.name;
      boardContainer.appendChild(board);
  
      //show player's name in the board.
      const name = document.createElement("p");
      name.textContent = `Board: ${player.name}`;
      board.appendChild(name);
  
      //create a table to represent the board.
      const table = document.createElement("table");
      board.appendChild(table);
  
      const gameboard = player.gameboard.board;
      for (let y = 0; y < gameboard.length; y++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (let x = 0; x < gameboard[0].length; x++) {
          const td = document.createElement("td");
          td.id = `position-${x}${y}`;
          
          //store data
          td.setAttribute('data-x',x);
          td.setAttribute('data-y', y);
  
          tr.appendChild(td);
  
          //td.textContent = gameboard[y][x].ship == null ? '' : "ship";
        }
      }
    }
  },

  render: function() {
    document.getElementById('gameInfo').innerHTML = 
    `<strong>Game Info:</strong>
    <p>${this.gameStatus ? "" : `Winner: ${this.currentPlayer.name}`}</p>
    `;

    function renderPlayer (player) {
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
    }

    renderPlayer (this.playerOne);
    renderPlayer (this.playerTwo);
  },

  boardAttackEvent: function(player) {
    let game = this;
    //computer attack
    
    function randomPlay (player) {
      let x = Math.floor(Math.random()*10);
      let y = Math.floor(Math.random()*10);

      while(player.gameboard.isAttacked(x, y)) {
        x = Math.floor(Math.random()*10);
        y = Math.floor(Math.random()*10);
      }

      player.gameboard.receiveAttack(x, y);
      if(player.gameboard.allShipsSunk()) {
        game.gameStatus = false;
      } else {
        changePlayer();
      }
      
      console.log(player.gameboard.missedAttacks);
      console.log(player.gameboard.missedAttacks);
    }

    function changePlayer() {
      let tempPlayer = game.currentPlayer;
      game.currentPlayer = game.nextPlayer;
      game.nextPlayer = tempPlayer;
    }

    let board = document.getElementById(player.name);
    // human attack
    console.log(player.isReal);
    
    if(player.isReal) return;
    board.addEventListener('click', (e) => {
      let target = e.target;
      let x = target.dataset.x
      let y = target.dataset.y;
      if(!game.gameStatus) return;
      if(game.currentPlayer == player) return;
      if(!player.gameboard.isAttacked(x,y)) {
        player.gameboard.receiveAttack(x,y);
        if(player.gameboard.allShipsSunk()) {
          game.gameStatus = false;
        } else {
          changePlayer();
          randomPlay(game.nextPlayer);
        }
        game.render();
      }
    })
    
  }

}


function startGame() {
  const boardContainer = document.getElementById('boardContainer');
  boardContainer.innerHTML = '';

  const human = new Player('human');
  const computer = new Player('computer', false);
  const game = new Game(human, computer);

  game.placeShips();
  game.displayBoards();
  game.render();
  game.boardAttackEvent(game.playerOne);
  game.boardAttackEvent(game.playerTwo);
};

/*
const button = document.querySelector('button');
    button.addEventListener('click', ()=> {
      startGame();
    })
*/







