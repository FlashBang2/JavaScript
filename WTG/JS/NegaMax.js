const negamax = (board, depth, alpha, beta, currentPlayer) =>{
    let availabeMoves = [];
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
    bestScore = -Infinity;
    for (let tile of availabeMoves)
    {
        board[tile].innerText = currentPlayer;
        board[tile].classList.add(`player${currentPlayer}`);
        score = -negamax(board, depth + 1, -alpha, -beta, () =>currentPlayer == 'X' ? 'O': 'X');
        board[tile].innerText = '';
        board[tile].classList.remove(`player${currentPlayer}`);
        bestScore = Math.max(score, bestScore);
    }
    return bestScore;
}
