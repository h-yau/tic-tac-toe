const player = (isItPlayer1) => {
    let mark = "x";
    let name = "Player 2";
    if(isItPlayer1 == true) {
        mark = "o";
        name = "Player 1";
    }
    const playMove = () => {
        // e.target.classlist.add(mark);
        return mark;
    }
    return {playMove, name};
};

const gameBoard = (() => {
    const DIMENSION = 3;
    const board = [];

    // to create empty 2D array
    for (let i = 0; i < DIMENSION; i++) {
        board[i] = ["", "" , ""];
    };

    const getBoard = () => board;
    const updateBoard = (coordinates, move) => {
        const [x, y] = coordinates.replace(/\s+/g, "").split(",");
        if (board[x][y] == false || board[x][y] == null || board[x][y] == undefined) {
            board[x][y] = move;
            return true;
        }
        return false;
    } 

    // to set up players
    const player1 = player(true);
    const player2 = player(false);
    let hasGameEnded = false;  

    let activePlayer = player1;

    const toggleActivePlayer = () => {
        return activePlayer == player1 ? player2 : player1;
    }

    let isFirstRound = true;

    const playRound = () => {

        if (isFirstRound == false) {
            activePlayer = toggleActivePlayer();
        } else {
            isFirstRound = false;
        }

        let coordinates;
        if (activePlayer == player1) {
            coordinates = prompt("Player 1's turn: ");
        } else {
            coordinates = prompt("Player 2's turn: ");
        }

        let isUpdateSuccessful = updateBoard(coordinates, activePlayer.playMove());

        // to check repeated move on a single cell
        if (!isUpdateSuccessful) {
            console.log("Update not successful!");
            activePlayer = toggleActivePlayer();
        }

        // to console the table after every move, legal or not
        console.table(getBoard());
        if (isThereAWinner()) {
            console.log(`${activePlayer.name} wins!`);
            hasGameEnded = true;
        }

        // after checking winner, check if it's tied
        else if (isTied()) {
            console.log("It's a tie!");
            hasGameEnded = true;
        }

        // prompt to restart
        if (hasGameEnded) {
            let isToRestart = prompt("Do you want to restart game? Answer yes or no.");
            if (isToRestart == "yes") {
                restartGame();
            }
        }
    };

    const isThereAWinner = () => {
        let moveToCheck = activePlayer.playMove();

        const winningConditions = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];

        return winningConditions.some(condition => {
            return condition.every(cell => cell == moveToCheck);
        });
    }

    const isTied = () => {
        return board.every(row => {
            return row.every(cell => cell == 'o' || cell == "x");
        });
    }

    const restartGame = () => {
        
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = "";
            }
        }


        activePlayer = player1;
        isFirstRound = true;
        console.table(gameBoard.getBoard());
        startGame();
    }

    const startGame = () => {
        while(!hasGameEnded) {
            playRound();
        }
     };

    return {getBoard, updateBoard, startGame, restartGame};
})();

const displayController = (() => {
    console.table(gameBoard.getBoard());
})();