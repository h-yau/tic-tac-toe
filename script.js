const player = (sign) => {

    const playMove = () => {
        return sign;
    };
    return {playMove};
};

const gameController = (() => {
    const player1 = player("o");
    player1.name = "Player 1";
    const player2 = player("x");
    player2.name = "Player 2";
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
            [gameArray[0][1], gameArray[1][1], gameArray[2][1]],
            [gameArray[0][2], gameArray[1][2], gameArray[2][2]],
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

    const playGame = (location) => {

        // The commented out code is for console play only
        //let location = prompt("Insert your input here").split(",").map(coordinate => Number(coordinate));
        let isRoundSuccessful = playRoundSuccessfully(location);
        if (isRoundSuccessful) {
            console.table(gameArray);
            if (isThereWinner()) {
                announceWinner();
                endGame();

            } else if (isItTied()) {
                announceTie();
                endGame();
            }
            return [retrieveCurrentPlayer(), hasGameEnded()];
            // togglePlayers();   
        }
        return null;

    }

    const endGame = () => {
        hasGameEnded = () => true;
        console.log("Game ended!");
    }

    const restartGame = () => {
        clearGameArray();
        hasGameEnded = () => false;
        isPlayer1sTurn = true;
    }

    return {player1, player2, gameArray, togglePlayers, retrieveCurrentPlayer, playGame, restartGame};
})();

const displayController = ((doc) => {
    
    const gameboardContainer = doc.querySelector('.gameboardContainer');
    const restartButton = doc.querySelector('.restart');

    restartButton.addEventListener('click', () => {
        resetDisplay();
        gameController.restartGame();
    });

    gameboardContainer.classList.add(gameController.retrieveCurrentPlayer().playMove());

    const cells = doc.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            let clickedCoordinates = [Math.floor(index / 3), index % 3];
            console.log(clickedCoordinates);
            let [curPlayer, isItOver] = gameController.playGame(clickedCoordinates);
            if (curPlayer != null) {
                addSignToDisplay(cell, curPlayer);

                if (isItOver) {
                    disableDisplay();
                    alert(`${curPlayer.name} won!`);
                    return;
                }
                gameController.togglePlayers();
                changeGameboardContainerClass();
            };        
        });
    });

    const changeGameboardContainerClass = () => {
        clearGameboardContainerClass();
        gameboardContainer.classList.add(gameController.retrieveCurrentPlayer().playMove());
    };

    const addSignToDisplay = (htmlCell, player) => {
        htmlCell.classList.add(player.playMove());
    };

    const clearGameboardContainerClass = () => {
        gameboardContainer.className = 'gameboardContainer';
    }

    const resetDisplay = () => {
        clearGameboardContainerClass();
        clearDisplayCells();
        gameboardContainer.classList.add(gameController.player1.playMove());
    };

    const clearDisplayCells = () => {
        cells.forEach(cell => {
            cell.className = 'cell';
        });
    };

    const disableDisplay = () => {
        gameboardContainer.classList.add('disabled');
    }
})(document); 