window.addEventListener("DOMContentLoaded", () => {

    const confirm = document.querySelector("#confirm"),             aiSettings = document.querySelector("#AISettings");
    const aiSettings2 = document.querySelector("#AISettings2"),     boardSize = document.querySelector("#boardSize");
    const settings = document.querySelector("#settings");

    let displayPlayer = null,                                               display = null;                                                             
    let board = null,                                                       timeouts =[];                                                                                                                   
    let aiType = document.querySelector('#AIType'),                         aiType2 = document.querySelector('#AIType2');                           
    let moveTime = document.querySelector('#moveTime'),                     moveTime2 = document.querySelector('#moveTime2');
    let alphaBetaPrunning = document.querySelector('#AlphaBetaPrunning'),   alphaBetaPrunning2 = document.querySelector('#AlphaBetaPrunning2');
    let ai = new AI(board,aiType,moveTime,alphaBetaPrunning),               ai2 = new AI(board,aiType2,moveTime2,alphaBetaPrunning2);
    let treeDrawing = document.querySelector('#TreeDrawing');

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

        aiType = document.querySelector('#AIType'),                         aiType2 = document.querySelector('#AIType2');                     
        moveTime = document.querySelector('#moveTime'),                     moveTime2 = document.querySelector('#moveTime2');
        alphaBetaPrunning = document.querySelector('#AlphaBetaPrunning'),   alphaBetaPrunning2 = document.querySelector('#AlphaBetaPrunning2');
       
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
                treeDrawing.style.display = "none";
                document.querySelector('#TreeButtonDescription').style.display = 'none';
                break;
            case "PvAI":
                showContextSensitiveSettings(ai);
                aiSettings2.style.display = "none";
                aiSettings.style.display = "inline";
                document.querySelector("#side").style.display = "inline";
                document.querySelector(".SideDescription").style.display = "inline";
                break;
            case "AIvAI":
                showContextSensitiveSettings(ai);
                showContextSensitiveSettings(ai2);
                aiSettings.style.display = "inline";
                aiSettings2.style.display = "inline";
                document.querySelector('#side').style.display = "none";
                document.querySelector(".SideDescription").style.display = "none";
                break;
        }
    }

    const flipFlopForSensitiveSettings = (element,index) => {
        if (this.ai.aiType.id.replace(/[A-Z]/ig, '') == '' && index == 0) {
            element.style.cssText = cssText;
            return;
        }
        if (this.ai.aiType.id.replace(/[A-Z]/ig, '') == '2' && index == 1) {
            element.style.cssText = cssText;
            return;
        }
    }

    const showContextSensitiveSettings = (ai) => {
        switch (ai.aiType.value) {
            case "Random":
                ai.moveTime.style.display = "none";
                ai.alphaBetaPrunning.style.display = "none";
                treeDrawing.style.display = "none";
                document.querySelector('#TreeButtonDescription').style.display = 'none';
                document.querySelectorAll('.AlphaBetaPrunningDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: none;");
                document.querySelectorAll('.MoveTimeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: none;");
                document.querySelectorAll('.AITypeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "margin-left: 6em;");
                break;
            case "Minimax":
                ai.moveTime.style.display = "inline";
                ai.alphaBetaPrunning.style.display = "inline";
                treeDrawing.style.display = "inline";
                document.querySelector('#TreeButtonDescription').style.display = 'inline';
                document.querySelectorAll('.AlphaBetaPrunningDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: inline;");
                document.querySelectorAll('.MoveTimeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: inline;");
                document.querySelectorAll('.MoveTimeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "margin-left: 0.25em;");
                document.querySelectorAll('.AITypeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "margin-left: 5em;");
                break;
            case "Negamax":
                ai.moveTime.style.display = "inline";
                ai.alphaBetaPrunning.style.display = "inline";
                treeDrawing.style.display = "inline";
                document.querySelector('#TreeButtonDescription').style.display = 'inline';
                document.querySelectorAll('.AlphaBetaPrunningDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: inline;");
                document.querySelectorAll('.MoveTimeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: inline;");
                document.querySelectorAll('.MoveTimeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "margin-left: 0.25em;");
                document.querySelectorAll('.AITypeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "margin-left: 5em;");
                break;
            case "MonteCarloSearch":
                ai.moveTime.style.display = "inline";
                ai.alphaBetaPrunning.style.display = "none";
                treeDrawing.style.display = "inline";
                document.querySelector('#TreeButtonDescription').style.display = 'inline';
                document.querySelectorAll('.AlphaBetaPrunningDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: none;");
                document.querySelectorAll('.MoveTimeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "display: inline;");
                document.querySelectorAll('.MoveTimeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "margin-left: 3em;");
                document.querySelectorAll('.AITypeDescription').forEach(flipFlopForSensitiveSettings, this.ai = ai, cssText = "margin-left: 4.5em;");
                break;
            case "MonteCarloSearchTree":

                break;
            case "ProofNumberSearch":

                break;
            case "DeepQLearning":

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
            document.querySelector("#rules").value = "Standard";
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
    aiType.addEventListener('change', () => {ai = new AI(board, aiType, moveTime, alphaBetaPrunning); showContextSensitiveSettings(ai)});
    aiType2.addEventListener('change', () => {ai2 = new AI(board, aiType2, moveTime2, alphaBetaPrunning2); showContextSensitiveSettings(ai2)});
   
});