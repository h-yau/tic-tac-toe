const Gameboard = (() => {
    const board = (() => {
        const rows = []; 
        for (let i = 0; i < 3; i ++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push(" ");
            }
            rows.push(row);
        }
        return rows;
    })();

    console.table(board);
    console.log(board.length);
    
    return {board};
})();

(function () {
    const displayController = document.getElementsByTagName('main')[0];
})();

function Player() {
    
}
