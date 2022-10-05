window.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector(".form");
    const tiles = document.querySelector('.container');
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const select = form.querySelector("#boardSize");
    const selectButton = form.querySelector('#confirm');
    const announcer = document.querySelector('.announcer');

    let boardSize = 3;
    let board = [];
    board.length = boardSize * boardSize;
    board.fill("");
    let currentPlayer = 'X';
    let isGameActive = true;

    const PlayerX_WON = 'PLAYERX_WON';
    const PlayerO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for (let  i = 0; i <= 7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === ''){
                continue;
            }
            if (a === b && b === c){
                roundWon = true;
                break;
            }
        }
        if (roundWon){
            announce(currentPlayer === 'X' ? PlayerX_WON : PlayerO_WON);
            isGameActive = false;
            return;
        }
        if (!board.includes(''))
            announce(TIE);    
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
        board[index] = currentPlayer;
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
        board = ['', '', '', '', '', '', '', '', ''];
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
        tiles.style.gridTemplateColumns = `${100/dimension}% `;
        tiles.style.gridTemplateRows = `${100/dimension}%`;
        for (let i =1  ; i < dimension; i++) {
            tiles.style.gridTemplateColumns += `${100/dimension}% `;
            tiles.style.gridTemplateRows += `${100/dimension}%`;
        }
        tiles.style.maxWidth = `${100*dimension}px`
        for (var x = 0; x < dimension; x++)
        {
            for (var y = 0; y < dimension; y++)
            {
                var div = document.createElement('div');
                div.setAttribute("class", "tile");
                tiles.appendChild(div);
            }
        }
    } 

    /* tiles.forEach((tile,index) =>{
        tile.addEventListener('click', ()=>userAction(tile,index));
    }); */

    resetButton.addEventListener('click', resetBoard);
    selectButton.addEventListener("click", () => generateBoard(select.value));
});