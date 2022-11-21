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

                }
            },
            nodeStructure: null,
        }


    }

    move()
    {


        let array = this.matrix.getAvailabeSpots();
        let rootDrawnNode;
        this.bestScore = -Infinity;
        this.alpha = -Infinity;
        this.beta = Infinity;

        switch (true)
        {
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "Random"):
                let indices = this.matrix.availabeMoves[Math.floor(Math.random() * this.matrix.availabeMoves.length)];
                this.matrix.availabeMoves.splice(this.matrix.availabeMoves.indexOf(indices), 1);
                this.matrix.getMatrix()[indices.x][indices.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[indices.x][indices.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getSide() == 'X' ? this.matrix.Xbits[indices.x][indices.y] = 1: this.matrix.Obits[indices.x][indices.y] = 1;
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
                    if (this.matrix.getAvailabeSpots().length == 0)
                        {
                            this.matrix.isGameActive = false;
                            display.innerHTML = "TIE";
                        }
                }

                break;
            case (this.matrix.availabeMoves.length > 0 && !this.matrix.isGameStoped && this.AI == "Minimax"):
                this.maximizingPlayer = this.matrix.getSide();
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                for (let [index,indices] of array.entries())
                {
                    if (this.matrix.getMatrix()[indices.x][indices.y].getValue() == 1) continue;
                    if (this.maximizingPlayer == 'X')
                    {
                        let childDrawnNode = {
                            parent: rootDrawnNode,
                            text: { name: "MAX " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                            children: []
                        }
                        this.matrix.Xbits[indices.x][indices.y] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        let score = this.minimax(this.depth, childDrawnNode, this.alpha, this.beta);
                        childDrawnNode.text.name = score;
                        rootDrawnNode.children.push(childDrawnNode);
                        this.matrix.Xbits[indices.x][indices.y] = 0;
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
                        if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                        if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}

                    }
                    else
                    {
                        let childDrawnNode = {
                            parent: rootDrawnNode,
                            text: { name: "MAX " + 'O' + " " + indices.x + "," + indices.y},
                            children: []
                        }
                        this.matrix.Obits[indices.x][indices.y] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        let score = this.minimax(this.depth, childDrawnNode, this.alpha, this.beta);
                        childDrawnNode.text.name = score;
                        rootDrawnNode.children.push(childDrawnNode);
                        this.matrix.Obits[indices.x][indices.y] = 0;
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
                        if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                        if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}
                    }
                }
                rootDrawnNode.text.name = this.bestScore;
                this.chartConfig.nodeStructure = rootDrawnNode;
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getSide() == 'X' ? this.matrix.Xbits[this.bestMove.x][this.bestMove.y] = 1: this.matrix.Obits[this.bestMove.x][this.bestMove.y] = 1;
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setValue();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setOccupied();
                this.matrix.validate();
                if (this.matrix.getWinner() != null)
                {
                    this.matrix.isGameActive = false;
                    this.matrix.getWinner() == 'X' ? document.querySelector("#display").innerHTML = "Player <span class='playerX'>X</span> Won" : document.querySelector("#display").innerHTML = "Player <span class='playerO'>O</span> Won";
                }
                else
                {
                    document.querySelector("#display-player").classList.remove(`player${this.matrix.getSide()}`);
                    this.matrix.setSide();
                    document.querySelector("#display-player").classList.add(`player${this.matrix.getSide()}`);
                    document.querySelector("#display-player").innerText = this.matrix.getSide();
                    this.matrix.setBlockPlayerInteraction();
                    if (this.matrix.getAvailabeSpots().length == 0)
                        {
                            this.matrix.isGameActive = false;
                            display.innerHTML = "TIE";
                        }
                }
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "NegaMax"):
                this.maximizingPlayer = this.matrix.getSide();
                rootDrawnNode = {
                    text: { name: "Start X"},
                    children: []
                }
                for (let [index,indices] of array.entries())
                {
                    if (this.matrix.getMatrix()[indices.x][indices.y].getValue() == 1) continue;
                    if (this.matrix.getSide() == 'X')
                    {
                        let childDrawnNode = {
                            parent: rootDrawnNode,
                            text: { name: "MAX " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                            children: []
                        }
                        this.matrix.Xbits[indices.x][indices.y] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        let score = -(this.negamax(this.depth, childDrawnNode, this.alpha, this.beta));
                        childDrawnNode.text.name = score;
                        rootDrawnNode.children.push(childDrawnNode);
                        this.matrix.Xbits[indices.x][indices.y] = 0;
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
                        if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                        if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { break;}
                    }
                    else
                    {
                        let childDrawnNode = {
                            parent: rootDrawnNode,
                            text: { name: "MAX " + 'O' + " " + indices.x + "," + indices.y},
                            children: []
                        }
                        this.matrix.Obits[indices.x][indices.y] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        let score = -(this.negamax(this.depth, childDrawnNode, this.alpha, this.beta));
                        childDrawnNode.text.name = score;
                        rootDrawnNode.children.push(childDrawnNode);
                        this.matrix.Obits[indices.x][indices.y] = 0;
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
                        if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                        if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { break;}
                    }
                }
                rootDrawnNode.text.name = this.bestScore;
                this.chartConfig.nodeStructure = rootDrawnNode;
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getSide() == 'X' ? this.matrix.Xbits[this.bestMove.x][this.bestMove.y] = 1: this.matrix.Obits[this.bestMove.x][this.bestMove.y] = 1;
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setValue();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setOccupied();
                this.matrix.validate();
                if (this.matrix.getWinner() != null)
                {
                    this.matrix.isGameActive = false;
                    this.matrix.getWinner() == 'X' ? document.querySelector("#display").innerHTML = "Player <span class='playerX'>X</span> Won" : document.querySelector("#display").innerHTML = "Player <span class='playerO'>O</span> Won";
                }
                else
                {
                    document.querySelector("#display-player").classList.remove(`player${this.matrix.getSide()}`);
                    this.matrix.setSide();
                    document.querySelector("#display-player").classList.add(`player${this.matrix.getSide()}`);
                    document.querySelector("#display-player").innerText = this.matrix.getSide();
                    this.matrix.setBlockPlayerInteraction();
                    if (this.matrix.getAvailabeSpots().length == 0)
                        {
                            this.matrix.isGameActive = false;
                            display.innerHTML = "TIE";
                        }
                }

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
        if (document.querySelector('#TreeDrawing').value== "true" && this.AI != "Random") {
            new Treant(this.chartConfig);
        }
    }

    minimax(depth, parentDrawnNode, alpha, beta)
    {
        let array = this.matrix.getAvailabeSpots();
        this.matrix.setSide()
        let heuristic = this.matrix.validate()
        this.matrix.setSide()
        if (this.matrix.getWinner() != null) {return this.matrix.getWinner() == this.maximizingPlayer ? heuristic + depth : -(heuristic + depth); }
        if (depth == 0) {return this.matrix.getWinner() == this.maximizingPlayer ? heuristic : -(heuristic)}
        if (array.length == 0) return 0;

        if (this.matrix.getSide() == this.maximizingPlayer)
        {
            let bestScore = -Infinity;
            for (let element of currentAvailable)
            {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: "MAX " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                    children: []
                }
                if (this.maximizingPlayer == 'X')
                {
                    this.matrix.Xbits[indices.x][indices.y] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, childDrawnNode, alpha, beta);
                    childDrawnNode.text.name = score;
                    parentDrawnNode.children.push(childDrawnNode);
                    this.matrix.Xbits[indices.x][indices.y] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (score > bestScore)
                    {
                        if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y};};
                        bestScore = score;
                    }
                    if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                    if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}

                }
                let x = element.x;
                let y = element.y;
                this.matrix.getMatrix()[x][y].value = this.matrix.getSide();
                this.matrix.setSide();
                let index = childAvailable.findIndex(object => {return object.x == x && object.y == y});
                childAvailable.splice(index,1)
                let score = this.minimax(depth - 1, childDrawnNode, alpha, beta, childAvailable);
                childDrawnNode.text.name=score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.getMatrix()[x][y].value = '';
                this.matrix.setSide();
                childAvailable.splice(index,0,{x,y});
                if (score > bestScore)
                {
                    this.matrix.Obits[indices.x][indices.y] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, childDrawnNode, alpha, beta);
                    childDrawnNode.text.name = score;
                    parentDrawnNode.children.push(childDrawnNode);
                    this.matrix.Obits[indices.x][indices.y] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (score > bestScore)
                    {
                        if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y};};
                        bestScore = score;
                    }
                    if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                    if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}
                }
                if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}
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
                    text: { name: "MIN " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                    children: []
                }
                if (this.maximizingPlayer != 'O')
                {
                    this.matrix.Obits[indices.x][indices.y] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, childDrawnNode, alpha, beta);
                    childDrawnNode.text.name = score;
                    parentDrawnNode.children.push(childDrawnNode);
                    this.matrix.Obits[indices.x][indices.y] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (score < bestScore)
                    {
                        if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y}};
                        bestScore = score;
                    }
                    if (this.alphaBetaPrunning == 'true') {beta = Math.min(beta, score);}
                    if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { break;}
                }
                let x = element.x;
                let y = element.y;
                this.matrix.getMatrix()[x][y].value = this.matrix.getSide();
                this.matrix.setSide();
                let index = childAvailable.findIndex(object => {return object.x == x && object.y == y});
                childAvailable.splice(index,1);
                let score = this.minimax(depth - 1, childDrawnNode, alpha, beta, childAvailable);
                childDrawnNode.text.name=score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.getMatrix()[x][y].value = '';
                this.matrix.setSide();
                childAvailable.splice(index, 0, {x,y});
                if (score < bestScore)
                {
                    this.matrix.Xbits[indices.x][indices.y] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, childDrawnNode, alpha, beta);
                    childDrawnNode.text.name = score;
                    parentDrawnNode.children.push(childDrawnNode);
                    this.matrix.Xbits[indices.x][indices.y] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (score < bestScore)
                    {
                        if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y}};
                        bestScore = score;
                    }
                    if (this.alphaBetaPrunning == 'true') {beta = Math.min(beta, score);}
                    if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { break;}
                }
                
                if (this.alphaBetaPrunning == 'true') {beta = Math.min(beta, score);}
                
                if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { 
                    break;}
            }
            return bestScore;
        }
    }
