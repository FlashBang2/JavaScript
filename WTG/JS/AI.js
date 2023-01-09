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
        let rootDrawnNode,          bestScore = null;             
        
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
                    this.tempBoard = null;
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
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                this.maximizingPlayer = this.board.side;
                this.previousBestMove = this.MCS();
                break;
            case (this.board.isGameActive && this.aiType.value == "MonteCarloSearchTree"):
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                this.maximizingPlayer = this.board.side;
                this.previousBestMove = this.MCST(rootDrawnNode);
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
        if (this.aiType.value != "MonteCarloSearchTree") rootDrawnNode.text.name = bestScore;
        this.chartConfig.nodeStructure = rootDrawnNode;
        this.board.gameStateCheck(this.board.winner);
        console.log(this.chartConfig)
        if (document.querySelector('#TreeDrawing').value == "true") new Treant(this.chartConfig);
    }

    minimax (depth, parentDrawnNode, alpha, beta) {
        if (new Date().getTime() > this.startTime + parseInt(this.moveTime.value, 10)) return 0;
        let movePool = this.board.getAvailabeSpots();
        this.board.setSide();
        let heuristic = null;
        if (this["board" + this.tempBoard] != undefined) {
            this.board.winner = this["board" + this.tempBoard].winner;
            heuristic = this["board" + this.tempBoard].score + depth;
        }
        else {
            heuristic = this.board.side == this.maximizingPlayer ? (this.board.validate() + depth) : -(this.board.validate() + depth);
        }    
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
                this["board" + this.tempBoard] = {hash:this.tempBoard, score:score, moveX:move.x, moveY:move.y, side:this.board.side, winner:this.board.winner};
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

    MCS ()
    {
        let bestChild = null;
        let bestProbability = -1;
        let movePool = this.board.getAvailabeSpots();
        let boardState = this.board.getValueMatrix();
        let random = 0;
        let side = this.board.side;
        
        for(let move of movePool){
            let r = 0;
            let numberOfSimulations = 0;
            this.startTime = new Date().getTime();
           
            while ( new Date().getTime() < this.startTime + (parseInt(this.moveTime.value, 10)/movePool.length)){
                this.board.validate();
                numberOfSimulations++;
                let indices1 = {
                    x: move.x,
                    y: move.y, 
                }
                    while ((this.board.getAvailabeSpots().length > 0))  {
                        this.board.matrix[indices1.x][indices1.y].setValue(this.board.side); 
                        let rameiningMoves = this.board.getAvailabeSpots();
                        random = this.board.getRandomInt(rameiningMoves.length);
                        if (rameiningMoves.length > 0) {
                            indices1.x = rameiningMoves[random].x;
                            indices1.y = rameiningMoves[random].y;
                        }
                        this.board.validate();
                        this.board.setSide();
                        if (this.board.winner  != null) {
                            break;
                        }
                    }
                    if (this.maximizingPlayer == this.board.winner) {
                        r++
                    }

                    this.board.setValueMatrix(boardState);
                    this.board.side= side;
                }
                let probability = r/numberOfSimulations;
                if (probability > bestProbability) {
                    bestChild =  {x:move.x, y:move.y};
                    bestProbability = probability;
                
                }
            }
        return bestChild;
    }

    MCST (parentDrawnNode) {
        this.startTime = new Date().getTime();
        this.board.unUsedMoves = this.board.getAvailabeSpots();
        let current = null;
        this.board.children = [];
        while (new Date().getTime() < this.startTime + parseInt(this.moveTime.value, 10)){
            current = this.selection(this.board, parentDrawnNode);
            current = this.explore(current, parentDrawnNode);
            let reward = this.accquireReward(current, parentDrawnNode);
            this.propagate(current, reward);
        }
        console.log(this.board);
        current = this.getBestChild(this.board);
        return current.move;
    }

    selection (current, parentDrawnNode) {
        if (current.unUsedMoves.length > 0) {
            return current;
        }
        else {
            if (current.children.length == 0) {
                return current;
            }
            return this.selection(this.getBestChild(current, parentDrawnNode));
        }
    }

    explore (current, parentDrawnNode) {
        if (current.unUsedMoves.length == 0) return current;
        let move = current.unUsedMoves[Math.floor(Math.random() * current.unUsedMoves.length)];
        let index = current.unUsedMoves.findIndex((obj) => obj.x == move.x && obj.y == move.y);
        current.unUsedMoves.splice(index, 1);
        let childDrawnNode = {
            parent: parentDrawnNode,
            text: {name: "MCST " + move.x + " " + move.y + " " + current.side},
            children: []
        }
        parentDrawnNode.children.push(childDrawnNode);
        let child = _.cloneDeep(current);
        child.matrix[move.x][move.y].setValue(child.side);
        child.move = {x:move.x, y:move.y};
        child.setSide();
        child.parent = current;
        child.unUsedMoves = child.getAvailabeSpots();
        current.children.push(child);
        return child;
    }

    accquireReward (current) {
        let board = _.cloneDeep(current);
        for (let move of board.getAvailabeSpots()) {
            board.matrix[move.x][move.y].setValue(board.side);
            board.validate();
            if (board.winner != null || board.getAvailabeSpots().length == 0) break;
            board.setSide();
        }
        return board.getAvailabeSpots().length == 0 ? 0 : board.winner == this.maximizingPlayer ? 1 : -1;       
    }

    propagate (current, reward) {
        while (current != null) {
            current.visits  += 1;
            current.winrate += reward;
            current = current.parent;
        }
    }

    getBestChild (current, parentDrawnNode) {
        let value = -Infinity;
        let bestChild = null;
        for (let index in current.children) {
            let UCT = current.children[index].winrate / current.children[index].visits + 2 * Math.sqrt(Math.log(current.children[index].parent.visits / current.children[index].visits));
            if (UCT > value) {
                value = UCT;
                bestChild = current.children[index];
            }
            if (parentDrawnNode == undefined) continue;
            parentDrawnNode.children[index].text.name = current.children[index].winrate +"/"+ current.children[index].visits;
        }
        return bestChild;
    }
    
    PNS () {

    }

    
}