class AI{
    constructor(board,AIType,depth,alphabetaPrunning)
    {
        this.matrix = board;
        this.bestMove = {};
        this.maximizingPlayer = null;
        this.AI = AIType;
        this.depth = parseInt(depth, 10);
        this.alphaBetaPrunning = alphabetaPrunning;
    }

    move()
    {
        this.bestScore = -Infinity;
        switch (true)
        {
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "Random"):
                let indices = this.matrix.availabeMoves[Math.floor(Math.random() * this.matrix.availabeMoves.length)];
                this.matrix.availabeMoves.splice(this.matrix.availabeMoves.indexOf(indices), 1);
                this.matrix.getMatrix()[indices.x][indices.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[indices.x][indices.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getMatrix()[indices.x][indices.y].value = this.matrix.getSide();
                this.matrix.winner = this.matrix.validate();
                this.matrix.getWinner() !== null ? this.matrix.announceWinner() : this.matrix.gamesContinues();
                this.matrix.blockPlayerInteraction = false;
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "Minimax"):
                this.maximizingPlayer = this.matrix.getSide();
                this.minimax(this.depth,this.matrix.availabeMoves);
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].value = this.matrix.getSide();
                this.matrix.winner = this.matrix.validate();
                this.matrix.getWinner() !== null ? this.matrix.announceWinner() : this.matrix.gamesContinues();
                this.matrix.blockPlayerInteraction = false;
                this.matrix.availabeMoves.splice(this.matrix.availabeMoves.indexOf(this.matrix.availabeMoves.find((a) => {return a.x === this.bestMove.x && a.y === this.bestMove.y})),1);
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "NegaMax"):
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "PNS"):
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "MCS"):
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "MCST"):
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "DQL"):
                break;
        }
    }

    minimax(depth,...currentAvailable)
    {
        let childAvailable = JSON.parse(JSON.stringify(currentAvailable));
        if (this.matrix.validate() != null) {return this.matrix.validate() == this.maximizingPlayer ? 1 + depth : -(1 + depth)};
        if (depth == 0 || currentAvailable.length == 0) return 0;
        currentAvailable = currentAvailable.flat(2);
        if (this.matrix.getSide() == this.maximizingPlayer)
        {
            let bestScore = -Infinity;
            for (let element of currentAvailable)
            {
                let x = element.x;
                let y = element.y;
                this.matrix.getMatrix()[x][y].value = this.matrix.getSide();
                this.matrix.setSide();
                let score = this.minimax(depth - 1, childAvailable.splice(this.matrix.availabeMoves.findIndex(object => {return object.x == x && object.y == y}),1));
                this.matrix.getMatrix()[x][y].value = '';
                this.matrix.setSide();
                if (score > bestScore)
                {
                    if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y};};
                    bestScore = score;
                }
            }
            return bestScore;
        }
        else
        {
            let bestScore = Infinity;
            for (let element of currentAvailable)
            {
                let x = element.x;
                let y = element.y;
                this.matrix.getMatrix()[x][y].value = this.matrix.getSide();
                this.matrix.setSide();
                let score = this.minimax(depth - 1, childAvailable.splice(this.matrix.availabeMoves.findIndex(object => {return object.x == x && object.y == y}),1));
                this.matrix.getMatrix()[x][y].value = '';
                this.matrix.setSide();
                if (score > bestScore)
                {
                    if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y}};
                    bestScore = score;
                }
            }
            return bestScore;
        }
    }

    negamax()
    {
       
    }

    PNS()
    {

    }
}