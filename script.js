let body = document.querySelector("body");
let gameContainer = document.getElementById("gameContainer");
let button = document.getElementById("newGame");
let gameOver = false;


function gameBoard (row, col) {
    let board = document.createElement("div");
    board.id = "board";
    let info = document.createElement("div");
    info.id = "gameInfo";
    let cellGird = document.createElement("div");
    cellGird.id = "cellGird";
    gameContainer.appendChild(board);
    board.appendChild(info);
    board.appendChild(cellGird);

    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let cell = document.createElement("div");
            cell.id = `cell${i}${j}`;
            cellGird.appendChild(cell);
        }
        
    }
    return {board, info, cellGird};
}

function start() {
    
    gameContainer.remove();
    gameContainer = document.createElement("div");
    body.insertBefore(gameContainer, button);

    
    let startContainer = document.createElement("form");
    startContainer.id = "start";

    let playerOneLabel = document.createElement("label");
    playerOneLabel.textContent = "PlayerOne Name";
    let playerOneInput = document.createElement("input");
    playerOneInput.id = "playerOne";

    let playerTwoLabel = document.createElement("label");
    playerTwoLabel.textContent = "PlayerTwo Name";
    let playerTwoInput = document.createElement("input");
    playerTwoInput.id = "playerTwo";

    gameContainer.appendChild(startContainer);
    startContainer.appendChild(playerOneLabel);
    startContainer.appendChild(playerOneInput);
    startContainer.appendChild(playerTwoLabel);
    startContainer.appendChild(playerTwoInput);

    button.addEventListener("click", ()=>{
        let board = document.getElementById("board");
        if(gameOver) {
            playerOneInput = "";
            playerTwoInput = "";
            start();
            gameOver = false;
        } else if(playerOneInput.value && playerTwoInput.value && !board) {
            game(playerOneInput,playerTwoInput);
            startContainer.remove();
        }
    })
}

    function winner(board) {
        //check row;
        for (let row = 0; row < 3; row++) {
            let cell1 = document.getElementById(`cell${row}${0}`).textContent;
            let cell2 = document.getElementById(`cell${row}${1}`).textContent;
            let cell3 = document.getElementById(`cell${row}${2}`).textContent;
            if(cell1 === cell2 && cell2 === cell3) {
                return cell1;
            }
        }
        //check column;
        for (let col = 0; col < 3; col++) {
            let cell1 = document.getElementById(`cell${0}${col}`).textContent;
            let cell2 = document.getElementById(`cell${1}${col}`).textContent;
            let cell3 = document.getElementById(`cell${2}${col}`).textContent;
            if(cell1 === cell2 && cell2 === cell3) {
                return cell1;
            }
        }
    
        //check x line;
        let cell11 = document.getElementById(`cell${1}${1}`).textContent;
        let cell00 = document.getElementById(`cell${0}${0}`).textContent;
        let cell22 = document.getElementById(`cell${2}${2}`).textContent;
        let cell02 = document.getElementById(`cell${0}${2}`).textContent;
        let cell20 = document.getElementById(`cell${2}${0}`).textContent;
        if((cell11 === cell00 && cell00 === cell22) ||
        (cell11 === cell02 && cell02 === cell20)) {
            return cell11;
        }
        return "";
    }
    


function Player(name, content) {
    let token = 0;
    const addToken = () => token++;
    const getToken = () => token;
    return {name, content, getToken, addToken};
}

function game(playerOneInput, playerTwoInput) {
    const row = 3;
    const col = 3;
    let board = gameBoard(row, col);
    
    let gameInfo = document.getElementById("gameInfo");
    let finalWinner;
    let playerOne = Player(playerOneInput.value, "X");
    let playerTwo = Player(playerTwoInput.value, "O");
    let currentPlayer = playerOne;
    gameInfo.textContent = `${currentPlayer.name} turn`

    function isFull() {
        let totalToken = playerOne.getToken() + playerTwo.getToken();
        return totalToken >= 9;
    }

    function drawCell(cell) {
        if(gameOver) {
            return;
        }
        if (!cell.textContent) {
            cell.textContent = currentPlayer.content;
            currentPlayer.addToken();
            currentPlayer =  playerOne.getToken() > playerTwo.getToken() ? playerTwo : playerOne;
            gameInfo.textContent = `${currentPlayer.name} turn`
            finalWinner = winner(board);
            if(finalWinner) {
                let winnerName = finalWinner === playerOne.content ? playerOne.name : playerTwo.name;
                gameInfo.textContent = `${"The Winner: "}${winnerName}`;
                gameOver = true;
            } else if (isFull()) {
                gameInfo.textContent = "Tie";
                gameOver = true;
            }
    }
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let cell = document.getElementById(`cell${i}${j}`);;
            cell.addEventListener('click', ()=>{
                drawCell(cell);
            })
            
        }
    }

    
}



start();