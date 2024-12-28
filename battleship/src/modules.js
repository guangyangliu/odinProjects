export function Ship(length) {
    this.length = length;
    this.hits = 0;
}

Ship.prototype = {
    consrtuctor: Ship,
    hit: function () {this.hits++},
    isSunk: function () {return this.hits >= this.length}
}


export function Gameboard() {
    this.board = Array(10).fill().map(() => Array(10).fill(null));
    this.ships = [];
    this.missedAttacks = [];
}

Gameboard.prototype = {
    constructor: Gameboard,
    
    placeShip: function(ship, x, y, isVertical = false) {
        // Validate placement is within bounds
        if (isVertical && y + ship.length > 10) return false;
        if (!isVertical && x + ship.length > 10) return false;
        
        // Check if space is already occupied
        for (let i = 0; i < ship.length; i++) {
            const checkX = isVertical ? x : x + i;
            const checkY = isVertical ? y + i : y;
            if (this.board[checkY][checkX] !== null) return false;
        }
        
        // Place the ship
        for (let i = 0; i < ship.length; i++) {
            const placeX = isVertical ? x : x + i;
            const placeY = isVertical ? y + i : y;
            this.board[placeY][placeX] = {
                ship: ship,
                index: i
            };
        }
        
        this.ships.push(ship);
        return true;
    },
    
    receiveAttack: function(x, y) {
        if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
        
        const target = this.board[y][x];
        if (target === null) {
            this.missedAttacks.push([x, y]);
            return true;
        }
        
        if (target.ship) {
            target.ship.hit();
            return true;
        }
        
        return false;
    },
    
    allShipsSunk: function() {
        return this.ships.every(ship => ship.isSunk());
    }
}

export function Player(name, isComputer = false) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
}