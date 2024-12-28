import { Ship, Gameboard, Player} from "./src/modules";


test('Ship length', () => {
    expect(new Ship(3).length).toBe(3);
    expect(new Ship(0).length).toBe(0);
})

test('Ship was hit.', () => {
    let ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    
    ship.hit();
    expect(ship.hits).toBe(2);
    
    ship.hit();
    expect(ship.hits).toBe(3);
})

test('Ship was sunk.', () => {
    let ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})


test('Game board is 10*10 grid', ()=> {
    let gameBoard = new Gameboard();
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
    expect(gameBoard.board[9].length).toBe(10);
})


test('placeship: coordinate add length should less than 10', ()=> {
    let gameBoard = new Gameboard();
    expect(gameBoard.placeShip(new Ship(10), 0, 1, true)).toBe(false);
    expect(gameBoard.placeShip(new Ship(10), 0, 1, false)).toBe(false);
    expect(gameBoard.placeShip(new Ship(5), 5, 6, false)).toBe(false);
})


test('placeship: if a cell is occupied, the ship cannot be placed there', ()=> {
    let gameBoard = new Gameboard();
    gameBoard.board[5][5].ship = true;
    expect(gameBoard.placeShip(new Ship(6), 0, 5, false)).toBe(false);
    expect(gameBoard.placeShip(new Ship(5), 0, 5, false)).toBe(true);
    expect(gameBoard.placeShip(new Ship(1), 5, 5, false)).toBe(false);

    //test vertical placeship
    gameBoard.board[1][0].ship = true;
    expect(gameBoard.placeShip(new Ship(2), 0, 0, true)).toBe(false);

    //test horizonal placeship
    gameBoard.board[7][6].ship = true;
    gameBoard.board[7][7].ship = true;
    expect(gameBoard.placeShip(new Ship(2), 6, 7, false)).toBe(false);
    expect(gameBoard.placeShip(new Ship(2), 7, 7, false)).toBe(false);
})



test('placeship: if a ship is placed', ()=> {
    let gameBoard = new Gameboard();
    expect(gameBoard.board[5][0].ship).toBe(null);
    let shipA = new Ship(5);
    expect(gameBoard.board[5][0].ship).toBe(null);

    expect(gameBoard.placeShip(shipA, 5, 6, false)).toBe(false);
    expect(gameBoard.board[5][0].ship).toBe(null);
    expect(gameBoard.board[5][6].ship).toBe(null);

    expect(gameBoard.placeShip(shipA, 5, 5, false)).toBe(true);

    expect(gameBoard.board[5][5].ship).toBe(shipA);
    expect(gameBoard.board[5][9].ship).toBe(shipA);
    expect(gameBoard.board[5][0].ship).toBe(null);
    expect(gameBoard.board[5][4].ship).toBe(null);
    expect(gameBoard.board[5][1].ship).toBe(null);
    expect(gameBoard.board[4][5].ship).toBe(null);
})


test('test recieveAttack and if it can call hit function on thie ship or track attacks', ()=> {
    let gameBoard = new Gameboard();
    let ship = new Ship(5);
    gameBoard.placeShip(ship, 0, 0, false);
    expect(gameBoard.receiveAttack(5,0)).toBe(true);
    expect(ship.hits).toBe(0);
    expect(gameBoard.missedAttacks).toContainEqual([5,0]);
    expect(gameBoard.receiveAttack(4,0)).toBe(true);
    expect(ship.hits).toBe(1);
    expect(gameBoard.hitedAttacks).toContainEqual([4,0]);
})


test('test if all ships sunk', ()=> {
    let gameBoard = new Gameboard();
    let shipA = new Ship(2);
    let shipB = new Ship(3);
    gameBoard.placeShip(shipA, 0, 0, false);
    gameBoard.placeShip(shipB, 0, 1, false);
    expect(shipA.isSunk()).toBe(false);
    expect(shipB.isSunk()).toBe(false);
    expect(gameBoard.allShipsSunk()).toBe(false);

    gameBoard.receiveAttack(0,0);
    gameBoard.receiveAttack(1,0);
    expect(shipA.isSunk()).toBe(true);

    gameBoard.receiveAttack(0,1);
    gameBoard.receiveAttack(1,1);
    gameBoard.receiveAttack(2,1);
    expect(shipB.isSunk()).toBe(true);
    expect(gameBoard.allShipsSunk()).toBe(true);
})



test('Player', () => {
    let human = new Player('human');
    let computer = new Player('computer', false);
    expect(human.gameboard.board.length).toBe(10);
    expect(computer.gameboard.board.length).toBe(10);
    expect(human.isReal).toBe(true);
    expect(computer.isReal).toBe(false);
})
