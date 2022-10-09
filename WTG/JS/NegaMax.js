const negamax = (board, depth, alpha, beta, currentPlayer) =>{
    let availabeMoves = [];
    console.log(board);
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
    let bestScore = -Infinity;
    for (let tile of availabeMoves)
    {
        board[tile].innerText = currentPlayer;
        board[tile].classList.add(`player${currentPlayer}`);
        bestScore = Math.max(bestScore, -negamax(board, depth + 1, -alpha, -beta, swapPlayer(currentPlayer)));
        board[tile].innerText = '';
        board[tile].classList.remove(`player${currentPlayer}`);
    }
    return bestScore;
}

const swapPlayer = (currentPlayer) => {
    return currentPlayer === 'X' ? 'O' : 'X';
}
