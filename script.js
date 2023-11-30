const player = (sign) => {


    const playMove = () => {
        return sign;
    };
    
    return {playMove};
};

const gameController = (() => {
    const player1 = player("o");
    const player2 = player("x");
    let isPlayer1sTurn = true;

    const gameArray = [];
    const DIMENSION = 3;

    for (let i = 0; i < DIMENSION; i++) {
        gameArray.push(["", "", ""]); 
    }

    const clearGameArray = () => {
        for (let i = 0; i < DIMENSION; i++) {
            for (let j = 0; j < DIMENSION; j++) {
                gameArray[i][j] = "";
            }
        }
    }

    const addMove = (coordinates, currentPlayer) => {
        const [row, col] = coordinates;
        
        // if cell is already occupied 
        if (gameArray[row][col] !== "") {
            return false;
        }
        gameArray[row][col] = currentPlayer.playMove();
        return true;
    };

    const togglePlayers = (isAddMoveSuccessful) {
        if(isAddMoveSuccessful) {
            isPlayer1sTurn = !isPlayer1sTurn;
        }
    }

    return {player1, player2, gameArray, addMove, clearGameArray};
})();