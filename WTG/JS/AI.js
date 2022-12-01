class AI{
    constructor(board,AIType,time,alphabetaPrunning)
    {
        this.board = board,            this.bestMove = {}, this.bestScore = -Infinity;
        this.maximizingPlayer = null,   this.AI = AIType,   this.time = parseInt(time,10);
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
                this.minimax(array, this.time, rootDrawnNode, -Infinity, Infinity);
               
                break;
            case (this.matrix.isGameActive && this.AI == "NegaMax"):
                this.maximizingPlayer = this.board.side;
                rootDrawnNode = {
                    text: { name: "Start"},
                    children: []
                }
                this.negamax(array, this.time, rootDrawnNode, -Infinity, Infinity);
               
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

        if (document.querySelector('#TreeDrawing').value== "true" && this.AI != "Random") {
            new Treant(this.chartConfig);
        }
    }

    minimax(array, time, parentDrawnNode, alpha, beta) {
        let childBoards = [];
        for (let move of array) {
            this.board.matrix[move.x][move.y].setValue(this.board.side);
            childBoards.push(JSON.parse(JSON.stringify(this.board)));
            this.board.matrix[move.x][move.y].value = 0;
        }
        
    }


    negamax(time, parentDrawnNode, alpha, beta)
    {
        
    }

    MCST()
    {

    }

    PNS()
    {

    }

    
}