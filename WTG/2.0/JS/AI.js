class AI{
    constructor(board)
    {
        this.matrix = board;
        this.bestMove;
        this.bestScore = -Infinity;
        this.maximizingPlayer = null;
        this.AI = document.querySelector("#AIType").value;
    }

    move()
    {
        let array = this.matrix.getAvailabeSpots();
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
                        let score = this.minimax(document.querySelector("#Depth").value);
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
                        let score = this.minimax(document.querySelector("#Depth").value);
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
                }
                break;
        }
    }

    minimax(depth)
    {
        let array = this.matrix.getAvailabeSpots();
        this.matrix.validate();
        if (this.matrix.getWinner() != null)
            return this.matrix.getWinner() == this.maximizingPlayer ? 1 : -1;
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