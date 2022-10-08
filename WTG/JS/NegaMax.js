/*const turnAINega = (board, currentPlayer) => {

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
        
            let score = negamax(board, 9, -1);
            console.log(score)
            if (bestScore < score) 
            {
                bestScore = score;
                move = tile;
            }
    }
    shared.handleResultValidation();
    shared.changePlayer();
}

const negamax = (board, depth, color) =>{
    //console.log(depth+" poziom");
    if (depth == 0|| board.length ==0) {
        return color;
    }
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++){
        if (board[i].textContent == ''){
            board[i].textContent = "ai";
            let score = negamax(board, depth-1, -color);
            board[i].textContent = '';
            bestScore= Math.max(bestScore,-score);
        }
                
    }
   return bestScore;
}*/
