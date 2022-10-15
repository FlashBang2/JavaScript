const turnAI = (board, currentPlayer) =>{
    let availabeMoves = [];
    let bestScore = -Infinity;
    let move = -Infinity;
    let score = 0;
    /*shared.chartConfig.splice(0, shared.chartConfig.length);
    shared.chartConfig.push(shared.config);
    shared.node = {
        text: { name: "start" }
    };
    shared.chartConfig.push( shared.node);
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
    if (availabeMoves.length > 0)
    { 
        for (let tile of availabeMoves)
        {
            board[tile.x][tile.y].DOM.innerText = currentPlayer;
            board[tile.x][tile.y].DOM.classList.add(`player${currentPlayer}`);
            if (shared.AIType.value == "negaMax")
            {
                score = -negamax(board, 0, Infinity, -Infinity, 'O', -1);
            }
            else if (shared.AIType.value == "miniMax")
            {
                score = minimax(board, 1, -Infinity, Infinity, false, 'O');
                
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
            board[tile.x][tile.y].DOM.innerText = '';
            board[tile.x][tile.y].DOM.classList.remove(`player${currentPlayer}`);
            if (score > bestScore)
            {
                bestScore = score;
                let x = tile.x;
                let y = tile.y;
                move = {x,y};
            }
        }
        /*var my_chart = new Treant(shared.chartConfig);*/
        if (shared.AIType.value == "RandomAI")
            move = availabeMoves[Math.floor(Math.random() * availabeMoves.length)];
        board[move.x][move.y].DOM.innerText = currentPlayer;
        board[move.x][move.y].DOM.classList.add(`player${currentPlayer}`);
    }
    shared.handleResultValidation();
    shared.changePlayer();
}