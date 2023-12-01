const player = (sign) => {

    const playMove = () => {
        return sign;
    };
    return {playMove};
};

const gameController = (() => {
    const player1 = player("o");
    const player2 = player("x");
    let isPlayer1sTurn = true;

    let hasGameEnded = () => false;

    const gameArray = [];
    const DIMENSION = 3;

    for (let i = 0; i < DIMENSION; i++) {
        gameArray.push(["", "", ""]); 
    }

    const clearGameArray = () => {
        for (let i = 0; i < DIMENSION; i++) {
            for (let j = 0; j < DIMENSION; j++) {
                gameArray[i][j] = "";
            }
        }
    }

    // will return if the move is legal and added successfully
    const addValidMove = (coordinates, currentPlayer) => {
        const [row, col] = coordinates;
        
        // if cell is already occupied 
        if (gameArray[row][col] !== "") {
            return false;
        }
        gameArray[row][col] = currentPlayer.playMove();
        return true;
    };

    const togglePlayers = () => {
        isPlayer1sTurn = !isPlayer1sTurn;
    }

    const retrieveCurrentPlayer = () => {
        if (isPlayer1sTurn) {
            return player1;
        } else {
            return player2;
        }
    }

    const playRoundSuccessfully = (coordinates) => {
        const currentPlayer = retrieveCurrentPlayer();
        return addValidMove(coordinates, currentPlayer);
   };

    const isThereWinner = () => {
        const currentPlayer = retrieveCurrentPlayer();

        const winningConditions = [
            [gameArray[0][0], gameArray[0][1], gameArray[0][2]],
            [gameArray[1][0], gameArray[1][1], gameArray[1][2]],
            [gameArray[2][0], gameArray[2][1], gameArray[2][2]],
            [gameArray[0][0], gameArray[1][0], gameArray[2][0]],
            [gameArray[1][0], gameArray[1][1], gameArray[1][2]],
            [gameArray[2][0], gameArray[2][1], gameArray[2][2]],
            [gameArray[0][0], gameArray[1][1], gameArray[2][2]],
            [gameArray[0][2], gameArray[1][1], gameArray[2][0]] 
        ];

        return winningConditions.some(condition => {
            return condition.every(cell => cell == currentPlayer.playMove());
        });
    };

    const isItTied = () => {

        return gameArray.every(row => {
            return row.every(cell => cell == player1.playMove() || cell == player2.playMove());
        });
    }

    const announceWinner = () => {
        if (isPlayer1sTurn) {
            console.log("Player 1 won!");
        } else {
            console.log("Player 2 won!");
        }
    }

    const announceTie = () => {
        console.log("It's a tie!");
    }

    const playGame = () => {

        while (!hasGameEnded()) {
            let location = prompt("Insert your input here").split(",").map(coordinate => Number(coordinate));
            let isRoundSuccessful = playRoundSuccessfully(location);
            if (isRoundSuccessful) {
                console.table(gameArray);
                if (isThereWinner()) {
                    announceWinner();
                    endGame();
                    return;
                } else if (isItTied()) {
                    announceTie();
                    endGame();
                    return;
                }
                togglePlayers();   
            }
        }

    }

    const endGame = () => {
        hasGameEnded = () => true;
        console.log("Game ended!");
    }

    const restartGame = () => {
        clearGameArray();
        hasGameEnded = () => false;
        isPlayer1sTurn = true;
        playGame();
    }

    return {player1, player2, gameArray, addValidMove, clearGameArray, togglePlayers, retrieveCurrentPlayer, playRoundSuccessfully, isThereWinner, isItTied, playGame, endGame, restartGame};
})();

const displayController = ((doc) => {
    
    const gameboardContainer = doc.querySelector('.gameboardContainer');
    gameboardContainer.classList.add(gameController.retrieveCurrentPlayer().playMove());


})(document); 