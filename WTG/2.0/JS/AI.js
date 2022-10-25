class AI{
    constructor(board,AIType,depth,alphabetaPrunning)
    {
        this.matrix = board;
        this.bestMove = {};
        this.bestScore = -Infinity;
        this.maximizingPlayer = null;
        this.AI = AIType;
        this.depth = depth;
        this.alphaBetaPrunning = alphabetaPrunning;
        this.alpha = -Infinity;
        this.beta = Infinity;
    }

    move()
    {
        let array = this.matrix.getAvailabeSpots();
        this.bestScore = -Infinity;
        this.alpha = -Infinity;
        this.beta = Infinity;
        switch (true)
        {
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "Random"):
                let indices = array[Math.floor(Math.random() * array.length)];
                this.matrix.getMatrix()[indices.x][indices.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[indices.x][indices.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getSide() == 'X' ? this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1: this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                this.matrix.validate();
                if (this.matrix.getWinner() != null)
                {
                    this.matrix.isGameActive = false;
                    this.matrix.getWinner() == 'X' ? document.querySelector("#display").innerHTML = "Player <span class='playerX'>X</span> Won" : document.querySelector("#display").innerHTML = "Player <span class='playerO'>O</span> Won";
                }
                else
                {
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    document.querySelector("#display-player").classList.remove(`player${this.matrix.getSide()}`);
                    this.matrix.setSide();
                    document.querySelector("#display-player").classList.add(`player${this.matrix.getSide()}`);
                    document.querySelector("#display-player").innerText = this.matrix.getSide();
                    this.matrix.setBlockPlayerInteraction();
                }
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "Minimax"):
                this.maximizingPlayer = this.matrix.getSide();
                for (let indices of array)
                {
                    if (this.maximizingPlayer == 'X')
                    {
                        this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        let score = this.minimax(this.depth);
                        this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        if (score > this.bestScore)
                        {
                            this.bestScore = score;
                            let x = indices.x;
                            let y = indices.y;
                            this.bestMove = {x, y};
                        }
                    }
                    else
                    {
                        this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        let score = this.minimax(this.depth);
                        this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        if (score > this.bestScore)
                        {
                            this.bestScore = score;
                            let x = indices.x;
                            let y = indices.y;
                            this.bestMove = {x, y};
                        }
                    }
                }
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getSide() == 'X' ? this.matrix.Xbits[ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getRow()][ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getColumn()] = 1: this.matrix.Obits[ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getRow()][ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getColumn()] = 1;
                this.matrix.validate();
                if (this.matrix.getWinner() != null)
                {
                    this.matrix.isGameActive = false;
                    this.matrix.getWinner() == 'X' ? document.querySelector("#display").innerHTML = "Player <span class='playerX'>X</span> Won" : document.querySelector("#display").innerHTML = "Player <span class='playerO'>O</span> Won";
                }
                else
                {
                    this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setValue();
                    this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setOccupied();
                    document.querySelector("#display-player").classList.remove(`player${this.matrix.getSide()}`);
                    this.matrix.setSide();
                    document.querySelector("#display-player").classList.add(`player${this.matrix.getSide()}`);
                    document.querySelector("#display-player").innerText = this.matrix.getSide();
                    this.matrix.setBlockPlayerInteraction();
                }
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "NegaMax"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "PNS"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "MCS"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "MCST"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "DQL"):
                break;
        }
    }

    minimax(depth)
    {
        let array = this.matrix.getAvailabeSpots();
        this.matrix.validate();
        if (this.matrix.getWinner() != null)
            return this.matrix.getWinner() == this.maximizingPlayer ? 1 + depth: -(1 + depth);
        if (array.length == 0 || depth == 0)
            return 0;
        if (this.matrix.getSide() == this.maximizingPlayer)
        {
            let bestScore = -Infinity
            for (let indices of array)
            {
                if (this.maximizingPlayer == 'X')
                {
                    this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        if (bestScore >= this.beta)
                           break;
                        this.alpha = Math.max(this.alpha, bestScore); 
                    }
                }
                else
                {
                    this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        if (bestScore >= this.beta)
                            break;
                        this.alpha = Math.max(this.alpha, bestScore); 
                    }
                }
                
            }
            return bestScore;
        }
        else
        {
            let bestScore = Infinity
            for (let indices of array)
            {
                if (this.maximizingPlayer != 'O')
                {
                    this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        if (bestScore <= this.alpha)
                            break;
                        this.beta = Math.min(this.beta, bestScore); 
                    }
                }
                else
                {
                    this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        if (bestScore <= this.alpha)
                            break;
                        this.beta = Math.min(this.beta, bestScore); 
                    }
                }
            }
            return bestScore;
        }
    }

    negamax(depth)
    {

    }

    PNS()
    {

    }
}