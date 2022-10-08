const turnAI = (board, currentPlayer) =>{
    let availabeMoves = [];
    let bestScore = -Infinity;
    let move = -Infinity;
    for (let y = 0; y < board.length; y++)
    {
        if (board[y].classList.contains(`playerO`) || board[y].classList.contains(`playerX`))
            continue;
        availabeMoves.push(y);
    }
    if (availabeMoves.length > 0)
    { 
        availabeMoves.forEach((tile) =>{
            board[tile].innerText = currentPlayer;
            board[tile].classList.add(`player${currentPlayer}`);
            let score = minimax(board, 0, -Infinity, Infinity, false, 'O');
            board[tile].innerText = '';
            board[tile].classList.remove(`player${currentPlayer}`);
            if (score > bestScore)
            {
                bestScore = score;
                move = tile;
            }
        });
        board[move].innerText = currentPlayer;
        board[move].classList.add(`player${currentPlayer}`);
    }
    shared.handleResultValidation();
    shared.changePlayer();
}

const minimax = (board, depth, alpha, beta, isMaximizing, currentPlayer) =>{
    let availabeMoves = [];
    for (let y = 0;y < board.length;y++)
    {
        if (board[y].classList.contains(`playerO`) || board[y].classList.contains(`playerX`))
            continue;
        availabeMoves.push(y);
    }
    let winner = handleWinner(board);
    if (winner != null)
        return winner == 'X' ? 1 : -1;
    if (availabeMoves.length == 0)
        return 0;
    if (isMaximizing)
    {
        let bestScore = -Infinity;
        availabeMoves.forEach((tile) =>{
            board[tile].innerText = currentPlayer;
            board[tile].classList.add(`player${currentPlayer}`);
            let score = minimax(board, depth + 1, alpha, beta, false, 'O');
            board[tile].innerText = '';
            board[tile].classList.remove(`player${currentPlayer}`);
            bestScore = Math.max(score, bestScore);
        });
        
        return bestScore;
    }
    else
    {
        let bestScore = Infinity;
        availabeMoves.forEach((tile) =>{
            board[tile].innerText = currentPlayer;
            board[tile].classList.add(`player${currentPlayer}`);
            let score = minimax(board, depth + 1, alpha, beta, true, 'X');
            board[tile].innerText = '';
            board[tile].classList.remove(`player${currentPlayer}`);
            bestScore = Math.min(score, bestScore);
        });
        return bestScore;
    }
}

const handleWinner = (board) =>{
    if (board[0].classList.contains(`playerX`) && board[1].classList.contains(`playerX`) && board[2].classList.contains(`playerX`))
        return 'X';
    if (board[3].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[5].classList.contains(`playerX`))
        return 'X';
    if (board[6].classList.contains(`playerX`) && board[7].classList.contains(`playerX`) && board[8].classList.contains(`playerX`))
        return 'X';
    if (board[0].classList.contains(`playerX`) && board[3].classList.contains(`playerX`) && board[6].classList.contains(`playerX`))
        return 'X';
    if (board[1].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[7].classList.contains(`playerX`))
        return 'X';
    if (board[2].classList.contains(`playerX`) && board[5].classList.contains(`playerX`) && board[8].classList.contains(`playerX`))
        return 'X';
    if (board[0].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[8].classList.contains(`playerX`))
        return 'X';
    if (board[2].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[6].classList.contains(`playerX`))
        return 'X';
    if (board[0].classList.contains(`playerO`) && board[1].classList.contains(`playerO`) && board[2].classList.contains(`playerO`))
        return 'O';
    if (board[3].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[5].classList.contains(`playerO`))
        return 'O';
    if (board[6].classList.contains(`playerO`) && board[7].classList.contains(`playerO`) && board[8].classList.contains(`playerO`))
        return 'O';
    if (board[0].classList.contains(`playerO`) && board[3].classList.contains(`playerO`) && board[6].classList.contains(`playerO`))
        return 'O';
    if (board[1].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[7].classList.contains(`playerO`))
        return 'O';
    if (board[2].classList.contains(`playerO`) && board[5].classList.contains(`playerO`) && board[8].classList.contains(`playerO`))
        return 'O';
    if (board[0].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[8].classList.contains(`playerO`))
        return 'O';
    if (board[2].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[6].classList.contains(`playerO`))
        return 'O';
    return null;
}