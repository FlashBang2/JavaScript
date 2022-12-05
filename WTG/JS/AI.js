class AI{
    constructor(board,AIType,moveTime,alphabetaPrunning) {
        this.board = board,                         this.bestMove = {},                     this.maximizingPlayer = null;   
        this.aiType = AIType,                       this.moveTime = moveTime,               this.alphaBetaPrunning = alphabetaPrunning;
        this.startTime = null,                      this.depth = null,                      this.tempBoard = null;                
        
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
        let rootDrawnNode,          bestScore = null,               numberOfSimulations = 1;
        
        this.depth = 1,             this.previousBestMove = {};

        switch (true) {

            case (this.board.isGameActive && this.aiType.value == "Random"):

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

            case (this.board.isGameActive && this.aiType.value == "Minimax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                   
                }
                this.startTime = new Date().getTime();
                //bestScore = this.minimax(this.depth, rootDrawnNode, -Infinity, Infinity);
                //console.log(this.bestMove, bestScore);
                //this.previousBestMove = {x:this.bestMove.x,y:this.bestMove.y};
                while (new Date().getTime() < this.startTime + parseInt(this.moveTime.value, 10) && this.depth < this.board.boardSize**2) {
                    //console.log(this.depth);
                    bestScore = this.minimax(this.depth, rootDrawnNode, -Infinity, Infinity);
                    if (new Date().getTime() < this.startTime + parseInt(this.moveTime.value, 10)) this.previousBestMove = {x:this.bestMove.x,y:this.bestMove.y};
                    //console.log(this.bestMove.x, this.bestMove.y, bestScore);
                    this.depth++;
                    
                }
                console.log(this.depth);
                break;
            case (this.board.isGameActive && this.aiType.value == "Negamax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                this.startTime = new Date().getTime();
                //bestScore = this.negamax(this.depth, rootDrawnNode, -Infinity, Infinity);
                //console.log(this.bestMove, bestScore);
                //this.previousBestMove = {x:this.bestMove.x,y:this.bestMove.y};
                while (new Date().getTime() < this.startTime + parseInt(this.moveTime.value, 10) && this.depth < this.board.boardSize**2) {
                    //console.log(this.depth);
                    this.tempBoard = null;
                    bestScore = this.negamax(this.depth, rootDrawnNode, -Infinity, Infinity);
                    //console.log(this.bestMove.x, this.bestMove.y, bestScore);
                    if (new Date().getTime() < this.startTime + parseInt(this.moveTime.value, 10)) this.previousBestMove = {x:this.bestMove.x,y:this.bestMove.y};
                    this.depth++;
                }
                console.log(this.depth);
                break;
            case (this.board.isGameActive && this.aiType.value == "MonteCarloSearch"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                while (new Date().getTime() < this.startTime + parseInt(this.moveTime.value, 10)) {
                    this.previousBestMove = this.MCS(numberOfSimulations,rootDrawnNode);
                    numberOfSimulations++;
                }
                break;
            case (this.board.isGameActive && this.aiType.value == "MonteCarloSearchTree"):
                break;
            case (this.board.isGameActive && this.aiType.value == "ProofNumberSearch"):
                break;
            case (this.board.isGameActive && this.aiType.value == "DeepQLearning"):
                break;
        }
        if (this.aiType.value == "Random" || !this.board.isGameActive) return;
        this.board.matrix[this.previousBestMove.x][this.previousBestMove.y].DOM.innerText = this.board.side;
        this.board.currentPosition = this.board.currentPosition ^ this.board.zobristKeys[this.previousBestMove.x][this.previousBestMove.y][this.board.side == 'X' ? 1 : 0];
        this.board.matrix[this.previousBestMove.x][this.previousBestMove.y].DOM.classList.add(`player${this.board.side}`);
        this.board.matrix[this.previousBestMove.x][this.previousBestMove.y].setValue(this.board.side);
        this.board.validate();
        rootDrawnNode.text.name = bestScore;
        this.chartConfig.nodeStructure = rootDrawnNode;
        this.board.gameStateCheck(this.board.winner);
        if (document.querySelector('#TreeDrawing').value == "true") new Treant(this.chartConfig);
    }

    minimax (depth, parentDrawnNode, alpha, beta) {
        if (new Date().getTime() > this.startTime + parseInt(this.moveTime.value, 10)) return 0;
        let movePool = this.board.getAvailabeSpots();
        this.board.setSide();
        let heuristic = this.board.side == this.maximizingPlayer ? (this.board.validate() + depth) : -(this.board.validate() + depth);
        this.board.setSide();
        if (this.board.winner != null || depth == 0) return heuristic;
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
                if (this.tempBoard == null) this.tempBoard = this.board.currentPosition ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
                else this.tempBoard = this.tempBoard ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
                this.board.setSide();
                let score = this.minimax (depth - 1, childDrawnNode, alpha, beta);
                
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.board.matrix[move.x][move.y].value = 0;
                this.board.setSide();
                this.tempBoard = this.tempBoard ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
                if (score > bestScore) {
                    bestScore = score;
                    if (this.depth == depth) this.bestMove = {x:move.x, y:move.y};
                }
                if (this.alphaBetaPrunning.value == 'true') {alpha = Math.max(alpha, score);}
                if (( alpha >= beta ) && this.alphaBetaPrunning.value == 'true'){ break;}
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
                if (this.tempBoard == null) this.tempBoard = this.board.currentPosition ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
                else this.tempBoard = this.tempBoard ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
                this.board.setSide(); 
                let score = this.minimax (depth - 1, childDrawnNode, alpha, beta);

                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.board.matrix[move.x][move.y].value = 0;
                this.board.setSide();
                this.tempBoard = this.tempBoard ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
                if (score < bestScore) {
                    bestScore = score;
                }
                if (this.alphaBetaPrunning.value == 'true') {beta = Math.min(beta, score);}
                if (( alpha >= beta ) && this.alphaBetaPrunning.value == 'true') { break;}
            }
            return bestScore
        }
    }

    negamax (depth, parentDrawnNode, alpha, beta, sign = 1) {
        if (new Date().getTime() > this.startTime + parseInt(this.moveTime.value, 10)) return 0;
        let movePool = this.board.getAvailabeSpots();
        this.board.setSide();
        let heuristic = null;
        if (this["board" + this.tempBoard] != undefined) {
            this.board.winner = this["board" + this.tempBoard].winner;
            heuristic = this.board.side == this.maximizingPlayer ? (this["board" + this.tempBoard].score + depth) * sign : -(this["board" + this.tempBoard].score + depth) * sign;
        } 
        else {
            heuristic = this.board.side == this.maximizingPlayer ? (this.board.validate() + depth) * sign : -(this.board.validate() + depth) * sign;
        }
        this.board.setSide();
        if (this.board.winner != null || depth == 0) return heuristic;
        if (movePool.length == 0) return 0;
        let bestScore = -Infinity;
        for (let move of movePool) {
            let childDrawnNode = {
                parent: parentDrawnNode,
                text: {name: "NEG " + move.x + " " + move.y + this.board.side + " " + depth},
                children: []
            }
            this.board.matrix[move.x][move.y].setValue(this.board.side);
            if (this.tempBoard == null) this.tempBoard = this.board.currentPosition ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
            else this.tempBoard = this.tempBoard ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
            this.board.setSide();
            let score = -this.negamax(depth - 1, childDrawnNode, -beta, -alpha, -sign);
            this["board" + this.tempBoard] = {hash:this.tempBoard, score:score, moveX:move.x, moveY:move.y, side:this.board.side, winner:this.board.winner};
            childDrawnNode.text.name = score;
            parentDrawnNode.children.push(childDrawnNode);
            this.board.matrix[move.x][move.y].value = 0;
            this.board.setSide();
            this.tempBoard = this.tempBoard ^ this.board.zobristKeys[move.x][move.y][this.board.side == 'X' ? 1 : 0];
            if (score > bestScore) {
                bestScore = score;
                if (this.depth == depth) this.bestMove = {x:move.x, y:move.y};
            }
            if (this.alphaBetaPrunning.value == 'true') {alpha = Math.max(alpha, score);}
            if (( alpha >= beta ) && this.alphaBetaPrunning.value == 'true') { break;}
        }
        return bestScore;
    }

    MCS (numberOfSimulations, parentDrawnNode)
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
                let indices1 = {
                    x: move.x,
                    y: move.y, 
                }
                while (this.board.matrix[indices1.x][indices1.y].value == 0) {
                    if (this.board.side == 'X') {
                        this.board.matrix[indices1.x][indices1.y].value = 1; 
                        let childDrawnNode2 = {
                            parent: childDrawnNode,
                            text: {name: "MAX " + move.x + " " + move.y + " " + this.board.side},
                            children: []
                        }
                        childDrawnNode.children.push(childDrawnNode2);
                        this.board.setSide();
                        indices1.x = this.board.getRandomInt(3);
                        indices1.y = this.board.getRandomInt(3);
                        this.board.validate()
                    } else {
                        this.board.matrix[indices1.x][indices1.y].value =-1;
                        let childDrawnNode2 = {
                            parent: childDrawnNode,
                            text: {name: "MAX " + move.x + " " + move.y + " " + this.board.side},
                            children: []
                        }
                        childDrawnNode.children.push(childDrawnNode2);
                        this.board.setSide();
                        indices1.x = this.board.getRandomInt(3);
                        indices1.y = this.board.getRandomInt(3);
                        this.board.validate()
                    }
                }
                this.board.side = side;
                if (this.board.winner == this.board.side) {
                    r++
                }

                this.board.setValueMatrix(boardState);
                
            }
            let probability = r/nofSimulations;
            
            if (probability > bestProbability) {
                bestChild = move;
                bestProbability = probability;
               
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