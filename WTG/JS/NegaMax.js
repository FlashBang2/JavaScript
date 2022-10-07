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
        /*let move = availabeMoves[Math.floor(Math.random()*(availabeMoves.length-1))];
        board[move].innerText = currentPlayer;
        board[move].classList.add(`player${currentPlayer}`);*/
        
            let score = negamax(board, 2, -1, availabeMoves);
            if (bestScore < score) 
            {
                bestScore = score;
                move = tile;
            }
    }
    shared.handleResultValidation();
    shared.changePlayer();
}

const negamax = (board, depth, color, availabeMoves) =>{
    if (depth == 0) {
        return color;
    }
    console.log(availabeMoves);
    bestScore = -Infinity;
    for (let i = 0; i < availabeMoves.length; i++){
            if (board[i].textContent == ''){
                bestScore= Math.max(bestScore, -negamax(board, depth-1, -color));
            }
    }
    console.log(bestScore)
   return bestScore;
}
