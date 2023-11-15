const player = (isItPlayer1) => {
    let mark = "x";
    if(isItPlayer1 == true) {
        mark = "o";
    }
    const playMove = () => {
        // e.target.classlist.add(mark);
        return mark;
    }
    return {playMove};
};

const gameBoard = (() => {
    const DIMENSION = 3;
    const board = [];

    // to create empty 2D array
    for (let i = 0; i < DIMENSION; i++) {
        board[i] = [, , , ];
    };

    const getBoard = () => board;
    const updateBoard = (cell, move) => {
        const [x, y] = cell;
        if (board[x][y] == null || board[x][y] == undefined) {
            board[x][y] = move;
        }
    } 

    const player1 = player(true);
    const player2 = player(false);  

    const activePlayer = player1;

    const toggleActivePlayer = () => {
        return activePlayer == player1 ? player2 : player1;
    }

    const isFirstRound = true;

    const playRound = () => {

        if (isFirstRound == false) {
            activePlayer = toggleActivePlayer();
        } else {
            isFirstRound = false;
        }

        let cell;
        if (player1.isPlaying) {
            cell = prompt("Player 1's turn: ");
        } else {
            cell = prompt("Player 2's turn: ");
        }
        const [x, y] = cell.split(",");

        console.log(x, y);
        console.table(getBoard());
    };

    const isWinner = () => {

    }

    const isTied = () => {

    }

    const startGame = () => {
        playRound();
     };

    return {getBoard, updateBoard, player1, player2, startGame, playRound};
})();

const displayController = (() => {
    console.table(gameBoard.getBoard());
})();