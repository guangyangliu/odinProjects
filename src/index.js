const _ = require('lodash');



function knightMoves(start, end) {
    let shortestPath = knightMoveShortestPath(start, end);
    let string = `You made it in ${shortestPath.length - 1} moves!  Here's your path:`
    for (let move of shortestPath) {
        string += `\n[${move}]`
    }
    console.log(string);
}


function knightMoveShortestPath(start, end, visited = []) {
    if (_.isEqual(start, end)) {
        return [start];
    }
    visited.push(start);
    let moves = basicMove(start, visited);

    if(moves.length < 1) {
        return null;
    }
    
    let pathLength = 64;
    let shortestPath;
    for (let move of moves) {
        let path = [];
        path = knightMoveShortestPath(move, end, visited);

        if(path) {
            path.unshift(start);
            if(path.length < pathLength) {
                pathLength = path.length;
                shortestPath = path;
            }
        }
    }

    return shortestPath;
}


function basicMove(start, visited) {
    let i = start[0];
    let j = start[1];
    let basicMoves = [];
    basicMoves.push([i+2, j+1]);
    basicMoves.push([i+2, j-1]);
    basicMoves.push([i-2, j+1]);
    basicMoves.push([i-2, j-1]);

    basicMoves.push([i+1, j+2]);
    basicMoves.push([i+1, j-2]);
    basicMoves.push([i-1, j+2]);
    basicMoves.push([i-1, j-2]);

    function isContain(visited, square) {
        for (let v of visited) {
            if (_.isEqual(v, square)) {
                return true;
            }
        }
        return false;
    }

    function isInbound(square) {
        let i = square[0];
        let j = square[1];
        return i >= 0 && i <=7 && j >=0 && j <=7;
    }

    return basicMoves.filter(square => isInbound(square) && !isContain(visited, square));
}


knightMoves([0,0],[3,3]);
knightMoves([3,3],[0,0]);
knightMoves([0,0],[7,7]);
knightMoves([3,3],[4,3]);


/*
calculate path from start to end = calculate basic move + path from next start to end recursively.
define and find basic moves.
store every basic move and dont' run back.???
compare every path and return the shortest one.
*/
