const minimax = (board, depth, alpha, beta, isMaximizing, currentPlayer) =>{
    let availabeMoves = [];
    if (depth == 0) {
        window["node" + depth] = {
            text: { name: "Parent node" }
        };
    } else {
        window["node" + depth]= {
            parent: `node${depth-1}`,
            text: { name: `child${depth}` }
        };
    }
    shared.chartConfig.push(`node${depth}`);
    for (let y = 0;y < board.length;y++)
    {
        if (board[y].classList.contains(`playerO`) || board[y].classList.contains(`playerX`))
            continue;
        availabeMoves.push(y);
    }
    if (shared.validateDiagonalLines(currentPlayer) || shared.validateResultColumns(currentPlayer) || shared.validateResultRows(currentPlayer))
        return currentPlayer == 'X' ? 1 : -1;
    if (availabeMoves.length == 0)
        return 0;
    if (isMaximizing)
    {
        let bestScore = -Infinity;
        for (let tile of availabeMoves)
        {
            board[tile].innerText = currentPlayer;
            board[tile].classList.add(`player${currentPlayer}`);
            let score = minimax(board, depth + 1, alpha, beta, false, 'O');
            board[tile].innerText = '';
            board[tile].classList.remove(`player${currentPlayer}`);
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);
            if (beta <= alpha)
                break;
        }
        return bestScore;
    }
    else
    {
        let bestScore = Infinity;
        for (let tile of availabeMoves)
        {
            board[tile].innerText = currentPlayer;
            board[tile].classList.add(`player${currentPlayer}`);
            let score = minimax(board, depth + 1, alpha, beta, true, 'X');
            board[tile].innerText = '';
            board[tile].classList.remove(`player${currentPlayer}`);
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, score);
            if (beta <= alpha)
                break;
        }
        return bestScore;
    }
}