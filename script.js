const createPlayer = (move) => {

    const isPlaying = false;
    return { move, isPlaying };
}

const gameBoard = (() => {

    const boardRows = [];
    const dimension = 3;

    for (let i = 0; i < dimension; i++) {
        const row = [];

        for (let j = 0; j < dimension; j++) {
            row.push("");
        }

        boardRows.push(row);
    }

    return boardRows;
})();

const displayController = (() => {

    const gameboardContainer = document.getElementsByClassName("gameboardContainer")[0];

    let movesLeft = 9;

    const player1 = createPlayer('o');
    player1.isPlaying = true;
    const player2 = createPlayer('x');

    const hasGameEnded = (i, j) => {

        let verticalCheck = true, horizontalCheck = true;

         // to check diagonal
        if (gameBoard[1][1] != '' && (i + j == 0 || i + j == 4 || i + j == 2)) {

            if (gameBoard[0][0] == gameBoard[1][1] &&
                gameBoard[1][1] == gameBoard[2][2]) {
                    return true;
            }

            if (gameBoard[0][2] == gameBoard[1][1] &&
                gameBoard[1][1] == gameBoard[2][0]){
                    return true;
                }
        }

        for (let x = 0, dimension = gameBoard.length; x < (dimension - 1) && (horizontalCheck == true || verticalCheck == true); x++) {
            
            if (gameBoard[i][x] == '') {
                verticalCheck = false;
            }
            if (gameBoard[i][x] != gameBoard[i][x + 1]) {
                verticalCheck = false;
            }

            if (gameBoard[x][j] == '') {
                horizontalCheck = false;
            }
            if (gameBoard[x][j] != gameBoard[x + 1][j]) {
                horizontalCheck = false;
            }

            if (verticalCheck == false && horizontalCheck == false) {
                return false;
            }
        }
        console.log('winner!');
        return true;
    }

    const togglePlayers = () => {

        player1.isPlaying = !player1.isPlaying;
        player2.isPlaying = !player2.isPlaying;

    }

    const moveToUse = () => {
 
        if (player1.isPlaying) {
            return player1.move;
        } else {
            return player2.move;
        }
    }

    const disableBoard = () => {

        const cells = gameboardContainer.childNodes;
        console.log(cells);
        cells.forEach(cell => {
            cell.setAttribute('disabled', '');
        });
    }

    const announceWinner = () => {
        if (player1.isPlaying) {
            alert('Player 1 won!');
        } else {
            alert('Player 2 won!');
        }
    }

    const clickListener = (cell, i, j) => {

        cell.addEventListener('click', (e) => {
                
            e.preventDefault();

            const move = moveToUse();

            e.target.textContent = move;
            e.target.setAttribute('disabled', '');
            if (!gameBoard[i][j]) {

                gameBoard[i][j] = move;
                movesLeft--;
            }

            if (hasGameEnded(i, j)) {

                disableBoard();
                announceWinner();

            }

            if (movesLeft <= 0) {
                alert('Tie!');
            }
            togglePlayers();
        });
    };

    for (let i = 0, len = gameBoard.length; i < len; i++) {

        for (let j = 0, jlen = gameBoard[i].length; j < jlen; j++) {

            const cell = document.createElement('button');
            cell.textContent = gameBoard[i][j];
            cell.classList.add("cell");
            gameboardContainer.appendChild(cell);
            
            clickListener(cell, i, j);
        }
    }

})();