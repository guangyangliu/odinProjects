import { Ship, Gameboard} from "./app";

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

