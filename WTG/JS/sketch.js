window.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector(".form");
    const tiles = document.querySelector('.container');
    const display = document.querySelector('.display')
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const select = form.querySelector("#boardSize");
    const selectButton = form.querySelector('#confirm');
    const announcer = document.querySelector('.announcer');

    let currentPlayer = 'X';
    let isGameActive = true;

    const PlayerX_WON = 'PLAYERX_WON';
    const PlayerO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const handleResultValidation = () => {
        
    }

    const announce = (type) =>{
        switch(type){
            case PlayerO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PlayerX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
                break;
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) =>{
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        
    }

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
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () =>{
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O'){
            changePlayer();
        }

        tiles.forEach(tile =>{
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    } 
    
    const generateBoard = (dimension) =>{
        selectButton.style.display = "none";
        select.style.display = "none";
        display.style.display = "block";
        resetButton.style.display = "block";
        tiles.style.maxWidth = `${100*dimension}px`
        for (var x = 0; x < dimension; x++)
        {
            tiles.style.gridTemplateColumns += `${100/dimension}% `;
            tiles.style.gridTemplateRows += `${100/dimension}%`;
            for (var y = 0; y < dimension; y++)
            {
                var div = document.createElement('div');
                div.setAttribute("class", "tile");
                tiles.appendChild(div);
            }
        }
        addClickEventForTiles();
    } 

    const addClickEventForTiles = () => {
        Array.from(document.querySelectorAll('.tile')).forEach((tile,index) =>{
            tile.addEventListener('click', ()=>userAction(tile,index));
        }); 
    }     

    resetButton.addEventListener('click', resetBoard);
    selectButton.addEventListener("click", () => generateBoard(select.value));
});