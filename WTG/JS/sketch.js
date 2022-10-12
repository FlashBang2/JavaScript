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

    let currentBoardSize = 0;
    let currentPlayerGlobal = 'O';
    let isGameActive = true;
    let isAgainstAI = false;
    let board;
    let counter = 0;
    shared.AIType.style.display = "none";
    gameSideTool.style.display = "none";

    
    shared.config = {
        container: "#tree-simple",
        connectors:{
            type:"bCurve",
            style: {stroke: 'white'}
        }

    };
    
    shared.chartConfig = [
        shared.config
    ];
    
    const TIE = 'TIE';

    const  hideOptions = () =>{
        if(gameModeTool.value == "PlayerVSAI"){
            shared.AIType.style.display = "inline";
            gameSideTool.style.display = "inline";
        }else{
            shared.AIType.style.display = "none";
            gameSideTool.style.display = "none";
        }
    }

    const  hideOptions2 = () =>{
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

    shared.handleResultValidation = () =>{
        switch (gameRulesTool.value) {
            case "standard":
                if (shared.validateResultRows(currentPlayerGlobal) || shared.validateResultColumns(currentPlayerGlobal) || shared.validateDiagonalLines(currentPlayerGlobal))
                {
                    isGameActive = false;
                    announce(currentPlayerGlobal);
                }
                counter = 0;
                board.forEach((tile)=>{
                    if (tile.classList.contains(`playerX`))
                        counter++
                    if (tile.classList.contains(`playerO`))
                        counter++
                })
                if (counter == Math.pow(currentBoardSize,2) && isGameActive == true)
                {
                    isGameActive = false;
                    announce(TIE)
                }
                break;
            case "gomoku":
                let full=true;
                for (let i = 0; i < board.length; i++) {
                    if(board[i].textContent == ''){
                        full = false;
                    }
                    if(board[i].textContent !== ''){
                        if((board[i].textContent == board[i+1].textContent && 
                            board[i+1].textContent == board[i+2].textContent && 
                            board[i+2].textContent == board[i+3].textContent && 
                            board[i+3].textContent == board[i+4].textContent ) ||
                            (board[i].textContent == board[i+currentBoardSize].textContent && 
                            board[i+currentBoardSize].textContent == board[i+2*currentBoardSize].textContent && 
                            board[i+2*currentBoardSize].textContent == board[i+3*currentBoardSize].textContent && 
                            board[i+3*currentBoardSize].textContent == board[i+4*currentBoardSize].textContent ) ||
                            (board[i].textContent == board[i+1+currentBoardSize].textContent && 
                            board[i+1+currentBoardSize].textContent == board[i+2+2*currentBoardSize].textContent && 
                            board[i+2+2*currentBoardSize].textContent == board[i+3+3*currentBoardSize].textContent && 
                            board[i+3+3*currentBoardSize].textContent == board[i+4+4*currentBoardSize].textContent ) ||
                            (board[i].textContent == board[i-1+currentBoardSize].textContent && 
                            board[i-1+currentBoardSize].textContent == board[i-2+2*currentBoardSize].textContent && 
                            board[i-2+2*currentBoardSize].textContent == board[i-3+3*currentBoardSize].textContent && 
                            board[i-3+3*currentBoardSize].textContent == board[i-4+4*currentBoardSize].textContent ) 
                        ){
                            isGameActive = false;
                            announce(currentPlayerGlobal)
                        }
                    }
                }
                if(full){
                    announce(TIE)
                }
                break;
        }
              
    }

    shared.validateResultRows = (currentPlayer) =>{
        for (var y = 0;y < currentBoardSize;y++)
        {
            counter = 0;
            for (var x = currentBoardSize * y;x < currentBoardSize * (y + 1);x++)
            {
                if (board[x].classList.contains(`player${currentPlayer}`))
                    counter++
                else
                    break
            }
            if (counter == currentBoardSize)
                return true;
        }
        return false; 
    }

    shared.validateResultColumns = (currentPlayer) =>{
        for (var y = 0; y < currentBoardSize;y++)
        {
            counter = 0
            for (var x = y; x < Math.pow(currentBoardSize,2); x+=parseInt(currentBoardSize,10))
            {
                if (board[x].classList.contains(`player${currentPlayer}`))
                    counter++
                else
                    break;
            }
            if (counter == currentBoardSize)
                return true;
        }
        return false;
    }

    shared.validateDiagonalLines = (currentPlayer) =>{
        counter = 0;
        for (var x = 0;x < Math.pow(currentBoardSize,2);x+=parseInt(currentBoardSize,10) + 1)
        {
            if(board[x].classList.contains(`player${currentPlayer}`))
                counter++
        }
        if (counter == currentBoardSize)
            return true
        counter = 0;
        for (var x = parseInt(currentBoardSize)-1;x < (Math.pow(currentBoardSize,2) - 1);x+=parseInt(currentBoardSize,10) - 1)
        {
            if (board[x].classList.contains(`player${currentPlayer}`))
                counter++
        }
        if (counter == currentBoardSize)
            return true
        return false
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
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    shared.changePlayer = () =>{
        playerDisplay.classList.remove(`player${currentPlayerGlobal}`);
        currentPlayerGlobal = currentPlayerGlobal === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayerGlobal;
        playerDisplay.classList.add(`player${currentPlayerGlobal}`);
    }

    const userAction = (tile) =>{
        if(isValidAction(tile) && isGameActive && !isAgainstAI){
            tile.innerText = currentPlayerGlobal;
            tile.classList.add(`player${currentPlayerGlobal}`);
            shared.handleResultValidation();
            shared.changePlayer();
        }
        if (isValidAction(tile) && isGameActive && isAgainstAI)
        {
            
            tile.innerText = currentPlayerGlobal;
            tile.classList.add(`player${currentPlayerGlobal}`);
            shared.handleResultValidation();
            shared.changePlayer();
            turnAI(board, currentPlayerGlobal);
        }
    }

    const resetBoard = () =>{
        board.forEach((tile) =>{
        tile.remove();
        tiles.style.gridTemplateColumns = "";
        tiles.style.gridTemplateRows = "";
        gameSideTool.style.display = "inline";
        selectButton.style.display = "inline";
        boardSizeTool.style.display = "inline";
        gameModeTool.style.display = "inline";
        gameRulesTool.style.display = "inline";
        AlphaBetaPrunning.style.display = "inline";
        AlphaBetaPrunningInput.style.display = "inline";
        if(gameModeTool.value=="PlayerVSAI"){
            shared.AIType.style.display = "inline";
        }else{
            shared.AIType.style.display = "none";
        }
        display.style.display = "none";
        resetButton.style.display = "none";
        announcer.style.display = "none";
       });
    } 
    
    const generateBoard = () =>{
        isGameActive = true;
        currentBoardSize = parseInt(boardSizeTool.value,10);
        if (gameRulesTool.value!="standard") {
            currentBoardSize=15;
        }
        currentPlayerGlobal = gameSideTool.value;
        gameSideTool.style.display = "none";
        selectButton.style.display = "none";
        boardSizeTool.style.display = "none";
        gameModeTool.style.display = "none";
        gameRulesTool.style.display = "none";
        shared.AIType.style.display = "none";
        AlphaBetaPrunning.style.display = "none";
        AlphaBetaPrunningInput.style.display = "none";
        display.style.display = "block";
        resetButton.style.display = "block";
        tiles.style.maxWidth = `${50*currentBoardSize}px`;
        for (var x = 0; x < currentBoardSize; x++)
        {
            tiles.style.gridTemplateColumns += `${100/currentBoardSize}% `;
            tiles.style.gridTemplateRows += `${100/currentBoardSize}%`;
            for (var y = 0; y < currentBoardSize; y++)
            {
                var div = document.createElement('div');
                div.setAttribute("class", "tile");
                tiles.appendChild(div);
            }
        }
        addClickEventForTiles();
    } 

    const addClickEventForTiles = () => {
        board = Array.from(document.querySelectorAll('.tile'));
        board.forEach((tile) =>{
            tile.addEventListener('click',() =>userAction(tile));
        }); 
    }     

    const gameHandler = () => {
        if (gameModeTool.value == "PlayerVSAI")
            isAgainstAI = true;
        else
            isAgainstAI = false;
        generateBoard();
    }

    resetButton.addEventListener('click', resetBoard);
    selectButton.addEventListener('click', gameHandler);
    gameModeTool.addEventListener('click', hideOptions);
    boardSizeTool.addEventListener('click', hideOptions2);
    gameModeTool.addEventListener('click', hideOptions);

});