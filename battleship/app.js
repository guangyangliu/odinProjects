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
    this.board = new Array(10);
}

Gameboard.prototype = {
    consrtuctor: Gameboard,
    placeShip: function(ship, x, y) {
    },
    receiveAttack: function (x,y) {

    },

}