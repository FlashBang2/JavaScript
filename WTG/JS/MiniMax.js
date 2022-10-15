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
    for (let row of board)
    {
        for (let element of row)
        {
            if (element.DOM.classList.contains(`playerO`) || element.DOM.classList.contains(`playerX`))
            continue;
            let x = element.row;
            let y = element.column;
            availabeMoves.push({x,y});
        }   
    }
    let terminalNode = validateMinimax(board);
    if (terminalNode != null)
        return terminalNode;
    if (depth == 0 || availabeMoves.length == 0)
        return 0;
    if (isMaximizing)
    {
        let bestScore = -Infinity;
        for (let tile of availabeMoves)
        {
            board[tile.x][tile.y].DOM.innerText = currentPlayer;
            board[tile.x][tile.y].DOM.classList.add(`player${currentPlayer}`);
            let score = minimax(board, depth - 1, alpha, beta, false, 'O');
            board[tile.x][tile.y].DOM.innerText = '';
            board[tile.x][tile.y].DOM.classList.remove(`player${currentPlayer}`);
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
            board[tile.x][tile.y].DOM.innerText = currentPlayer;
            board[tile.x][tile.y].DOM.classList.add(`player${currentPlayer}`);
            let score = minimax(board, depth - 1, alpha, beta, true, 'X');
            board[tile.x][tile.y].DOM.innerText = '';
            board[tile.x][tile.y].DOM.classList.remove(`player${currentPlayer}`);
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha)
                break;
        }
        return bestScore;
    }
}
const validateMinimax = (board) =>{
    let boardO = new Array(Math.pow(shared.currentBoardSize,2)).fill(0);
    boardO = shared.to2D(boardO, shared.currentBoardSize);
    let boardX=JSON.parse(JSON.stringify(boardO));
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[1].length; j++) {
            if (board[i][j].DOM.innerText == "O") {
                boardO[i][j]=1;
                boardX[i][j]=0;
            } else if (board[i][j].DOM.innerText == "X") {
                boardO[i][j]=0;
                boardX[i][j]=1; 
            }
            
        }
    }
    
    if (shared.validateResultRows(boardO) || shared.validateResultColumns(boardO) || shared.validateDiagonalLines(boardO))
    {
        return -1;
    }
    if (shared.validateResultRows(boardX) || shared.validateResultColumns(boardX) || shared.validateDiagonalLines(boardX))
    {
        return 1;
    }


    /*/if (board[0].classList.contains(`playerO`) && board[1].classList.contains(`playerO`) && board[2].classList.contains(`playerO`))
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
        return 1;*/
    return null
}