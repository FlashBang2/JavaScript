window.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector(".form");
    const tiles = document.querySelector('.container');
    const display = document.querySelector('.display')
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const select = form.querySelector("#boardSize");
    const selectButton = form.querySelector('#confirm');
    const announcer = document.querySelector('.announcer');

    let currentPlayer = 'O';
    let isGameActive = true;
    let board;
    let currentBoardSize;
    let counter = 0;

    const TIE = 'TIE';

    const handleResultValidation = () =>{
       if (validateResultRows() || validateResultColumns())
        {
            isGameActive = false;
            announce(currentPlayer);
        }
    }

    const validateResultRows = () =>{
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
            return false;    
        }
    }

    const validateResultColumns = () =>{
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

    const validateDiagonalLines = () =>{

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

    const changePlayer = () =>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile,index) =>{
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () =>{
        board.forEach((tile) =>{
        tile.remove();
        tiles.style.gridTemplateColumns = "";
        tiles.style.gridTemplateRows = "";
        selectButton.style.display = "inline";
        select.style.display = "inline";
        display.style.display = "none";
        resetButton.style.display = "none";
        announcer.style.display = "none";
       });
    } 
    
    const generateBoard = (dimension) =>{
        isGameActive = true;
        currentBoardSize = dimension;
        selectButton.style.display = "none";
        select.style.display = "none";
        display.style.display = "block";
        resetButton.style.display = "block";
        tiles.style.maxWidth = `${100*currentBoardSize}px`
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
        board.forEach((tile,index) =>{
            tile.addEventListener('click', ()=>userAction(tile,index));
        }); 
    }     

    resetButton.addEventListener('click', resetBoard);
    selectButton.addEventListener("click", () => generateBoard(select.value));
});