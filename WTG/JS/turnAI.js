const turnAI = (board, currentPlayer) =>{
    let availabeMoves = [];
    let bestScore = -Infinity;
    let move = -Infinity;
    let score;
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
            if (shared.AIType.value == "negaMax")
            {
                score = -negamax(board, 0, Infinity, -Infinity, 'O', -1);
            }
            else if (shared.AIType.value == "RandomAI")
            {
                RandomAI();
            }
            else if (shared.AIType.value == "miniMax")
            {
                score = minimax(board, 0, -Infinity, Infinity, false, 'O');
                
            }
            else if (shared.AIType.value =="PNS")
            {
                PNS();
            }
            else if (shared.AIType.value == "MCS")
            {
                MCS();
            }
            else if (shared.AIType.value == "deepQLearning")
            {
                deepQLearning();
            }
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