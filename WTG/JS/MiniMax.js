const turnAI = (board, currentPlayer) =>{
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

const minimax = (board, depth, alpha, beta, isMaximizing) =>{
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (board[i][j] == ''){
                    board[i][j] = ai;
                    let score = minimax(board, depth - 1, alpha, beta, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                    alpha = max(alpha, score);
                    if (beta <= alpha)
                        break;
                }
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth - 1, alpha, beta, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                    beta = min(beta, score);
                    if (beta <= alpha)
                        break;
                }
            }
            return bestScore
        }
    }
}