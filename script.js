const gameBoard = (() => {
    
    const boardArray = [];
    const dimension = 3;
    for (let i = 0; i < dimension; i++) {
        const row = [];
        for (let j = 0; j < dimension; j++) {
            row.push("x");
        }
        boardArray.push(row);
    }
    return boardArray;
})();


const displayController = ((doc) => {
    for (let i = 0; i < gameBoard.length; i++) {

        const row = doc.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < gameBoard[0].length; j++){
            const box = doc.createElement("div");
            box.textContent = gameBoard[i][j];
            row.appendChild(box);
        }

        doc.getElementsByTagName('body')[0].appendChild(row);        
    }


})(document);