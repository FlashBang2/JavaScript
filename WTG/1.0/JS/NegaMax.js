const negamax = (board, depth, alpha, beta, currentPlayer, color) =>{
    let availabeMoves = [];
    /*
    if (depth == 0) {
        window["node_" + depth] = {
            parent: shared.node,
            text: { name: ` node_ ${depth} ` }
        };
    } else {
        window["node_" + depth]= {
            parent: window["node_" + (depth-1)],
            text: { name: ` node_ ${depth} ` }
        };
    }
    shared.chartConfig.push( window["node_" + depth]);*/
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
    let score = validateNega();
    if (score != null)
        return score * color;
    if (availabeMoves.length == 0)
        return 0;
    let bestScore = -Infinity;
    for (let tile of availabeMoves)
    {
        board[tile.x][tile.y].DOM.innerText = currentPlayer;
        board[tile.x][tile.y].DOM.classList.add(`player${currentPlayer}`);
        currentPlayer == 'X' ? shared.bitwiseBoardX[tile.x][tile.y] = 1: shared.bitwiseBoardO[tile.x][tile.y] = 1;
        bestScore = Math.max(bestScore, -negamax(board, depth + 1, -beta, -alpha, swapPlayer(currentPlayer), -color));
        board[tile.x][tile.y].DOM.innerText = '';
        board[tile.x][tile.y].DOM.classList.remove(`player${currentPlayer}`);
        currentPlayer == 'X' ? shared.bitwiseBoardX[tile.x][tile.y] = 0: shared.bitwiseBoardO[tile.x][tile.y] = 0;
        alpha = Math.max(alpha, beta);
        if (alpha >= beta)
            break;
    }
    return bestScore;
}

const swapPlayer = (currentPlayer) => {
    return (currentPlayer === 'X') ? 'O' : 'X';
}

const validateNega = () =>{
    
}