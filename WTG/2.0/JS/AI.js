class AI{
    constructor(board,AIType,depth,alphabetaPrunning)
    {
        this.matrix = board;
        this.bestMove = {};
        this.maximizingPlayer = null;
        this.AI = AIType;
        this.depth = parseInt(depth, 10);
        this.alphaBetaPrunning = alphabetaPrunning;

        this.chartConfig = {
            chart: {
                container: "#tree-simple",
                connectors:{
                    type:"bCurve",
                    style: {stroke: 'white'}
                },
                nodeStructure: null,

            }
        }
    }

    move()
    {
        this.bestScore = -Infinity;
        this.alpha = -Infinity; 
        this.beta = Infinity;
        let rootDrawnNode, score;
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
                
                rootDrawnNode = {
                    text: { name: "Start X" },
                    children: []
                }
                score = this.minimax(this.depth, rootDrawnNode ,this.matrix.availabeMoves);
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].value = this.matrix.getSide();
                this.matrix.winner = this.matrix.validate();
                this.matrix.getWinner() !== null ? this.matrix.announceWinner() : this.matrix.gamesContinues();
                this.matrix.blockPlayerInteraction = false;
                this.matrix.availabeMoves.splice(this.matrix.availabeMoves.indexOf(this.matrix.availabeMoves.find((a) => {return a.x === this.bestMove.x && a.y === this.bestMove.y})),1);
                rootDrawnNode.text.name = score;
                this.chartConfig.nodeStructure = rootDrawnNode;
                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "NegaMax"):
                rootDrawnNode = {
                    text: { name: "Start X" },
                    children: []
                }
                score = this.negamax(this.depth, rootDrawnNode, this.matrix.availabeMoves);
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.winner = this.matrix.validate();
                this.matrix.getWinner() !== null ? this.matrix.announceWinner() : this.matrix.gamesContinues();
                this.matrix.blockPlayerInteraction = false;
                this.matrix.availabeMoves.splice(this.matrix.availabeMoves.indexOf(this.matrix.availabeMoves.find((a) => {return a.x === this.bestMove.x && a.y === this.bestMove.y})), 1);
                rootDrawnNode.text.name = score;
                this.chartConfig.nodeStructure = rootDrawnNode;
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
        new Treant(this.chartConfig);
    }

    minimax(depth,  parentDrawnNode, ...currentAvailable)
    {
        for (let i = 0; i <= 5-depth; i++)
        {
            currentAvailable = currentAvailable.flat();
        }
        let childAvailable = JSON.parse(JSON.stringify(currentAvailable));
        this.matrix.setSide();
        if (this.matrix.validate() != null) { this.matrix.setSide(); return this.matrix.validate() == this.maximizingPlayer ? 1 + depth : -(1 + depth)};
        this.matrix.setSide();
        if (depth == 0 || currentAvailable.length == 0) return 0;
        if (this.matrix.getSide() == this.maximizingPlayer)
        {
            let bestScore = -Infinity;
            for (let element of currentAvailable)
            {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: "MAX " + this.maximizingPlayer + " " + element.x + "," + element.y},
                    children: []
                }
                let x = element.x;
                let y = element.y;
                this.matrix.getMatrix()[x][y].value = this.matrix.getSide();
                this.matrix.setSide();
                let index = childAvailable.findIndex(object => {return object.x == x && object.y == y});
                childAvailable.splice(index,1)
                let score = this.minimax(depth - 1, childDrawnNode, childAvailable);
                childDrawnNode.text.name=score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.getMatrix()[x][y].value = '';
                this.matrix.setSide();
                childAvailable.splice(index,0,{x,y});
                if (score > bestScore)
                {
                    if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y};};
                    bestScore = score;
                }
                if (this.alphaBetaPrunning == true) this.alpha = Math.max(this.alpha, score);
                if (this.beta <= this.alpha && this.alphaBetaPrunning == true) break;
            }
            return bestScore;
        }
        else
        {
            let bestScore = Infinity;
            for (let element of currentAvailable)
            {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: "MAX " + this.maximizingPlayer + " " + element.x + "," + element.y},
                    children: []
                }
                let x = element.x;
                let y = element.y;
                this.matrix.getMatrix()[x][y].value = this.matrix.getSide();
                this.matrix.setSide();
                let index = childAvailable.findIndex(object => {return object.x == x && object.y == y});
                childAvailable.splice(index,1);
                let score = this.minimax(depth - 1, childDrawnNode, childAvailable);
                childDrawnNode.text.name=score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.getMatrix()[x][y].value = '';
                this.matrix.setSide();
                childAvailable.splice(index, 0, {x,y});
                if (score < bestScore)
                {
                    if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y}};
                    bestScore = score;
                }
                if (this.alphaBetaPrunning == true) this.beta = Math.min(this.beta, score);
                if (this.beta <= this.alpha && this.alphaBetaPrunning == true) break;
            }
            return bestScore;
        }
    }

    negamax(depth, parentDrawnNode , ...currentAvailable)
    {
        for (let i = 0; i <= 5 - depth; i++)
        {
            currentAvailable = currentAvailable.flat();
        }
        let childAvailable = JSON.parse(JSON.stringify(currentAvailable));
        this.matrix.setSide();
        if (this.matrix.validate() != null) {this.matrix.setSide(); return -(1 + depth)};
        this.matrix.setSide();
        if (depth == 0 || currentAvailable.length == 0) return 0;
        let bestScore = -Infinity;
        for (let element of currentAvailable)
        {
            let childDrawnNode = {
                parent: parentDrawnNode,
                text: { name: "NEGA " + " " + element.x + "," + element.y},
                children: []
            }
            let x = element.x;
            let y = element.y;
            this.matrix.getMatrix()[x][y].value = this.matrix.getSide();
            this.matrix.setSide();
            let index = childAvailable.findIndex(object => {return object.x == x && object.y == y});
            childAvailable.splice(index,1);
            let score = -(this.negamax(depth - 1, childDrawnNode, childAvailable));
            childDrawnNode.text.name = score;
            parentDrawnNode.children.push(childDrawnNode);
            this.matrix.getMatrix()[x][y].value = '';
            this.matrix.setSide();
            childAvailable.splice(index, 0, {x,y});
            if (score > bestScore)
            {
                if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y}};
                bestScore = score;
            }
            if (this.alphaBetaPrunning == true) this.alpha = Math.max(score, this.alpha);
            if (this.alphaBetaPrunning == true && this.alpha >= this.beta) break;
        }
        return bestScore;
    }

    PNS()
    {

    }

    MCS()
    {

    }

    MCST()
    {

    }

    DQL()
    {
        
    }
}