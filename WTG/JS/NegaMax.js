const negamax = (board, depth, alpha, beta, currentPlayer, color) =>{
    let availabeMoves = [];
    if (depth == 0) {
        window["node_" + depth] = {
            text: { name: `node_${depth}` }
        };
    } else {
        window["node_" + depth]= {
            parent: window["node_" + (depth-1)],
            text: { name: `node_${depth}` }
        };
    }
    shared.chartConfig.push( window["node_" + depth]);
    for (let y = 0;y < board.length;y++)
    {
        if (board[y].classList.contains(`playerO`) || board[y].classList.contains(`playerX`))
            continue;
        availabeMoves.push(y);
    }
    if (shared.validateDiagonalLines(currentPlayer) || shared.validateResultColumns(currentPlayer) || shared.validateResultRows(currentPlayer))
    {
        return currentPlayer == 'X' ?  1 * color : -1 * color;
    }   
    if (availabeMoves.length == 0)
        return 0;
    let bestScore = -Infinity;
    for (let tile of availabeMoves)
    {
        board[tile].innerText = currentPlayer;
        board[tile].classList.add(`player${currentPlayer}`);
        bestScore = Math.max(bestScore, -negamax(board, depth + 1, -beta, -alpha, swapPlayer(currentPlayer), -color));
        board[tile].innerText = '';
        board[tile].classList.remove(`player${currentPlayer}`);
        alpha = Math.max(alpha, beta);
        if (alpha >= beta)
            break;
    }
    return bestScore;
}

const swapPlayer = (currentPlayer) => {
    return (currentPlayer === 'X') ? 'O' : 'X';
}
