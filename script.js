const gameBoard = (() => {

    const boardRows = [];
    const dimension = 3;

    for (let i = 0; i < dimension; i++) {
        const row = [];

        for (let j = 0; j < dimension; j++) {
            row.push("");
        }

        boardRows.push(row);
    }

    return boardRows;
})();

const displayController = (() => {

    const clickListener = (cell, i, j) => {

        cell.addEventListener('click', (e) => {
                
            e.preventDefault();

            e.target.textContent = "o";
            console.log(e.target);
            e.target.setAttribute('disabled', '');
            if (!gameBoard[i][j]) {
                gameBoard[i][j] = "o";
            }
        });
    };

    const gameboardContainer = document.getElementsByClassName("gameboardContainer")[0];

    for (let i = 0, len = gameBoard.length; i < len; i++) {

        for (let j = 0, jlen = gameBoard[i].length; j < jlen; j++) {

            const cell = document.createElement('button');
            cell.textContent = gameBoard[i][j];
            cell.classList.add("cell");
            gameboardContainer.appendChild(cell);
            
            clickListener(cell, i, j);
        }
    }

})();


// function Player(input) {

//     const move = () => input;
//     const playerMove = () => {

//         const cells = Array.from(document.getElementsByClassName("cell"));
//         cells.forEach(cell => {

//             cell.addEventListener("click", () => {

//                 if (cell.textContent != "") {
//                     return;
//                 }

//                 console.log("clicked!")

//                 cell.textContent = move();
//                 // togglePlayers();
//             });
//         });
//     }
//     return {playerMove};
// }

// const preparePlayers = (() => {

//     const player1 = Player("o");
//     // const player2 = Player("x");
//     player1.playerMove();
//     // player2.playerMove();

//     const state = {

//         player1Playing: true,
//         player1,
//         // player2,
//     }

//     //test
//     console.log("Pass");

//     return state;
// })();

// function togglePlayers () {

//     if(preparePlayers.state.player1Playing) {

//         preparePlayers.state.player1Playing = false;

//     } else {

//         preparePlayers.state.player1Playing = true;

//     }
// }

// const gameState = preparePlayers();
// Player.playerMove();
