import { Ship, Gameboard, Player } from './modules.js';


function game() {
  const player_one = new Player('human');
  placeShips(player_one.gameboard);
  display(player_one, "board-one");

  const player_two = new Player('human');
  placeShips(player_two.gameboard);
  display(player_two, "board-two");

  const currentPlayer = player_one;
  const nextPlayer = player_two;

  gameTurn();

}

function placeShips (gameboard) {
  console.log(gameboard.placeShip(new Ship(5), 5, 5));
  console.log(gameboard.placeShip(new Ship(4), 2, 4, true));
  console.log(gameboard.placeShip(new Ship(3), 0, 0));
  console.log(gameboard.placeShip(new Ship(2), 5, 7, true));
  console.log(gameboard.placeShip(new Ship(1), 1, 1, true));
}

function display(player, elementId) {
  const board = document.getElementById(elementId);
  const table = document.createElement("table");

  player.gameboard.board.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell ? cell.index : "";
      tr.appendChild(td);
    })
    table.appendChild(tr);
  }
);
board.appendChild(table);

board.addEventListener('click', (e)=>{
  let target = e.target;
  if (target.textContent) {
    target.style.backgroundColor = 'red';
  }
})
}


game();