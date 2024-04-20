function gameBoard (row, col) {
    let board = [];
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
            board[i][j] = "";
        }
        
    }
    return board;
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
    

function Player(content) {
    let token = 0;
    const addToken = () => token++;
    const getToken = () => token;
    return {content, getToken, addToken};
}

function game() {
    const row = 3;
    const col = 3;
    let playerX = Player("X");
    let playerO = Player("O");
    let board = gameBoard(row, col);
    let gameInfo = document.querySelector(".gameInfo");
    let finalWinner;
    let currentPlayer = playerX;
    gameInfo.textContent = `${currentPlayer.content} turn`

    function isFull() {
        let totalToken = playerX.getToken() + playerO.getToken();
        return totalToken >= 9;
    }

    function drawCell(cell) {
        if (!cell.textContent) {
            cell.textContent = currentPlayer.content;
            currentPlayer.addToken();
            currentPlayer =  playerX.getToken() > playerO.getToken() ? playerO : playerX;
            gameInfo.textContent = `${currentPlayer.content} turn`
            finalWinner = winner(board);
            if(finalWinner) {
                gameInfo.textContent = `${"The Winner: "}${finalWinner}`;
            } else if (isFull()) {
                gameInfo.textContent = "Tie";
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

game();
