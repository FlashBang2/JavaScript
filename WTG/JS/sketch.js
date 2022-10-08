let shared = {
    handleResultValidation: () =>{},
    changePlayer: () =>{},
    validateResultRows: () =>{},
    validateResultColumns: () =>{},
    validateDiagonalLines: () =>{},
};

window.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector(".form");
    const tiles = document.querySelector('.container');
    const display = document.querySelector('.display')
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const boardSizeTool = form.querySelector("#boardSize");
    const gameModeTool = form.querySelector("#gameMode");
    const AIType = form.querySelector("#AISelect");
    const gameRulesTool = form.querySelector("#gameSelect");
    const selectButton = form.querySelector('#confirm');
    const announcer = document.querySelector('.announcer');

    let currentBoardSize = 0;
    let currentPlayerGlobal = 'O';
    let isGameActive = true;
    let isAgainstAI = false;
    let board;
    let counter = 0;

    const TIE = 'TIE';

    shared.handleResultValidation = () =>{
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
            switch (gameRulesTool.value) {
                case "standard":
                    shared.handleResultValidation();
                    break;
                case "gomoku":
                    console.log("its a me mario");
                    break;
            }
            
            shared.changePlayer();
        }
        if (isValidAction(tile) && isGameActive && isAgainstAI)
        {
            tile.innerText = currentPlayerGlobal;
            tile.classList.add(`player${currentPlayerGlobal}`);
            switch (gameRulesTool.value) {
                case "standard":
                    shared.handleResultValidation();
                    break;
                case "gomoku":
                    
                    break;
            }
            shared.changePlayer();
            turnAI(board, currentPlayerGlobal);
        }
    }

    const resetBoard = () =>{
        board.forEach((tile) =>{
        tile.remove();
        tiles.style.gridTemplateColumns = "";
        tiles.style.gridTemplateRows = "";
        selectButton.style.display = "inline";
        boardSizeTool.style.display = "inline";
        gameModeTool.style.display = "inline";
        gameRulesTool.style.display = "inline";
        AIType.style.display = "inline";
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
        selectButton.style.display = "none";
        boardSizeTool.style.display = "none";
        gameModeTool.style.display = "none";
        gameRulesTool.style.display = "none";
        AIType.style.display = "none";
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

});