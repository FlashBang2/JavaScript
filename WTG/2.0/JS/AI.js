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
                this.matrix.getSide() == 'X' ?
                this.matrix.getMatrix()[indices.x][indices.y].value = 'X' :
                this.matrix.getMatrix()[indices.x][indices.y].value = 'O'; 
                this.matrix.validate();
                this.matrix.getWinner() !== null ? this.matrix.announceWinner() : this.matrix.gamesContinues();
                this.matrix.blockPlayerInteraction = false;
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "Minimax"):

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

    minimax()
    {
       
    }

    negamax()
    {
       
    }

    PNS()
    {

    }
}