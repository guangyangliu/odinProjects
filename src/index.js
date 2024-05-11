const _ = require('lodash');

function board() {
    let graph = [];
    for (let i = 0; i <= 7; i++) {
        graph[i] = [];
        for (let j = 0; j <= 7; j++) {
            graph[i].push(j);
        }
    }
    return graph;
}

board();


function knightMoves(start, end, visited = []) {
    if (_.isEqual(start, end)) {
        return [start];
    }
    visited.push(start);
    let moves = basicMove(start);
    moves = moves.filter(move=>!isContain(visited, move));

    if(!moves[0]) {
        return null;
    }
    
    let pathLength = 64;
    let shortestPath;
    for (let move of moves) {
        let path = [];
        path = knightMoves(move, end, visited);

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


function isContain(visited, square) {
    for (let v of visited) {
        if (_.isEqual(v, square)) {
            return true;
        }
    }
    return false;
}

function basicMove(start) {
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

    basicMoves = basicMoves.filter(square => square[0]>=0 && square[0]<=7 && square[1]>=0 && square[1]<=7);
    return basicMoves.length >= 1? basicMoves : null;
}

console.log(basicMove([0,0]));

console.log(knightMoves([0,0],[3,3]));
console.log(knightMoves([3,3],[0,0]));
console.log(knightMoves([0,0],[7,7]));


/*
calculate path from start to end = calculate basic move + path from next start to end recursively.
define and find basic moves.
store every basic move and dont' run back.???
compare every path and return the shortest one.
*/
