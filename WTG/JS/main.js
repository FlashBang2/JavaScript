window.addEventListener("DOMContentLoaded", () => {

    const confirm = document.querySelector("#confirm"),     aiSettings = document.querySelector("#AISettings"),     aiSettings2 = document.querySelector("#AISettings2");
    const textAI = document.querySelector("#TextAI"),       textAI2 = document.querySelector("#TextAI2"),           textAI3 = document.querySelector("#TextAI3");
    const textTree = document.querySelector("#TextTree"),   textNotTree = document.querySelector("#TextNotTree"),   boardSize = document.querySelector("#boardSize");
    const settings = document.querySelector("#settings");

    let displayPlayer = null,   display = null,     board = null;
    let ai = null,              ai2 = null,         delay = null;
    let x = null,               y = null;

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

        const aiType = document.querySelector('#AIType').value;
        const aiType2 = document.querySelector('#AIType2').value;
        const time = document.querySelector('#Time').value;
        const time2 = document.querySelector('#Time2').value;
        const alphaBetaPrunning = document.querySelector('#AlphaBetaPrunning').value;
        const alphaBetaPrunning2 = document.querySelector('#AlphaBetaPrunning2').value;

        if (board != null) board = board.remove();

        board = new Board(boardSize.value, turnOrder);
        ai = new AI(board,aiType,time,alphaBetaPrunning);
        ai2 = new AI(board,aiType2,time2,alphaBetaPrunning2);

        if (board.side == 'X') {
            board.setSide();
            board.setBlockPlayerInteraction();
            board.matrix[x][y].setValue();
            setTimeout(playervsAIHelper,1000);
            setTimeout(clear,1001);
        }

        display = document.querySelector("#display");
        display.style.display = "block";
        display.innerHTML = "Player <span id = 'display-player'>  </span>'s turn";
        displayPlayer = document.querySelector("#display-player");
        displayPlayer.classList.add(`player${board.side}`);
        displayPlayer.innerText = board.side;

        if (settings.value == "AIvAI") {
            if (delay != null) clearInterval(delay);
            board.matrix[x][y].setValue();
            delay = setInterval(botvsbot,1000);
            setTimeout(clear,1001);
        }
        
        new Treant(chartConfig1);
        
    }

    const clear = () => {
        
        board.matrix[x][y].setValue();
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

    const botvsbot = () => {

        if (board.getAvailabeSpots().length == 0 || !board.isGameActive) clearInterval(delay);

        ai.move();
        ai2.move();
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