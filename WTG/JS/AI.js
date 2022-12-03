class AI{
    constructor(board,AIType,moveTime,alphabetaPrunning) {
        this.board = board,                         this.bestMove = {},                     this.maximizingPlayer = null;   
        this.ai = AIType,                           this.moveTime = parseInt(moveTime,10),  this.alphaBetaPrunning = alphabetaPrunning;
        this.startTime = null,                      this.depth = null;
        
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

    move () {

        let array = this.board.getAvailabeSpots(), rootDrawnNode, bestScore = null;
        this.depth = 1;
        
        switch (true) {

            case (this.board.isGameActive && this.ai == "Random"):

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

            case (this.board.isGameActive && this.ai == "Minimax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                   
                }
                this.startTime = new Date().getTime();
                while (new Date().getTime() < this.startTime + this.moveTime) {
                    bestScore = this.minimax(this.depth, rootDrawnNode, -Infinity, Infinity);
                    console.log(this.bestMove.x, this.bestMove.y);
                    this.depth++;
                }
                console.log(this.depth);
                break;
            case (this.board.isGameActive && this.ai == "NegaMax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                this.startTime = new Date().getTime();
                while (new Date().getTime() < this.startTime + this.moveTime) {
                    bestScore = this.negamax(this.depth, rootDrawnNode, -Infinity, Infinity);
                    console.log(this.bestMove.x, this.bestMove.y);
                    this.depth++;
                }
                console.log(this.depth);
                break;
            case (array.length > 0 && this.board.isGameActive && this.ai == "MCS"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                this.bestMove = this.MCS(parseInt(this.moveTime)*10, rootDrawnNode);
                bestScore=this.bestMove;
                break;
            case (array.length > 0 && this.board.isGameActive && this.ai == "MCST"):
                break;
            case (array.length > 0 && this.board.isGameActive && this.ai == "PNS"):
                break;
            case (array.length > 0 && this.board.isGameActive && this.ai == "DQL"):
                break;
        }
        if (this.AI == "Random" || !this.board.isGameActive) return;
    
        this.board.matrix[this.bestMove.x][this.bestMove.y].DOM.innerText = this.board.side;
        this.board.matrix[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.board.side}`);
        this.board.matrix[this.bestMove.x][this.bestMove.y].setValue(this.board.side);
        this.board.validate();
        rootDrawnNode.text.name = bestScore;
        this.chartConfig.nodeStructure = rootDrawnNode;
        this.board.gameStateCheck(this.board.winner);
        if (document.querySelector('#TreeDrawing').value == "true") new Treant(this.chartConfig);
    }

    minimax (depth, parentDrawnNode, alpha, beta) {
        if (new Date().getTime() > this.startTime + this.moveTime) return 0;
        let movePool = this.board.getAvailabeSpots();
        this.board.setSide();
        let heuristic = this.board.side == this.maximizingPlayer ? this.board.validate(1) : this.board.validate(-1);
        this.board.setSide();
        if (this.board.winner != null) return heuristic;
        if (depth == 0) return heuristic;
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
                this.board.matrix[move.x][move.y].value = 0;
                this.board.setSide();
                if (score > bestScore) {
                    bestScore = score;
                    if (this.depth == depth) this.bestMove = {x:move.x, y:move.y};
                }
                if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}
            }
            return bestScore;
        }
        else {
            let bestScore = Infinity;
            for (let move of movePool) {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: {name: "MIN " + move.x + " " + move.y + " " + this.board.side + " " + depth},
                    children: []
                }
                this.board.matrix[move.x][move.y].setValue(this.board.side);
                this.board.setSide(); 
                let score = this.minimax (depth - 1, childDrawnNode, alpha, beta);
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.board.matrix[move.x][move.y].value = 0;
                this.board.setSide();
                if (score < bestScore) {
                    bestScore = score;
                }
                if (this.alphaBetaPrunning == 'true') {beta = Math.min(beta, score);}
                if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { break;}
            }
            return bestScore
        }
    }


    negamax (depth, parentDrawnNode, alpha, beta) {
        if (new Date().getTime() > this.startTime + this.moveTime) return 0;
        let movePool = this.board.getAvailabeSpots();
        this.board.setSide();
        let heuristic = this.maximizingPlayer == this.board.side ? this.board.validate(1) : this.board.validate(-1);
        this.board.setSide();
        if (this.board.winner != null) return heuristic;
        if (depth == 0) return heuristic;
        if (movePool.length == 0) return 0;
        let bestScore = -Infinity;
        for (let move of movePool) {
            if (new Date().getTime() > this.startTime + this.moveTime) break;
            let childDrawnNode = {
                parent: parentDrawnNode,
                text: {name: "NEG " + move.x + " " + move.y + this.board.side + " " + depth},
                children: []
            }
            this.board.matrix[move.x][move.y].setValue(this.board.side);
            this.board.setSide();
            let score = -this.negamax(depth - 1, childDrawnNode, -beta, -alpha);
            childDrawnNode.text.name = score;
            parentDrawnNode.children.push(childDrawnNode);
            this.board.matrix[move.x][move.y].value = 0;
            this.board.setSide();
            if (score > bestScore) {
                bestScore = score;
                if (this.depth == depth) this.bestMove = {x:move.x, y:move.y};
            }
            if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
            if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { break;}
        }
        return bestScore;
    }

    MCS (nofSimulations, parentDrawnNode)
    {
        let bestChild = null;
        let bestProbability = -1;
        let movePool = this.board.getAvailabeSpots();
        let boardState = this.board.getValueMatrix();
        let side = this.board.side;
        for(let move of movePool){
            let childDrawnNode = {
                parent: parentDrawnNode,
                text: {name: "MAX " + move.x + " " + move.y + " " + this.board.side},
                children: []
            }
            let r = 0;
            for (let i = 1; i <= nofSimulations; i++) {
                let indices1 ={
                    x: move.x,
                    y: move.y};
                while (this.board.matrix[indices1.x][indices1.y].value == 0) {
                    if (this.board.side == 'X') {
                        this.board.matrix[indices1.x][indices1.y].value =1; 
                        let childDrawnNode2 = {
                            parent: childDrawnNode,
                            text: {name: "MAX " + move.x + " " + move.y + " " + this.board.side},
                            children: []
                        }
                        childDrawnNode.children.push(childDrawnNode2);
                        this.board.setSide();
                        indices1.x=this.board.getRandomInt(3);
                        indices1.y=this.board.getRandomInt(3);
                        this.board.validate(1)
                    } else {
                        this.board.matrix[indices1.x][indices1.y].value =-1;
                        let childDrawnNode2 = {
                            parent: childDrawnNode,
                            text: {name: "MAX " + move.x + " " + move.y + " " + this.board.side},
                            children: []
                        }
                        childDrawnNode.children.push(childDrawnNode2);
                        this.board.setSide();
                        indices1.x=this.board.getRandomInt(3);
                        indices1.y=this.board.getRandomInt(3);
                        this.board.validate(-1)
                    }
                }
                this.board.side = side;
                if (this.board.winner == this.board.side) {
                    r++
                }

                this.board.setValueMatrix(boardState);
                
            }
            let probability = r/nofSimulations;
            
            if (probability>bestProbability) {
                bestChild=move;
                bestProbability=probability;
               
            }
            parentDrawnNode.children.push(childDrawnNode);
        }
       
       return bestChild;
        
    }

    MCST () {

    }

    PNS () {

    }

    
}