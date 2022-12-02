class AI{
    constructor(board,AIType,time,alphabetaPrunning)
    {
        this.board = board, this.bestMove = {},             this.maximizingPlayer = null,   
        this.AI = AIType,   this.time = parseInt(time,10);  this.alphaBetaPrunning = alphabetaPrunning,
        this.depth = 2;
        
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
                this.minimax(this.depth, rootDrawnNode, -Infinity, Infinity);

                break;
            case (this.matrix.isGameActive && this.AI == "NegaMax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                this.negamax(this.depth, rootDrawnNode, -Infinity, Infinity);
               
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
        rootDrawnNode.text.name = this.board.value;
        this.chartConfig.nodeStructure = rootDrawnNode;
        this.board.gameStateCheck();

        if (document.querySelector('#TreeDrawing').value== "true") new Treant(this.chartConfig);
    }

    minimax(depth, parentDrawnNode, alpha, beta) {
        let array = this.board.getAvailabeSpots(), childBoards = [];
        if (array.length == 0) return 0;
        for (let element of array) {
            this.board.matrix[element.x][element.y].setValue(this.board.side);
            this.board.move = {x:element.x,y:element.y};
            this.board.validate();
            console.log(this.board.value);
            childBoards.push(JSON.parse(JSON.stringify(this.board)));
            this.board.matrix[element.x][element.y].value = 0;
        }
        childBoards.sort((a,b) => a.value - b.value);
        if (this.maximizingPlayer == this.board.side) {
            let bestScore = -Infinity;
            for (let child of childBoards) {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: child.value},
                    children: []
                }
                parentDrawnNode.children.push(childDrawnNode);
                if (child.value > bestScore) {
                    bestScore = child.value;
                    this.bestMove = {x:child.move.x,y:child.move.y}; 
                }
            }
        }
        else {
            let bestScore = Infinity;
            for (let child of childBoards) {
                let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: child.value},
                    children: []
                }
                parentDrawnNode.children.push(childDrawnNode);
                bestScore = Math.min(bestScore, child.value);
                if (child.value < bestScore) {
                    bestScore = child.value;
                    this.bestMove = {x:child.move.x,y:child.move.y}; 
                }
            }
        }
    }


    negamax(array, depth, parentDrawnNode, alpha, beta) {
        
    }

    MCS() {

    }

    MCST() {

    }

    PNS() {

    }

    
}