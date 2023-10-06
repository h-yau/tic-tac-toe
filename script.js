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
        board[x][y] = move;
    };

    const isWinner = () => {

    };

    const isTied = () => {

    };

    return {getBoard, updateBoard};
})();

const displayController = (() => {
    console.table(gameBoard.getBoard());
})();

const player = () => {
    let mark = "x";
    if(isPlayer1) {
        mark = "o";
    }
    const playMove = () => {
        e.target.classlist.add(mark);n
    };
};