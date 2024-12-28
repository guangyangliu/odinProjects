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
    this.board = Array(10).fill().map(() => Array(10).fill().map(()=>({
        ship: null,
        attacked: false,
    })));
    this.ships = [];
    this.missedAttacks = [];
    this.hitedAttacks = [];
}

Gameboard.prototype = {
    constructor: Gameboard,
    
    placeShip: function(ship, x, y, isVertical = false) {

        //ship length should not exceed the boundry.
        if(ship.length + y > 10) return false;
        if(ship.length + x > 10) return false;

        //if a cell is occupied, then the ship can't be placed.
        if(isVertical) {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[y+i][x].ship) return false;
            }

            for(let i = 0; i < ship.length; i++) {
                this.board[y+i][x].ship = ship;
            }
            
        } else {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[y][x+i].ship) return false;
            }

            for(let i = 0; i < ship.length; i++) {
                this.board[y][x+i].ship = ship;                
            }

        }
        this.ships.push(ship);
        return true;
    },
    
    receiveAttack: function(x, y) {
        if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
        
        const positon = this.board[y][x];
    
        if (positon.ship) {
            positon.ship.hit();
            this.hitedAttacks.push([x, y]);
        } else {
            this.missedAttacks.push([x, y]);
        }
        
        return true;
    },
    
    allShipsSunk: function() {
        return this.ships.every(ship => ship.isSunk());
    },

    isAttacked: function(x, y) {
        return [...this.missedAttacks, ...this.hitedAttacks].some(
            (position) => position[0] === x && position[1] === y
        );
    }
}

export function Player(name, isReal = true) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.isReal = isReal;
}