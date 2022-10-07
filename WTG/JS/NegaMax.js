const turnAI = (board, currentPlayer) => {
    let availabeMoves = [];
        for (let y = 0; y < board.length; y++)
        {
            if (board[y].classList.contains(`playerO`) || board[y].classList.contains(`playerX`))
                continue;
            availabeMoves.push(y);
        }
    if (availabeMoves.length > 0)
    { 
        let move = availabeMoves[Math.floor(Math.random()*(availabeMoves.length-1))];
        board[move].innerText = currentPlayer;
        board[move].classList.add(`player${currentPlayer}`);
    }
    shared.handleResultValidation();
    shared.changePlayer();
}

const negamax = (board, depth, color) =>{
    if (depth == 0) {
        return color*board.length;
    }
    var value = -Infinity;
    for (let i = 0; i < board.length; i++){
            if (board[i] == ''){
                value= Math.max(value, -negamax(board, depth-1, -color));
            }
    }

   return value;
}
