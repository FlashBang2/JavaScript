class AI{
    constructor(board,AIType,depth,alphabetaPrunning)
    {
        this.matrix = board;
        this.bestMove = {};
        this.bestScore = -Infinity;
        this.maximizingPlayer = null;
        this.AI = AIType;
        this.depth = depth;
        this.alphaBetaPrunning = alphabetaPrunning;
        
        /*this.chartConfig = {
            chart: {
                container: "#tree-simple",
                connectors:{
                    type:"bCurve",
                    style: {stroke: 'white'}
                },
                nodeStructure: null,

            }
        }*/

    }

    move()
    {

        let array = this.matrix.getAvailabeSpots();
        this.bestScore = -Infinity;
        this.alpha = -Infinity;
        this.beta = Infinity;
        switch (true)
        {
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "Random"):
                let indices = array[Math.floor(Math.random() * array.length)];
                this.matrix.getMatrix()[indices.x][indices.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[indices.x][indices.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getSide() == 'X' ? this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1: this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
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
                }
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "Minimax"):
                this.maximizingPlayer = this.matrix.getSide();
                /*let rootDrawnNode;*/
                for (let [index,indices] of array.entries())
                {
                    if (this.maximizingPlayer == 'X')
                    {
                        this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        /*rootDrawnNode = {
                            text: { name: "Start X"},
                            children: []
                        }*/
                        let score = this.minimax(this.depth);
                        this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
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

                    }
                    else
                    {
                        this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        /*rootDrawnNode = {
                            text: { name: "Start O"},
                            children: []
                        }*/
                        let score = this.minimax(this.depth);
                        this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
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
                    }
                }
                /*rootDrawnNode.text.name=this.bestScore;*/
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.innerText = this.matrix.getSide();
                this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].DOM.classList.add(`player${this.matrix.getSide()}`);
                this.matrix.getSide() == 'X' ? this.matrix.Xbits[ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getRow()][ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getColumn()] = 1: this.matrix.Obits[ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getRow()][ this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].getColumn()] = 1;
                this.matrix.validate();
                if (this.matrix.getWinner() != null)
                {
                    this.matrix.isGameActive = false;
                    this.matrix.getWinner() == 'X' ? document.querySelector("#display").innerHTML = "Player <span class='playerX'>X</span> Won" : document.querySelector("#display").innerHTML = "Player <span class='playerO'>O</span> Won";
                }
                else
                {
                    this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setValue();
                    this.matrix.getMatrix()[this.bestMove.x][this.bestMove.y].setOccupied();
                    document.querySelector("#display-player").classList.remove(`player${this.matrix.getSide()}`);
                    this.matrix.setSide();
                    document.querySelector("#display-player").classList.add(`player${this.matrix.getSide()}`);
                    document.querySelector("#display-player").innerText = this.matrix.getSide();
                    this.matrix.setBlockPlayerInteraction();
                }
                /*this.chartConfig.nodeStructure=rootDrawnNode;*/
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "NegaMax"):
                
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "PNS"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "MCS"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "MCST"):
                break;
            case (array.length > 0 && this.matrix.isGameActive && this.AI == "DQL"):
                break;
        }
        /*new Treant(this.chartConfig);*/
    }

    minimax(depth)
    {
        let array = this.matrix.getAvailabeSpots();
        this.matrix.validate();
        if (this.matrix.getWinner() != null) return this.matrix.getWinner() == this.maximizingPlayer ? 1 + depth : -(1 + depth);
        if (array.length == 0 || depth == 0) return 0;
        if (this.matrix.getSide() == this.maximizingPlayer)
        {
            let bestScore = -Infinity
            for (let [index,indices] of array.entries())
            {
                /*let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: "MAX " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                    children: []
                }*/
                if (this.maximizingPlayer == 'X')
                {
                    this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    /*childDrawnNode.text.name=score;
                    parentDrawnNode.children.push(childDrawnNode);*/
                    this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        this.alpha = Math.max(this.alpha, bestScore);
                        if (this.beta < this.alpha)
                            break; 
                    }
                }
                else
                {
                    this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    /*childDrawnNode.text.name=score;
                    parentDrawnNode.children.push(childDrawnNode);*/
                    this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        this.alpha = Math.max(this.alpha, bestScore);
                        if (this.beta < this.alpha)
                            break; 
                    }
                }
                
            }
            return bestScore;
        }
        else
        {
            let bestScore = Infinity
            for (let [index,indices] of array.entries())
            {
                /*let childDrawnNode = {
                    parent: parentDrawnNode,
                    text: { name: "MIN " + this.maximizingPlayer + " " + indices.x + "," + indices.y},
                    children: []
                }*/
                if (this.maximizingPlayer != 'O')
                {
                    this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    /*childDrawnNode.text.name=score;
                    parentDrawnNode.children.push(childDrawnNode);*/
                    this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        this.beta = Math.min(this.beta, bestScore);
                        if (this.beta < this.alpha)
                            break; 
                    }
                }
                else
                {
                    this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1);
                    /*childDrawnNode.text.name=score;
                    parentDrawnNode.children.push(childDrawnNode);*/
                    this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (this.alphaBetaPrunning === 'true')
                    {
                        this.beta = Math.min(this.beta, bestScore);
                        if (this.beta < this.alpha)
                            break; 
                    }
                }
            }
            return bestScore;
        }
    }

    negamax(depth)
    {

    }

    PNS()
    {

    }

    
}