

const changePlayer = () =>{
    console.log('hi')
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}


const handleResultValidation = () =>{
    if (validateResultRows() || validateResultColumns() || validateDiagonalLines())
     {
         isGameActive = false;
         announce(currentPlayer);
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
    }
    return false; 
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





 export {handleResultValidation,changePlayer,validateResultRows, validateResultColumns, validateDiagonalLines,announce}

