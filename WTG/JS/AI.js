class AI{
    constructor(board,AIType,depth,alphabetaPrunning)
    {
        this.board = board,            this.bestMove = {}, this.bestScore = -Infinity;
        this.maximizingPlayer = null,   this.AI = AIType,   this.depth = parseInt(depth, 10);
        this.alphaBetaPrunning = alphabetaPrunning;
        
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

        let array = this.board.getAvailabeSpots(), rootDrawnNode;
        
        this.bestScore = -Infinity, this.alpha = -Infinity, this.beta = Infinity;
        
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

            case (this.matrix.isGameActive && this.AI == "Minimax"):
                this.maximizingPlayer = this.matrix.getSide();
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
               
                break;
            case (this.matrix.isGameActive && this.AI == "NegaMax"):
                this.maximizingPlayer = this.matrix.getSide();
                rootDrawnNode = {
                    text: { name: "Start X"},
                    children: []
                }
               
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "MCS"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "MCST"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "PNS"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "DQL"):
                break;
        }

        if (document.querySelector('#TreeDrawing').value== "true" && this.AI != "Random") {
            new Treant(this.chartConfig);
        }
    }

    minimax() {
       
    }


    negamax(depth,parentDrawnNode, alpha, beta)
    {
        let array = this.matrix.getAvailabeSpots();
        this.matrix.setSide();
        let heuristic = this.matrix.validate();
        this.matrix.setSide();
        if (this.matrix.getWinner() != null) {
            if(document.querySelector('#side').value=="O"){
                if( this.maximizingPlayer=="X"){
                    return -(heuristic + depth)
                }else{
                    return (heuristic + depth)
                }
            }else{
                if( this.maximizingPlayer=="O"){
                    return -(heuristic + depth)
                }else{
                    return (heuristic + depth)
                }
            }
            
        }
        if (depth == 0) {
            if(document.querySelector('#side').value=="O"){
                if( this.maximizingPlayer=="X"){
                    return -(heuristic)
                }else{
                    return (heuristic)
                }
            }else{
                if( this.maximizingPlayer=="O"){
                    return -(heuristic)
                }else{
                    return (heuristic)
                }
            }
        }
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
                let score = -(this.negamax(depth - 1, childDrawnNode, -(beta), -(alpha)));
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.Xbits[indices.x][indices.y] = 0;
                this.matrix.getMatrix()[indices.x][indices.y].setValue();
                this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                this.matrix.setSide();
                if (score > bestScore) {bestScore = score;}
                console.log(this.alpha, " alpha" )
                console.log(this.beta, " beta")
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
                let score = -(this.negamax(depth - 1, childDrawnNode, -(beta), -(alpha)));
                childDrawnNode.text.name = score;
                parentDrawnNode.children.push(childDrawnNode);
                this.matrix.Obits[indices.x][indices.y] = 0;
                this.matrix.getMatrix()[indices.x][indices.y].setValue();
                this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                this.matrix.setSide();
                if (score > bestScore){ bestScore = score;}
                console.log(this.alpha, " alpha" )
                console.log(this.beta, " beta")
                if (this.alphaBetaPrunning == 'true') {alpha = Math.max(alpha, score);}
                if (( alpha >= beta ) && this.alphaBetaPrunning == 'true'){ break;}
            }
            return bestScore;
        }

    }

    MCST()
    {

    }

    PNS()
    {

    }

    
}