window.addEventListener("DOMContentLoaded", () =>{
    const confirm = document.querySelector("#confirm");
    const AISettings = document.querySelector("#AISettings");
    const AISettings2 = document.querySelector("#AISettings2");
    const Text = document.querySelector("#Text");
    const Text2 = document.querySelector("#Text2");
    const Text3 = document.querySelector("#Text3");
    const TextTree = document.querySelector("#TextTree");
    const TextNotTree = document.querySelector("#TextNotTree");
    const boardSize = document.querySelector("#boardSize");
    const settings = document.querySelector("#settings");

    let displayPlayer = null;
    let display = null;
    let board = null;
    let ai = null;
    let ai2 = null;
    let delay = null;
    let x = null;
    let y = null;
    let chartConfig1 = {
        chart: {
            container: "#tree-simple",
            connectors:{
                type:"bCurve",
                style: {stroke: 'black'}
            }},
            nodeStructure:  {
                
            }

        }

    const generateBoard = () =>{
        x = Math.floor(Math.random() * (boardSize.value - 1));
        y = Math.floor(Math.random() * (boardSize.value - 1));
        const AIType = document.querySelector('#AIType').value;
        const AIType2 = document.querySelector('#AIType2').value;
        const depth = document.querySelector('#Depth').value;
        const depth2 = document.querySelector('#Depth2').value;
        const alphaBetaPrunning = document.querySelector('#AlphaBetaPrunning').value;
        const AlphaBetaPrunning2 = document.querySelector('#AlphaBetaPrunning2').value;
        if (board != null)
            board = board.remove();
        board = new Board(boardSize.value, turnOrder);
        ai = new AI(board,AIType,depth,alphaBetaPrunning);
        ai2 = new AI(board,AIType2,depth2,AlphaBetaPrunning2);
        if(board.getSide() == 'X')
        {
            board.setSide();
            board.setBlockPlayerInteraction();
            board.getMatrix()[x][y].setValue();
            setTimeout(playervsAIHelper,1000);
            setTimeout(clear,1001);
        }
        display = document.querySelector("#display");
        display.style.display = "block";
        display.innerHTML = "Player <span id = 'display-player'>  </span>'s turn";
        displayPlayer = document.querySelector("#display-player");
        displayPlayer.classList.add(`player${board.getSide()}`);
        displayPlayer.innerText = board.getSide();
        if (settings.value == "AIvAI")
        {
            if (delay != null) clearInterval(delay);
            board.getMatrix()[x][y].setValue();
            delay = setInterval(botvsbot,1000);
            setTimeout(clear,1001);
        }
        
        new Treant(chartConfig1);
        
    }
    const clear = () => {
        
        board.getMatrix()[x][y].setValue();
    }

    const showAISettings = () =>{
        switch(settings.value)
        {
            case "PvP":
                AISettings.style.display = "none";
                AISettings2.style.display = "none";
                TextNotTree.style.display = "inline";
                TextTree.style.display = "none";
                document.querySelector('#TreeDrawing').style.display = "none";
                break;
            case "PvAI":
                AISettings.style.display = "inline";
                Text.style.display = "inline";
                Text2.style.display = "none";
                Text3.style.display = "none";
                TextNotTree.style.display = "none";
                TextTree.style.display = "inline";
                document.querySelector("#side").style.display = "inline";
                document.querySelector('#TreeDrawing').style.display = "inline";
                AISettings2.style.display = "none";
                break;
            case "AIvAI":
                AISettings.style.display = "inline";
                AISettings2.style.display = "inline";
                Text2.style.display = "inline";
                Text3.style.display = "inline";
                TextNotTree.style.display = "none";
                TextTree.style.display = "inline";
                Text.style.display = "none";
                document.querySelector('#side').style.display = "none";
                document.querySelector('#TreeDrawing').style.display = "inline";
                break;
        }
    }

    const moreRules = () =>{
        
        if (boardSize.value >= 15)
        {
            for (let element of document.querySelectorAll(".rule"))
            {
                element.hidden = false;
            }
        }
        else
        {
            for (let element of document.querySelectorAll(".rule"))
            {
                element.hidden = true;
            }
        }   
    }

    const botvsbot = () =>{
        if (board.getAvailabeSpots().length == 0 || !board.isGameActive)
            clearInterval(delay);
        ai.move();
        ai2.move();
    }

    const turnOrder = (square) =>{
        
        switch(settings.value)
        {
            case "PvP":
                if (!square.Occupied && board.isGameActive)
                {
                    square.DOM.innerText = board.getSide();
                    square.DOM.classList.add(`player${board.getSide()}`);
                    board.getSide() == 'X' ? board.Xbits[square.getRow()][square.getColumn()] = 1: board.Obits[square.getRow()][square.getColumn()] = 1;
                    square.setValue();
                    square.setOccupied();
                    board.validate();
                    if (board.getWinner() != null)
                    {
                        board.isGameActive = false;
                        board.getWinner() == 'X' ? display.innerHTML = "Player <span class='playerX'>X</span> Won" : display.innerHTML = "Player <span class='playerO'>O</span> Won";
                    }
                    else
                    {
                        displayPlayer.classList.remove(`player${board.getSide()}`);
                        board.setSide();
                        displayPlayer.classList.add(`player${board.getSide()}`);
                        displayPlayer.innerText = board.getSide();
                        if (board.getAvailabeSpots().length == 0)
                        {
                            board.isGameActive = false;
                            display.innerHTML = "TIE";
                        }
                        
                    }
                }
                break;
            case "PvAI":
                if (!square.Occupied && board.isGameActive && !board.blockPlayerInteraction)
                {
                    square.DOM.innerText = board.getSide();
                    square.DOM.classList.add(`player${board.getSide()}`);
                    board.getSide() == 'X' ? board.Xbits[square.getRow()][square.getColumn()] = 1 : board.Obits[square.getRow()][square.getColumn()] = 1;
                    square.setValue();
                    square.setOccupied();
                    board.validate();
                    if (board.getWinner() != null)
                    {
                        board.isGameActive = false;
                        board.getWinner() == 'X' ? display.innerHTML = "Player <span class='playerX'>X</span> Won" : display.innerHTML = "Player <span class='playerO'>O</span> Won";
                    }
                    else
                    {
                        displayPlayer.classList.remove(`player${board.getSide()}`);
                        board.setSide();
                        displayPlayer.classList.add(`player${board.getSide()}`);
                        displayPlayer.innerText = board.getSide();
                        board.setBlockPlayerInteraction();
                        setTimeout(playervsAIHelper,1000);
                        if (board.getAvailabeSpots().length == 0)
                        {
                            board.isGameActive = false;
                            display.innerHTML = "TIE";
                        }
                    }
                }
                break;
        }
        
    }

    const playervsAIHelper = () =>{
        ai.move();
    }

    confirm.addEventListener('click', generateBoard);
    boardSize.addEventListener('change', moreRules);
    settings.addEventListener('change', showAISettings);
});