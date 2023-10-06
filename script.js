const gameBoard = (() => {
    const DIMENSION = 3;
    const board = [];

    // to create empty 2D array
    for (let i = 0; i < DIMENSION; i++) {
        board[i] = [, , , ];
    }
    console.table(board);

    const getBoard = () => board;

    return {getBoard};
})();


