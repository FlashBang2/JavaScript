window.addEventListener("DOMContentLoaded", () => {

    const confirm = document.querySelector("#confirm"),     aiSettings = document.querySelector("#AISettings"),     aiSettings2 = document.querySelector("#AISettings2");
    const textAI = document.querySelector("#TextAI"),       textAI2 = document.querySelector("#TextAI2"),           textAI3 = document.querySelector("#TextAI3");
    const textTree = document.querySelector("#TextTree"),   textNotTree = document.querySelector("#TextNotTree"),   boardSize = document.querySelector("#boardSize");
    const settings = document.querySelector("#settings");

    let displayPlayer = null,   display = null,     board = null;
    let ai = null,              ai2 = null,         x = null;
    let y = null,               timeouts =[];

    let chartConfig1 = {
            chart: {

                container: "#tree-simple",
                connectors: {
                    type:"bCurve",
                    style: { stroke: 'black' }
                }
            },
            nodeStructure: {
                
            }
        }

    

    const generateBoard = () => {

        x = Math.floor(Math.random() * (boardSize.value - 1));
        y = Math.floor(Math.random() * (boardSize.value - 1));

        const aiType = document.querySelector('#AIType').value,                         aiType2 = document.querySelector('#AIType2').value;                     
        const moveTime = document.querySelector('#moveTime').value,                     moveTime2 = document.querySelector('#moveTime2').value;
        const alphaBetaPrunning = document.querySelector('#AlphaBetaPrunning').value,   alphaBetaPrunning2 = document.querySelector('#AlphaBetaPrunning2').value;
       
        if (timeouts.length != 0) {
            for (let timeout of timeouts) {
                clearTimeout(timeout);
            }
        } 

        if (board != null) board = board.remove();

        board = new Board(boardSize.value, turnOrder);
        ai = new AI(board,aiType,moveTime,alphaBetaPrunning);
        ai2 = new AI(board,aiType2,moveTime2,alphaBetaPrunning2);

        if (board.side == 'X') {
            board.setSide();
            board.setBlockPlayerInteraction();
            timeouts.push(setTimeout(playervsAIHelper,1000));
        }

        display = document.querySelector("#display");
        display.style.display = "block";
        display.innerHTML = "Player <span id = 'display-player'>  </span>'s turn";
        displayPlayer = document.querySelector("#display-player");
        displayPlayer.classList.add(`player${board.side}`);
        displayPlayer.innerText = board.side;

        if (settings.value == "AIvAI") timeouts.push(setTimeout(firstBot,1000));
        
        new Treant(chartConfig1);
        
    }

    const firstBot = () => {
        if (!board.isGameActive) return
        ai.move();
        timeouts.push(setTimeout(secondBot, 1000));
    }

    const secondBot = () => {
        if (!board.isGameActive) return
        ai2.move();
        timeouts.push(setTimeout(firstBot, 1000));
    }

    const showAISettings = () =>{

        switch(settings.value) {

            case "PvP":

                aiSettings.style.display = "none";
                aiSettings2.style.display = "none";
                textNotTree.style.display = "inline";
                textTree.style.display = "none";
                document.querySelector('#TreeDrawing').style.display = "none";

                break;

            case "PvAI":

                aiSettings.style.display = "inline";
                textAI.style.display = "inline";
                textAI2.style.display = "none";
                textAI3.style.display = "none";
                textNotTree.style.display = "none";
                textTree.style.display = "inline";
                document.querySelector("#side").style.display = "inline";
                document.querySelector('#TreeDrawing').style.display = "inline";
                aiSettings2.style.display = "none";

                break;

            case "AIvAI":

                aiSettings.style.display = "inline";
                aiSettings2.style.display = "inline";
                textAI2.style.display = "inline";
                textAI3.style.display = "inline";
                textNotTree.style.display = "none";
                textTree.style.display = "inline";
                textAI.style.display = "none";
                document.querySelector('#side').style.display = "none";
                document.querySelector('#TreeDrawing').style.display = "inline";

                break;
        }
    }

    const moreRules = () => {
        
        if (boardSize.value >= 15) {
            for (let element of document.querySelectorAll(".rule")) {
                element.hidden = false;
            }
        }
        else {
            for (let element of document.querySelectorAll(".rule")) {
                element.hidden = true;
            }
        }   
    }

    const turnOrder = (square) => {
        switch(settings.value) {

            case "PvP":
                if (!square.value == 0 || !board.isGameActive) break;
                square.DOM.innerText = board.side;
                square.DOM.classList.add(`player${board.side}`);
                square.setValue(board.side);
                board.validate();
                board.gameStateCheck(board.winner);
                break;
            case "PvAI":
                if (!square.value == 0 || !board.isGameActive || board.blockPlayerInteraction) break;
                board.currentPosition = board.currentPosition ^ board.zobristKeys[square.row][square.column][board.side == 'X' ? 1 : 0];
                square.DOM.innerText = board.side;
                square.DOM.classList.add(`player${board.side}`);
                square.setValue(board.side);
                board.validate();
                board.gameStateCheck(board.winner, playervsAIHelper);
                break;
        }
        
    }

    const playervsAIHelper = () => {
        ai.move();
    }

    confirm.addEventListener('click', generateBoard);
    boardSize.addEventListener('change', moreRules);
    settings.addEventListener('change', showAISettings);

});