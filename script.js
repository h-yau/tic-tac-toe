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


const displayController = ((gameboardContainer) => {
    for (let i = 0; i < gameBoard.length; i++) {

        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < gameBoard[0].length; j++){
            const box = document.createElement("div");
            box.textContent = gameBoard[i][j];
            row.appendChild(box);
        }

        gameboardContainer.appendChild(row);        
    }


})(document.getElementsByClassName("gameboardContainer")[0]);