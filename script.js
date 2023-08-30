const gameBoard = (() => {
    
    const boardArray = [];
    const dimension = 3;
    for (let i = 0; i < dimension; i++) {
        const row = [];
        for (let j = 0; j < dimension; j++) {
            row.push(" ");
        }
        boardArray.push(row);
    }
    return boardArray;
})();


const displayController = ((gameboardContainer) => {
    for (let i = 0; i < gameBoard.length; i++) {

        const row = document.createElement("div");

        for (let j = 0; j < gameBoard[0].length; j++){
            const box = document.createElement("div");
            box.textContent = gameBoard[i][j];
            box.classList.add("cell");
            gameboardContainer.appendChild(box);
        }     
    }


})(document.getElementsByClassName("gameboardContainer")[0]);


function Player(input) {
    const move = () => input;
    const playerMove = () => {
        const cells = Array.from(document.getElementsByClassName("cell"));
        cells.forEach(cell => {
            cell.addEventListener("click", () => cell.textContent = move());
        });
    }
    return {playerMove};
}

function togglePlayers() {
    

}

const player1 = Player("x");
const player2 = Player("o");
player1.playerMove();