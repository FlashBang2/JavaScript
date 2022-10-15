let shared = {
    handleResultValidation: () =>{},
    changePlayer: () =>{},
    validateResultRows: () =>{},
    validateResultColumns: () =>{},
    validateDiagonalLines: () =>{},
    AIType: null,
    chartConfig: null,
    config: null,
    node: null
};

window.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector(".form");
    const tiles = document.querySelector('.container');
    const display = document.querySelector('.display')
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const boardSizeTool = form.querySelector("#boardSize");
    const gameModeTool = form.querySelector("#gameMode");
    const gameSideTool = form.querySelector("#side");
    shared.AIType = form.querySelector("#AISelect");
    const gameRulesTool = form.querySelector("#gameSelect");
    const selectButton = form.querySelector('#confirm');
    const announcer = document.querySelector('.announcer');
    const hiddenOptions = document.querySelectorAll("#hidden");
    const AlphaBetaPrunning = document.querySelector("#AlphaBetaPrunning");
    const AlphaBetaPrunningInput = document.querySelector("#AlphaBetaPrunningInput");
    const depthTool = document.querySelector("#depthTool");

    let currentBoardSize = 0;
    let currentPlayerGlobal;
    let isGameActive = true;
    let isAgainstAI = false;
    let bitwiseBoardO = [];
    let bitwiseBoardX = [];
    let squareBoard = [];
    let board = [];
    
    /*shared.config = {
        container: "#tree-simple",
        connectors:{
            type:"bCurve",
            style: {stroke: 'white'}
        }

    };
    
    shared.chartConfig = [
        shared.config
    ];
    */
    const TIE = 'TIE';

    shared.changePlayer = () =>{
        playerDisplay.classList.remove(`player${currentPlayerGlobal}`);
        currentPlayerGlobal = currentPlayerGlobal === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayerGlobal;
        playerDisplay.classList.add(`player${currentPlayerGlobal}`);
    }

    shared.handleResultValidation = () =>{

        if (shared.validateResultRows(currentPlayerGlobal) || shared.validateResultColumns(currentPlayerGlobal) || shared.validateDiagonalLines(currentPlayerGlobal))
        {
            isGameActive = false;
            announce(currentPlayerGlobal);
        }
        
    }

    shared.validateResultRows = (Player) =>{
        if (gameRulesTool.value=="standard") {
            if (Player == 'X'){
                var newmat =bitwiseBoardX.reduce((prev, next) => next.map((item, i) =>
                        (prev[i] || []).concat(next[i])
                            ), []);
            
                for(var i=0;i<=currentBoardSize-3;i++){
                        var result = parseInt(newmat[i].join(''),2) & parseInt(newmat[i+1].join(''),2) & parseInt(newmat[i+2].join(''),2);
                        if(result !== 0)
                            {
                                return true;
                            }
                }
                return false;
            }
            else{
                var newmat =bitwiseBoardO.reduce((prev, next) => next.map((item, i) =>
                (prev[i] || []).concat(next[i])
                    ), []);
            
                for(var i=0;i<=currentBoardSize-3;i++){
                        var result = parseInt(newmat[i].join(''),2) & parseInt(newmat[i+1].join(''),2) & parseInt(newmat[i+2].join(''),2);
                        if(result !== 0)
                        {
                            return true;
                        }
                }
                return false;
            }
        
        } else {
            console.log('gomoku')
            if (Player == 'X'){
                var newmat =bitwiseBoardX.reduce((prev, next) => next.map((item, i) =>
                        (prev[i] || []).concat(next[i])
                            ), []);
            
                for(var i=0;i<=currentBoardSize-5;i++){
                        var result = parseInt(newmat[i].join(''),2) & parseInt(newmat[i+1].join(''),2) & parseInt(newmat[i+2].join(''),2) & parseInt(newmat[i+3].join(''),2) & parseInt(newmat[i+4].join(''),2);
                        if(result !== 0)
                            {
                                return true;
                            }
                }
                return false;
            }
            else{
                var newmat =bitwiseBoardO.reduce((prev, next) => next.map((item, i) =>
                (prev[i] || []).concat(next[i])
                    ), []);
            
                for(var i=0;i<=currentBoardSize-5;i++){
                        var result = parseInt(newmat[i].join(''),2) & parseInt(newmat[i+1].join(''),2) & parseInt(newmat[i+2].join(''),2) & parseInt(newmat[i+3].join(''),2) & parseInt(newmat[i+4].join(''),2);
                        if(result !== 0)
                        {
                            return true;
                        }
                }
                return false;
            }
        }

        


       
    }

    shared.validateResultColumns = (Player) =>{
        if (gameRulesTool.value=="standard") {
            if (Player == 'X')
                {
                    for(var i = 0;i <= currentBoardSize-3;i++){
                        var result = parseInt(bitwiseBoardX[i].join(''),2) & parseInt(bitwiseBoardX[i+1].join(''),2) & parseInt(bitwiseBoardX[i+2].join(''),2) ;
                        if(result !== 0)
                        {
                            return true;
                            }
                        
                        }
                    return false;
                }
            else
                {
                    for(var i = 0;i <= currentBoardSize-3;i++){
                        var result = parseInt(bitwiseBoardO[i].join(''),2) & parseInt(bitwiseBoardO[i+1].join(''),2) & parseInt(bitwiseBoardO[i+2].join(''),2) ;
                        if(result !== 0)
                            {
                                return true;
                            }
                            
                        }
                    return false;
                }
        } else {
            if (Player == 'X')
                {
                    for(var i = 0;i <= currentBoardSize-5;i++){
                        var result = parseInt(bitwiseBoardX[i].join(''),2) & parseInt(bitwiseBoardX[i+1].join(''),2) & parseInt(bitwiseBoardX[i+2].join(''),2) & parseInt(bitwiseBoardX[i+3].join(''),2) & parseInt(bitwiseBoardX[i+4].join(''),2);
                        if(result !== 0)
                        {
                            return true;
                            }
                        
                        }
                        return false;
                }
            else
                {
                    for(var i = 0;i <= currentBoardSize-5;i++){
                        var result = parseInt(bitwiseBoardO[i].join(''),2) & parseInt(bitwiseBoardO[i+1].join(''),2) & parseInt(bitwiseBoardO[i+2].join(''),2) & parseInt(bitwiseBoardO[i+3].join(''),2) & parseInt(bitwiseBoardO[i+4].join(''),2);
                        if(result !== 0)
                            {
                                return true;
                            }
                            
                        }
                        return false;
                } 
        }

        

        
    }

    shared.validateDiagonalLines = (Player) =>{
        if (gameRulesTool.value=="standard") {
            if (Player == 'X')
            {
                for(var i=0;i<=currentBoardSize-3;i++){
                    var result = parseInt(bitwiseBoardX[i].join(''),2) & parseInt(bitwiseBoardX[i+1].join(''),2) << 1 & parseInt(bitwiseBoardX[i+2].join(''),2) << 2 ;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                for(var i=0;i<=currentBoardSize-3;i++){
                    var result = parseInt(bitwiseBoardX[i].join(''),2) & parseInt(bitwiseBoardX[i+1].join(''),2) >> 1 & parseInt(bitwiseBoardX[i+2].join(''),2) >> 2 ;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                return false;
            }
        else
            {
                for(var i=0;i<=currentBoardSize-3;i++){
                    var result = parseInt(bitwiseBoardO[i].join(''),2) & parseInt(bitwiseBoardO[i+1].join(''),2) << 1 & parseInt(bitwiseBoardO[i+2].join(''),2) << 2 ;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                for(var i=0;i<=currentBoardSize-3;i++){
                    var result = parseInt(bitwiseBoardO[i].join(''),2) & parseInt(bitwiseBoardO[i+1].join(''),2) >> 1 & parseInt(bitwiseBoardO[i+2].join(''),2) >> 2 ;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                return false;
            }
        } else {
            if (Player == 'X')
            {
                for(var i=0;i<=currentBoardSize-5;i++){
                    var result = parseInt(bitwiseBoardX[i].join(''),2) & parseInt(bitwiseBoardX[i+1].join(''),2) << 1 & parseInt(bitwiseBoardX[i+2].join(''),2) << 2 & parseInt(bitwiseBoardX[i+3].join(''),2) << 3 & parseInt(bitwiseBoardX[i+4].join(''),2) << 4;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                for(var i=0;i<=currentBoardSize-5;i++){
                    var result = parseInt(bitwiseBoardX[i].join(''),2) & parseInt(bitwiseBoardX[i+1].join(''),2) >> 1 & parseInt(bitwiseBoardX[i+2].join(''),2) >> 2 & parseInt(bitwiseBoardX[i+3].join(''),2) >> 3 & parseInt(bitwiseBoardX[i+4].join(''),2) >> 4;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                return false;
            }
        else
            {
                for(var i=0;i<=currentBoardSize-5;i++){
                    var result = parseInt(bitwiseBoardO[i].join(''),2) & parseInt(bitwiseBoardO[i+1].join(''),2) << 1 & parseInt(bitwiseBoardO[i+2].join(''),2) << 2 & parseInt(bitwiseBoardO[i+3].join(''),2) << 3 & parseInt(bitwiseBoardO[i+4].join(''),2) << 4;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                for(var i=0;i<=currentBoardSize-5;i++){
                    var result = parseInt(bitwiseBoardO[i].join(''),2) & parseInt(bitwiseBoardO[i+1].join(''),2) >> 1 & parseInt(bitwiseBoardO[i+2].join(''),2) >> 2 & parseInt(bitwiseBoardO[i+3].join(''),2) >> 3 & parseInt(bitwiseBoardO[i+4].join(''),2) >> 4;
                    if(result !== 0)
                        {
                            return true;
                        }
                }
                return false;
            }
        }

       


        
        
        
    }

    const  hideAIOptions = () =>{
        if(gameModeTool.value == "PlayerVSAI"){
            shared.AIType.style.display = "inline";
            gameSideTool.style.display = "inline";
        }else{
            shared.AIType.style.display = "none";
            gameSideTool.style.display = "none";
        }
    }

    const  hideRulesTools = () =>{
        if(boardSizeTool.value < 15 ){
            hiddenOptions.forEach((tile) =>{
                tile.setAttribute("hidden", "hidden");
            });

        }else{
            hiddenOptions.forEach((tile) =>{
                tile.removeAttribute("hidden");
            }); 

        }
    }

    const announce = (type) =>{
        switch(type){
            case 'O':
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case 'X':
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
                break;
        }
        announcer.style.display = "block";
    };

    const isValidAction = (tile) =>{
        if(tile.DOM.innerText === 'X' || tile.DOM.innerText === 'O')
            return false;
        return true;
    };

    const userAction = (tile) =>{
        if(isValidAction(tile) && isGameActive && !isAgainstAI){
            tile.DOM.innerText = currentPlayerGlobal;
            tile.DOM.classList.add(`player${currentPlayerGlobal}`);
            if (currentPlayerGlobal == 'X')
                bitwiseBoardX[tile.row][tile.column] = 1;
            else
                bitwiseBoardO[tile.row][tile.column] = 1;
            shared.handleResultValidation();
            shared.changePlayer();
        }
        if (isValidAction(tile) && isGameActive && isAgainstAI)
        {
            tile.DOM.innerText = currentPlayerGlobal;
            tile.DOM.classList.add(`player${currentPlayerGlobal}`);
            if (currentPlayerGlobal == 'X')
                bitwiseBoardX[tile.row][tile.column] = 1;
            else
                bitwiseBoardO[tile.row][tile.column] = 1;
            shared.handleResultValidation();
            shared.changePlayer();
            turnAI(squareBoard, currentPlayerGlobal);
        }
    }

    const resetBoard = () =>{
        if (playerDisplay.classList.contains(`playerO`))
            playerDisplay.classList.remove(`playerO`);
        else
            playerDisplay.classList.remove(`playerX`);
        playerDisplay.innerText = '';
        if(gameModeTool.value == "PlayerVSAI")
            shared.AIType.style.display = "inline";
        else
            shared.AIType.style.display = "none";
        document.querySelectorAll('.tile').forEach((tile) =>{
            tile.remove();
        });
        tiles.style.gridTemplateColumns = "";
        tiles.style.gridTemplateRows = "";
        gameSideTool.style.display = "inline";
        selectButton.style.display = "inline";
        boardSizeTool.style.display = "inline";
        gameModeTool.style.display = "inline";
        gameRulesTool.style.display = "inline";
        AlphaBetaPrunning.style.display = "inline";
        AlphaBetaPrunningInput.style.display = "inline";
        depthTool.style.display = "inline";
        display.style.display = "none";
        resetButton.style.display = "none";
        announcer.style.display = "none";
        bitwiseBoardO = [];
        bitwiseBoardX = [];
        board = [];
        squareBoard = [];
    } 
    
    const generateBoard = () =>{
        currentBoardSize = parseInt(boardSizeTool.value,10);
        currentPlayerGlobal = gameSideTool.value;
        isGameActive = true;
        if (currentPlayerGlobal == 'X')
        {
            playerDisplay.innerText = 'X';
            playerDisplay.classList.remove(`playerO`);
            playerDisplay.classList.add(`playerX`);
        }
        else
        {
            playerDisplay.innerText = 'O';
            playerDisplay.classList.add(`playerO`);
        }
        gameSideTool.style.display = "none";
        selectButton.style.display = "none";
        boardSizeTool.style.display = "none";
        gameModeTool.style.display = "none";
        gameRulesTool.style.display = "none";
        shared.AIType.style.display = "none";
        AlphaBetaPrunning.style.display = "none";
        AlphaBetaPrunningInput.style.display = "none";
        depthTool.style.display = "none";
        display.style.display = "block";
        resetButton.style.display = "block";
        tiles.style.maxWidth = `${50*currentBoardSize}px`;
        for (var x = 0; x < currentBoardSize; x++)
        {
            let row = [];
            tiles.style.gridTemplateColumns += `${100/currentBoardSize}% `;
            tiles.style.gridTemplateRows += `${100/currentBoardSize}%`;
            for (var y = 0; y < currentBoardSize; y++)
            {
               let square = new Square(x, y);
               square.setOnClick(() =>userAction(square));
               document.querySelector(".container").append(square.DOM);
               row.push(square);
            }
            squareBoard.push(row);
        }
        bitwiseBoardO = new Array(Math.pow(currentBoardSize,2)).fill(0);
        bitwiseBoardO = to2D(bitwiseBoardO, currentBoardSize);
        bitwiseBoardX = JSON.parse(JSON.stringify(bitwiseBoardO));
        board = JSON.parse(JSON.stringify(bitwiseBoardX));
    }  

    const to2D = (array, width) => 
    array.reduce((rows, key, index) => (index % width == 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows, []);

    const gameHandler = () => {
        if (gameModeTool.value == "PlayerVSAI")
            isAgainstAI = true;
        else
            isAgainstAI = false;
        generateBoard();
    }

    resetButton.addEventListener('click', resetBoard);
    selectButton.addEventListener('click', gameHandler);
    gameModeTool.addEventListener('click', hideAIOptions);
    boardSizeTool.addEventListener('click', hideRulesTools);
    gameModeTool.addEventListener('click', hideAIOptions);

});