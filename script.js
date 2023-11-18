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
        board[i] = ["", "" , ""];
    };

    const getBoard = () => board;
    const updateBoard = (coordinates, move) => {
        const [x, y] = coordinates.split(",");
        if (board[x][y] == false || board[x][y] == null || board[x][y] == undefined) {
            board[x][y] = move;
        }
    } 

    const player1 = player(true);
    const player2 = player(false);  

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
        const [x, y] = coordinates.split(",");

        // work on this NEXT!!!!!!!!!!!!!!!!
        console.log(x, y);
        updateBoard(coordinates, activePlayer.playMove());
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