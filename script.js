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

const displayController = () => {

}();

const player = () => {
    let mark = "x";
    if(isPlayer1) {
        mark = "o";
    }
    const playMove = () => {
        e.target.classlist.add(mark);n
    };
};