/*
    cutMoves(indices)
    {
        //Corners

        if (indices.x == 0 && indices.y == 0)
        {
            if ((this.matrix.Xbits[indices.x + 1][indices.y + 1] == '' || this.matrix.Obits[indices.x + 1][indices.y + 1]) == '' && 
                (this.matrix.Xbits[indices.x][indices.y + 1] == '' || this.matrix.Obits[indices.x][indices.y + 1] == '') && 
                (this.matrix.Xbits[indices.x + 1][indices.y] == '' || this.matrix.Obits[indices.x +1][indices.y] == '')) return true; 
        }
        if (indices.x == this.matrix.boardSize && indices.y == this.matrix.boardSize)
        {
            if ((this.matrix.Xbits[this.matrix.boardSize - 1][this.matrix.boardSize - 1] == '' || this.matrix.Obits[this.matrix.boardSize - 1][this.matrix.boardSize - 1] == '') &&
                (this.matrix.Xbits[this.matrix.boardSize - 1][this.matrix.boardSize] == '' || this.matrix.Obits[this.matrix.boardSize -1][this.matrix.boardSize] == '') &&
                (this.matrix.Xbits[this.matrix.boardSize][this.matrix.boardSize - 1] == '' || this.matrix.Obits[this.matrix.boardSize][this.matrix.boardSize - 1] == '')) return true;
        }
        if (indices.x == this.matrix.boardSize && indices.y == 0)
        {
            if ((this.matrix.Xbits[this.matrix.boardSize - 1][indices.y + 1] == '' || this.matrix.Obits[this.matrix.boardSize - 1][indices.y + 1] == '') &&
                (this.matrix.Xbits[this.matrix.boardSize - 1][indices.y] == '' || this.matrix.Obits[this.matrix.boardSize - 1][indices.y] == '') &&
                (this.matrix.Xbits[this.matrix.boardSize][indices.y + 1] == '' || this.matrix.Obits[this.matrix.boardSize][indices.y + 1] == '')) return true;
        }
        if (indices.x == 0 && indices.y == this.matrix.boardSize)
        {
            if ((this.matrix.Xbits[indices.x + 1][this.matrix.boardSize - 1] == '' || this.matrix.Obits[indices.x + 1][this.matrix.boardSize - 1] == '') &&
                (this.matrix.Xbits[indices.x + 1][this.matrix.boardSize] == '' || this.matrix.Obits[indices.x + 1][this.matrix.boardSize] == '') &&
                (this.matrix.Xbits[indices.x][this.matrix.boardSize - 1] == '' || this.matrix.Obits[indices.x][this.matrix.boardSize -1] == '')) return true;
        }

        //Borders

        if(indices.x == 0 && indices.y > 0 && indices.y < this.matrix.boardSize)
        {
            if ((this.matrix.Xbits[indices.x][indices.y - 1] == '' || this.matrix.Obits[indices.x][indices.y - 1] == '') &&
                (this.matrix.Xbits[indices.x + 1][indices.y - 1] == '' || this.matrix.Obits[indices.x + 1][indices.y - 1] == '') &&
                (this.matrix.Xbits[indices.x + 1][indices.y] == '' || this.matrix.Obits[indices.x + 1][indices.y] == '') &&
                (this.matrix.Xbits[indices.x + 1][indices.y + 1] == '' || this.matrix.Obits[indices.x + 1][indices.y + 1] == '') &&
                (this.matrix.Xbits[indices.x][indices.y + 1] == '' || this.matrix.Obits[indices.x][indices.y + 1] == '')) return true;
        }
        if (indices.x > 0 && indices.x < this.matrix.boardSize - 1 && indices.y == 0)
        {
            if ((this.matrix.Xbits[indices.x][indices.y + 1] == '' || this.matrix.Obits[indices.x][indices.y + 1] == '') &&
                (this.matrix.Xbits[indices.x + 1][indices.y + 1] == '' || this.matrix.Obits[indices.x + 1][indices.y + 1] == '') &&
                (this.matrix.Xbits[indices.x - 1][indices.y + 1] == '' || this.matrix.Obits[indices.x - 1][indices.y + 1] == '') &&
                (this.matrix.Xbits[indices.x + 1][indices.y] == '' || this.matrix.Obits[indices.x + 1][indices.y] == '') &&
                (this.matrix.Xbits[indices.x - 1][indices.y] == '' || this.matrix.Obits[indices.x - 1][indices.y] == '')) return true;
        }
        if (indices.y == this.matrix.boardSize && indices.x > 0 && indices.x < this.matrix.boardSize)
        {
            if ((this.matrix.Xbits[indices.x][indices.y - 1] == '' || this.matrix.Obits[indices.x][indices.y - 1] == '') &&
                (this.matrix.Xbits[indices.x + 1][indices.y - 1] == '' || this.matrix.Obits[indices.x + 1][indices.y - 1] == '') &&
                (this.matrix.Xbits[indices.x - 1][indices.y - 1] == '' || this.matrix.Obits[indices.x - 1][indices.y - 1] == '') &&
                (this.matrix.Xbits[indices.x + 1][indices.y] == '' || this.matrix.Obits[indices.x + 1][indices.y] == '') &&
                (this.matrix.Xbits[indices.x - 1][indices.y] == '' || this.matrix.Obits[indices.x - 1][indices.y] == '')) return true; 
        }
        if (indices.x == this.matrix.boardSize && indices.y > 0 && indices.y < this.matrix.boardSize)
        {
            if ((this.matrix.Xbits[indices.x - 1][indices.y] == '' || this.matrix.Obits[indices.x - 1][indices.y] == '') &&
                (this.matrix.Xbits[indices.x - 1][indices.y + 1] == '' || this.matrix.Obits[indices.x - 1][indices.y + 1] == '') &&
                (this.matrix.Xbits[indices.x - 1][indices.y - 1] == '' || this.matrix.Obits[indices.x - 1][indices.y - 1] == '') &&
                (this.matrix.Xbits[indices.x][indices.y - 1] == '' || this.matrix.Obits[indices.x][indices.y - 1] == '') &&
                (this.matrix.Xbits[indices.x][indices.y - 1] == '' || this.matrix.Obits[indices.x][indices.y - 1] == '')) return true;
        }

        //Inside

        if (indices.x > 0 && indices.x < this.matrix.boardSize - 1 && indices.y > 0 && indices.y < this.matrix.boardSize - 1)
        {
            if  ((this.matrix.Xbits[indices.x - 1][indices.y - 1] == '' || this.matrix.Obits[indices.x - 1][indices.y -1] == '') &&
                 (this.matrix.Xbits[indices.x - 1][indices.y + 1] == '' || this.matrix.Obits[indices.x - 1][indices.y + 1] == '') &&
                 (this.matrix.Xbits[indices.x - 1][indices.y] == '' || this.matrix.Obits[indices.x - 1][indices.y] == '') &&
                 (this.matrix.Xbits[indices.x][indices.y + 1] == '' || this.matrix.Obits[indices.x][ indices.y + 1] == '') &&
                 (this.matrix.Xbits[indices.x][indices.y - 1] == '' || this.matrix.Obits[indices.x][indices.y - 1] == '') &&
                 (this.matrix.Xbits[indices.x + 1][indices.y] == '' || this.matrix.Obits[indices.x + 1][indices.y] == '') &&
                 (this.matrix.Xbits[indices.x + 1][indices.y + 1] == '' || this.matrix.Obits[indices.x + 1][ indices.y + 1] == '') &&
                 (this.matrix.Xbits[indices.x + 1][indices.y - 1] == '' || this.matrix.Obits[indices.x + 1][indices.y - 1] == '')) return true;
        }

        return false;
    }*/

    negamax(depth,parentDrawnNode, alpha, beta)
    {
        let array = this.matrix.getAvailabeSpots();
        this.matrix.setSide();
        let heuristic = this.matrix.validate();
        this.matrix.setSide();
        if (this.matrix.getWinner() != null) {return -(heuristic + depth)}
        if (depth == 0) { return -(heuristic)}
        if (array.length == 0) return 0;
        if (this.matrix.getSide() == 'X')
        {
            let bestScore = -Infinity
            for (let [index,indices] of array.entries())
            {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: "NEGA " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                    children: []
                }
                this.matrix.Xbits[indices.x][indices.y] = 1;
                this.matrix.getMatrix()[indices.x][indices.y].setValue();
                this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                this.matrix.setSide();
                let score = -(this.negamax(depth - 1, childDrawnNode, -(alpha), -(beta)));
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.Xbits[indices.x][indices.y] = 0;
                this.matrix.getMatrix()[indices.x][indices.y].setValue();
                this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                this.matrix.setSide();
                if (score > bestScore)
                    {bestScore = score;}
                    if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                    if (( alpha >= beta ) && this.alphaBetaPrunning == 'true') { break;}
            }
            return bestScore;
        }
        else
        {
            let bestScore = -Infinity
            for (let [index,indices] of array.entries())
            {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: "NEGA " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                    children: []
                }
                this.matrix.Obits[indices.x][indices.y] = 1;
                this.matrix.getMatrix()[indices.x][indices.y].setValue();
                this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                this.matrix.setSide();
                let score = -(this.negamax(depth - 1, childDrawnNode, -(alpha), -(beta)));
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.Obits[indices.x][indices.y] = 0;
                this.matrix.getMatrix()[indices.x][indices.y].setValue();
                this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                this.matrix.setSide();
                if (score > bestScore){ bestScore = score;}
                if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}
            }
            return bestScore;
        }

            if (score > bestScore)
            {
                if (depth == this.depth) {this.bestScore = score; this.bestMove = {x,y};};
                bestScore = score;
            }
            if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
            if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}
            
        }
        return bestScore;
    }

    PNS()
    {

    }
   
}