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
        this.alpha = -Infinity;
        this.beta = Infinity;
        this.config = {
            container: "#tree-simple",
            connectors:{
                type:"bCurve",
                style: {stroke: 'white'}
            }
    
        };
        
        this.chartConfig = [
            this.config
        ];
    }

    move()
    {
        this.chartConfig.splice(0, this.chartConfig.length);
        this.chartConfig.push(this.config);
        this.node = {
            text: { name: "start" }
        };
        this.chartConfig.push(this.node);

        let array = this.matrix.getAvailabeSpots();
        this.bestScore = -Infinity;
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
                for (let [index,indices] of array.entries())
                {
                    if (this.maximizingPlayer == 'X')
                    {
                        this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                        this.matrix.getMatrix()[indices.x][indices.y].setValue();
                        this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                        this.matrix.setSide();
                        let score = this.minimax(this.depth, index, 0);
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
                        let score = this.minimax(this.depth, index, 0);
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
        var my_chart = new Treant(this.chartConfig);
    }

    minimax(depth, i, p)
    {
        this.drawTree(depth, i, p, 0);
        let array = this.matrix.getAvailabeSpots();
        this.matrix.validate();
        if (this.matrix.getWinner() != null)
            return this.matrix.getWinner() == this.maximizingPlayer ? 1 : -1;
        if (array.length == 0 || depth == 0)
            return 0;
        if (this.matrix.getSide() == this.maximizingPlayer)
        {
            let bestScore = -Infinity
            for (let [index,indices] of array.entries())
            {
                if (this.maximizingPlayer == 'X')
                {
                    this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, index, i);
                    this.matrix.Xbits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (this.alphaBetaPrunning)
                    {
                        this.alpha = Math.max(this.alpha, bestScore);
                        if (this.beta <= this.alpha)
                            break; 
                    }
                }
                else
                {
                    this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, index, i);
                    this.matrix.Obits[this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.max(bestScore, score);
                    if (this.alphaBetaPrunning)
                    {
                        this.alpha = Math.max(this.alpha, bestScore);
                        if (this.beta <= this.alpha)
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
                if (this.maximizingPlayer != 'O')
                {
                    this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, index, i);
                    this.matrix.Obits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (this.alphaBetaPrunning)
                    {
                        this.beta = Math.min(this.beta, bestScore);
                        if (this.beta <= this.alpha)
                            break; 
                    }
                }
                else
                {
                    this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 1;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    let score = this.minimax(depth - 1, index, i);
                    this.matrix.Xbits[ this.matrix.getMatrix()[indices.x][indices.y].getRow()][ this.matrix.getMatrix()[indices.x][indices.y].getColumn()] = 0;
                    this.matrix.getMatrix()[indices.x][indices.y].setValue();
                    this.matrix.getMatrix()[indices.x][indices.y].setOccupied();
                    this.matrix.setSide();
                    bestScore = Math.min(bestScore, score);
                    if (this.alphaBetaPrunning)
                    {
                        this.beta = Math.min(this.beta, bestScore);
                        if (this.beta <= this.alpha)
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

    drawTree(depth, i, p, bestScore){
        //console.log(depth, i, p, bestScore)
        if (depth == parseInt(document.querySelector('#Depth').value, 10)) {
            window["node_" + depth +"_"+i+"_"+p] = {
                parent: this.node,
                text: { name: ` ${bestScore} ` }
            };
           
        } else {
            let int=0;
            while (this.chartConfig.length == int) {
                if (this.chartConfig.includes( window["node_" + depth +"_"+p+"_"+int])) {
                    break;
                }else if(this.chartConfig.length == int){
                    int=0;
                    break;
                }
                int++;
            }
            window["node_" + depth +"_"+i+"_"+p]= {
                parent: window["node_" + (depth+1) +"_"+p+"_"+int],
                text: { name: ` ${bestScore} ` }
            };
            
        }
        this.chartConfig.push( window["node_" + depth +"_"+i+"_"+p]);
    
    }
}