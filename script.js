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


const displayController = (() => {

    const gameboardContainer = document.getElementsByClassName("gameboardContainer")[0];

    for (let i = 0; i < gameBoard.length; i++) {

        for (let j = 0; j < gameBoard[i].length; j++){

            const cell = document.createElement("div");
            cell.textContent = gameBoard[i][j];
            cell.classList.add("cell");
            gameboardContainer.appendChild(cell);
        }     
    }
})();


function Player(input) {

    const move = () => input;
    const playerMove = () => {

        const cells = Array.from(document.getElementsByClassName("cell"));
        cells.forEach(cell => {

            cell.addEventListener("click", () => {

                if (cell.textContent != "") {
                    return;
                }

                cell.textContent = move();
                togglePlayers();
            });
        });
    }
    return {playerMove};
}

const preparePlayers = (() => {

    const player1 = Player("o");
    const player2 = Player("x");
    const state = {
        player1Playing: true,
        player1,
        player2,
    }

    return state;
})();

function togglePlayers () {

    if(preparePlayers.state.player1Playing) {

        preparePlayers.state.player1Playing = false;

    } else {

        preparePlayers.state.player1Playing = true;

    }
}

// const gameState = preparePlayers();
