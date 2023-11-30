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
        const [x, y] = coordinates;
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
        console.log(`Before toggle: ${activePlayer.name}`);
        activePlayer = activePlayer == player1 ? player2 : player1;
        console.log(`After toggle: ${activePlayer.name}`)
        return activePlayer;
    }

    let isFirstRound = true;

    const playRound = (coordinates) => {

        // let coordinates;
        // if (activePlayer == player1) {
        //     coordinates = prompt("Player 1's turn: ");
        // } else {
        //     coordinates = prompt("Player 2's turn: ");
        // }

        let isUpdateSuccessful = updateBoard(coordinates, activePlayer.playMove());

        // to check repeated move on a single cell
        if (!isUpdateSuccessful) {
            console.log("Update not successful!");
            return;
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

        if (isFirstRound) {
            isFirstRound = false;            
        }
        activePlayer = toggleActivePlayer();
        console.log(`Toggled result in playRound: ${activePlayer.name}`);
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

     // will turn on once it's the displaycontroller is completed
    //  startGame();
    return {getBoard, updateBoard, startGame, playRound, restartGame, activePlayer, toggleActivePlayer};
})();

const displayController = ((board) => {

    let currentMove = board.activePlayer.playMove();

    const gameboardContainer = document.getElementsByClassName("gameboardContainer")[0];

    if (gameboardContainer != null || gameboardContainer != undefined) {
        gameboardContainer.classList.add(currentMove);
    }

    const toggleDisplayGameBoard = () => {
        if (gameboardContainer == null || gameboardContainer == undefined) {
            return;
        }
        // somewhere around here? gameboardcontainer not changing
        // somehow the two modules are not agreeing which is the activePlayer. DisplayController only prints out the default one (player1), while the one on top actually changes
        gameboardContainer.classList.remove(currentMove);
        console.log(currentMove);
        currentMove = board.activePlayer.playMove();
        console.log(currentMove);
        gameboardContainer.classList.add(currentMove);

    };

    const addMove = (e, index) => {
  
        e.preventDefault()
        e.target.classList.add(currentMove);
        console.log(Math.floor(index / 3), index % 3);
        board.playRound([Math.floor(index / 3), index % 3]);
    };

    // add listeners to the cells
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            addMove(e, index);
            console.log(board.activePlayer);
            toggleDisplayGameBoard();

        });
    });


    return {currentMove, toggleDisplayGameBoard};
})(gameBoard);

const tester = gameBoard;