class AI{
    constructor(board,AIType,depth,alphabetaPrunning)
    {
        this.matrix = board;
        this.bestMove = {};
        this.bestScore = -Infinity;
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
                this.maximizingPlayer = this.side;
                this.max(this.depth);
                this.matrix.availabeMoves.splice(this.matrix.availabeMoves.indexOf(this.matrix.availabeMoves.find((a) => {return a.x === this.bestMove.x && a.y === this.bestMove.y})),1);
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].value = this.matrix.getSide();
                this.matrix.winner = this.matrix.validate();
                this.matrix.getWinner() !== null ? this.matrix.announceWinner() : this.matrix.gamesContinues();
                this.matrix.blockPlayerInteraction = false;
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

    max(depth)
    {
        if (this.matrix.validate() != null) return this.maximizingPlayer == this.matrix.getSide() ? 1 + this.depth : -(1 + this.depth);
        if (this.matrix.availabeMoves.length == 0 || depth == 0) return 0;
        for (let element of this.matrix.availabeMoves)
        {
            if (depth == this.depth) {let x = element.x; let y = element.y; this.bestMove = {x,y}};
            this.matrix.getMatrix()[element.x][element.y].value = this.matrix.getSide();
            this.side == 'O' ? this.side = 'X' : this.side = 'O';
            let score = this.mini(depth - 1);
            this.matrix.getMatrix()[element.x][element.y].value = '';
            this.side == 'O' ? this.side = 'X' : this.side = 'O';
            if (score > this.bestScore) {this.bestScore = score; let x = element.x; let y = element.y; this.bestMove = {x,y}}
        }
    }

    mini(depth)
    {
        console.log(this.matrix.validate());
        if (this.matrix.validate() != null) this.maximizingPlayer == this.matrix.getSide() ? 1 + this.depth : -(1 + this.depth);
        if (this.matrix.availabeMoves.length == 0 || depth == 0) return 0;
        for (let element of this.matrix.availabeMoves)
        {
            if (depth == this.depth) {let x = element.x; let y = element.y; this.bestMove = {x,y}};
            this.matrix.getMatrix()[element.x][element.y].value = this.matrix.getSide();
            this.side == 'O' ? this.side = 'X' : this.side = 'O';
            let score = this.max(depth - 1);
            this.matrix.getMatrix()[element.x][element.y].value = '';
            this.side == 'O' ? this.side = 'X' : this.side = 'O';
            if (score > this.bestScore) {this.bestScore = score; let x = element.x; let y = element.y; this.bestMove = {x,y}}
        }
    }

    negamax()
    {
       
    }

    PNS()
    {

    }
}