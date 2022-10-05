window.addEventListener('DOMContentLoaded', () =>{
    const titles = Array.from(document.querySelectorAll('.title'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board=['','','','','','','','',''];
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

    const announce = (type) =>{
        switch(type){
            case PlayerO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PlayerX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText ='Tie';
                break;
        }
        announcer.classList.remove('hide');
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
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    titles.forEach((tile,index) =>{
        tile.addEventListener('click', ()=>userAction(tile,index));
    });

    resetButton.addEventListener('click', resetBoard);
});