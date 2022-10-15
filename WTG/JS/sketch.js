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

    let currentBoardSize = parseInt(boardSizeTool.value,10);
    let currentPlayerGlobal = 'O';
    let isGameActive = true;
    let isAgainstAI = false;
    let bitwiseBoardO = new Array(Math.pow(currentBoardSize,2)).fill(0);
    let bitwiseBoardX = [];
    
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

    shared.changePlayer = () =>{
        playerDisplay.classList.remove(`player${currentPlayerGlobal}`);
        currentPlayerGlobal = currentPlayerGlobal === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayerGlobal;
        playerDisplay.classList.add(`player${currentPlayerGlobal}`);
    }

    const userAction = (tile) =>{
        console.log(bitwiseBoardO, bitwiseBoardX);
        if(isValidAction(tile) && isGameActive && !isAgainstAI){
            tile.DOM.innerText = currentPlayerGlobal;
            tile.DOM.classList.add(`player${currentPlayerGlobal}`);
            shared.handleResultValidation();
            shared.changePlayer();
        }
        if (isValidAction(tile) && isGameActive && isAgainstAI)
        {
            tile.DOM.innerText = currentPlayerGlobal;
            tile.DOM.classList.add(`player${currentPlayerGlobal}`);
            shared.handleResultValidation();
            shared.changePlayer();
        }
    }

    const resetBoard = () =>{
        if(gameModeTool.value=="PlayerVSAI")
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
    } 
    
    const generateBoard = () =>{
        isGameActive = true;
        currentPlayerGlobal = gameSideTool.value;
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
            tiles.style.gridTemplateColumns += `${100/currentBoardSize}% `;
            tiles.style.gridTemplateRows += `${100/currentBoardSize}%`;
            for (var y = 0; y < currentBoardSize; y++)
            {
               let square = new Square(x, y);
               square.setOnClick(() =>userAction(square));
               document.querySelector(".container").append(square.DOM);
            }
        }
        bitwiseBoardO = to2D(bitwiseBoardO, currentBoardSize);
        bitwiseBoardX = [...bitwiseBoardO];
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