const player = (isItPlayer1) => {
    const isPlaying = false;
    let mark = "x";
    if(isItPlayer1 == true) {
        mark = "o";
    }
    const playMove = () => {
        // e.target.classlist.add(mark);
        return mark;
    }
    return {playMove, isPlaying};
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

    const isWinner = () => {

    }

    const isTied = () => {

    }

    return {getBoard, updateBoard, player1};
})();

const displayController = (() => {
    console.table(gameBoard.getBoard());
})();



const togglePlayers = () => {
    if (!player1.isPlaying && !player2.isPlaying) {
        player1.isPlaying = true;
    } else {
        player1.isPlaying = !player1.isPlaying;
        player2.isPlaying = !player2.isPlaying;
    }
};