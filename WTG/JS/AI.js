class AI{
    constructor(board,AIType,moveTime,alphabetaPrunning)
    {
        this.board = board, this.bestMove = {},             this.maximizingPlayer = null,   
        this.AI = AIType,   this.moveTime = parseInt(moveTime,10);  this.alphaBetaPrunning = alphabetaPrunning,
        this.depth = 5;
        
        this.chartConfig = {
            chart: {
                container: "#tree-simple",
                connectors: {
                    type:"bCurve",
                    style: {stroke: 'white'}
                }
            },
            nodeStructure: null,
        }

    }

    move() {

        let array = this.board.getAvailabeSpots(), rootDrawnNode, bestScore = null;
        
        switch (true) {

            case (this.board.isGameActive && this.AI == "Random"):

                let posibleIndices = [];

                for (let x = 0;x < this.board.matrix.length;x++){
                    for (let y = 0;y < this.board.matrix.length;y++){
                        if (this.board.matrix[x][y].value == 0) posibleIndices.push({x:x,y:y})
                    }
                }

                let indices = posibleIndices[Math.floor(Math.random() * posibleIndices.length)]

                this.board.matrix[indices.x][indices.y].DOM.innerText = this.board.side;
                this.board.matrix[indices.x][indices.y].DOM.classList.add(`player${this.board.side}`);
                this.board.matrix[indices.x][indices.y].setValue(this.board.side);
                this.board.validate();
                this.board.gameStateCheck();

                break;

            case (this.board.isGameActive && this.AI == "Minimax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                   
                }
                bestScore = this.minimax(this.depth, rootDrawnNode, -Infinity, Infinity);

                break;
            case (this.matrix.isGameActive && this.AI == "NegaMax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                bestScore = this.negamax(this.depth, rootDrawnNode, -Infinity, Infinity);
               
                break;
            case (array.length > 0 && this.board.isGameActive && this.AI == "MCS"):
                break;
            case (array.length > 0 && this.board.isGameActive && this.AI == "MCST"):
                break;
            case (array.length > 0 && this.board.isGameActive && this.AI == "PNS"):
                break;
            case (array.length > 0 && this.board.isGameActive && this.AI == "DQL"):
                break;
        }

        if (this.AI == "Random") return;
        this.board.matrix[this.bestMove.x][this.bestMove.y].DOM.innerText = this.board.side;
        this.board.matrix[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.board.side}`);
        this.board.matrix[this.bestMove.x][this.bestMove.y].setValue(this.board.side);
        this.board.validate();
        rootDrawnNode.text.name = bestScore;
        this.chartConfig.nodeStructure = rootDrawnNode;
        this.board.gameStateCheck();

        if (document.querySelector('#TreeDrawing').value== "true") new Treant(this.chartConfig);
    }

    minimax(depth, parentDrawnNode, alpha, beta) {
        let movePool = this.board.getAvailabeSpots();
        this.board.setSide();
        let winner = this.board.validate();
        this.board.setSide();
        if (winner != null) return this.board.side == this.maximizingPlayer ? this.board.validate(1) : this.board.validate(-1);
        if (depth == 0) return this.board.side == this.maximizingPlayer ? this.board.validate(1) : this.board.validate(-1);
        if (movePool.length == 0) return 0;
        if (this.maximizingPlayer == this.board.side) {
            let bestScore = -Infinity;
            for (let move of movePool) {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: {name: "MAX " + move.x + " " + move.y + " " + this.board.side + " " + depth},
                    children: []
                }
                this.board.matrix[move.x][move.y].setValue(this.board.side);
                this.board.setSide();
                let score = this.minimax (depth - 1, childDrawnNode, alpha, beta);
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.board.setSide();
                this.board.matrix[move.x][move.y].value = 0;
                if (score > bestScore) {
                    bestScore = score;
                    if (this.depth == depth) this.bestMove = {x:move.x, y:move.y};
                }
            }
            return bestScore;
        }
        else {
            let bestScore = Infinity;
            for (let move of movePool) {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: {name: "MIN " + move.x + " " + move.y + " " + this.board.side + " " + + depth},
                    children: []
                }
                this.board.matrix[move.x][move.y].setValue(this.board.side);
                this.board.setSide(); 
                let score = this.minimax (depth - 1, childDrawnNode, alpha, beta);
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.board.setSide();
                this.board.matrix[move.x][move.y].value = 0;
                if (score < bestScore) {
                    bestScore = score;
                }
            }
            return bestScore
        }
    }


    negamax(depth, parentDrawnNode, alpha, beta) {
        
    }

    MCS() {

    }

    MCST() {

    }

    PNS() {

    }

    
}