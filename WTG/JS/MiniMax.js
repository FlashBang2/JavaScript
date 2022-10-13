const minimax = (board, depth, alpha, beta, isMaximizing, currentPlayer) =>{
    let availabeMoves = [];
    /*if (depth == 0) {
        window["node_" + depth] = {
            parent: shared.node,
            text: { name: `${board[0].innerText}|${board[1].innerText}|${board[2].innerText}
            ${board[3].innerText}|${board[4].innerText}|${board[5].innerText}
            ${board[6].innerText}|${board[7].innerText}|${board[8].innerText}` }
        };
    } else {
        window["node_" + depth]= {
            parent: window["node_" + (depth-1)],
            text: { name: `${board[0].innerText}|${board[1].innerText}|${board[2].innerText}
            ${board[3].innerText}|${board[4].innerText}|${board[5].innerText}
            ${board[6].innerText}|${board[7].innerText}|${board[8].innerText}` }
        };
    }
    shared.chartConfig.push( window["node_" + depth]);
    */
    for (let y = 0;y < board.length;y++)
    {
        if (board[y].classList.contains(`playerO`) || board[y].classList.contains(`playerX`))
            continue;
        availabeMoves.push(y);
    }
    let terminalNode = validateMinimax(board);
    if (terminalNode != null)
        return terminalNode;
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
            alpha = Math.max(alpha, bestScore);
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
            beta = Math.min(beta, bestScore);
            if (beta <= alpha)
                break;
        }
        return bestScore;
    }
}
const validateMinimax = (board) =>{
    if (board[0].classList.contains(`playerO`) && board[1].classList.contains(`playerO`) && board[2].classList.contains(`playerO`))
        return -1;
    if (board[3].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[5].classList.contains(`playerO`))
        return -1;
    if (board[6].classList.contains(`playerO`) && board[7].classList.contains(`playerO`) && board[8].classList.contains(`playerO`))
        return -1;
    if (board[0].classList.contains(`playerO`) && board[3].classList.contains(`playerO`) && board[6].classList.contains(`playerO`))
        return -1;
    if (board[1].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[7].classList.contains(`playerO`))
        return -1;
    if (board[2].classList.contains(`playerO`) && board[5].classList.contains(`playerO`) && board[8].classList.contains(`playerO`))
        return -1;
    if (board[0].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[8].classList.contains(`playerO`))
        return -1;
    if (board[6].classList.contains(`playerO`) && board[4].classList.contains(`playerO`) && board[2].classList.contains(`playerO`))
        return -1;
    if (board[0].classList.contains(`playerX`) && board[1].classList.contains(`playerX`) && board[2].classList.contains(`playerO`))
        return -1;
    if (board[3].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[5].classList.contains(`playerX`))
        return 1;
    if (board[6].classList.contains(`playerX`) && board[7].classList.contains(`playerX`) && board[8].classList.contains(`playerX`))
        return 1;
    if (board[0].classList.contains(`playerX`) && board[3].classList.contains(`playerX`) && board[6].classList.contains(`playerX`))
        return 1;
    if (board[1].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[7].classList.contains(`playerX`))
        return 1;
    if (board[2].classList.contains(`playerX`) && board[5].classList.contains(`playerX`) && board[8].classList.contains(`playerX`))
        return 1;
    if (board[0].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[8].classList.contains(`playerX`))
        return 1;
    if (board[6].classList.contains(`playerX`) && board[4].classList.contains(`playerX`) && board[2].classList.contains(`playerX`))
        return 1;
    return null
}