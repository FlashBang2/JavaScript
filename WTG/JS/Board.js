class Board{

    tiles = document.querySelector("#container");

    constructor(boardSize, turnOrder)
    {
        this.matrix = [],                           this.side = document.querySelector('#side').value,  this.isGameActive = true;
        this.blockPlayerInteraction = false,        this.boardSize = boardSize,                         this.winner = null;
        this.value = 0,                             this.move = {},                                     this.exploredBoards = [];
        this.zobristKeys = this.initZobristKey(),   this.currentBoardPostion = 0;

        this.tiles.style.maxWidth = `${50*this.boardSize}px`;
        for(let x = 0;x < this.boardSize;x++) {
            let row = [];
            this.tiles.style.gridTemplateColumns += `${100/this.boardSize}% `;
            this.tiles.style.gridTemplateRows += `${100/this.boardSize}%`;
            for (let y = 0;y < this.boardSize;y++) {

                let square = new Square(x, y);

                if (document.querySelector("#settings").value != "AIvAI") square.setOnClick(() =>turnOrder(square));

                this.tiles.append(square.DOM);
                row.push(square);
            }

            this.matrix.push(row);

        }
    }

    initZobristKey () {
        let array = [];
        for (let x = 0; x < this.boardSize; x++) {
            let row = [];
            for (let y = 0; y < this.boardSize;y++) {
                let row2 = [];
                for (let z = 0; z < 2; z++) {
                    row2.push(Math.floor(Math.random() * 4294967296));
                }
                row.push(row2);
            } 
            array.push(row);  
        }
        return array;
    }

    setSide() {

        this.side = this.side == 'X' ? 'O' : 'X';
    }

    setBlockPlayerInteraction() {

        this.blockPlayerInteraction = this.blockPlayerInteraction == false ? true : false;
    }

    getValueMatrix() {

        return this.matrix.reduce((arr, row) => {

            row = row.reduce((a, c) => {
                a.push(c.value)
                return a;
            }, []);

            arr.push(row);
            return arr;
        }, []);
    }

    getAvailabeSpots() {

        let array = [];

        for (let x = 0;x < this.matrix.length;x++) {
            for (let y = 0;y < this.matrix.length;y++) {
                if (this.matrix[x][y].value == 0) continue;
                for (let i = x - 1;i <= x + 1;i++) {
                    for (let j = y - 1;j <= y + 1;j++) {
                        if (i >= 0 && j >= 0 && i < this.boardSize && j < this.boardSize && this.matrix[i][j].value == 0 && !this.alreadyInIt(array,i,j)){
                            array.push({x:i,y:j});
                        }
                    }
                }
            }
        }

        return array;

    }

    alreadyInIt(array, X, Y) {

        for (let element of array) {
            if (element.x == X && element.y == Y) return true;
        }
        return false;
    }

    getLength(player,x,y,dirX,dirY) {
        if (x < 0 || x >= this.boardSize || y < 0 || y >= this.boardSize) return 0;
        if (this.matrix[x][y].value !== player) return 0;
        return 1 + this.getLength(player, x + dirX, y + dirY, dirX, dirY);
    }

    getMaxLength(player,x,y) {
        if (this.matrix[x][y].value !== player) return 0;
        return Math.max(
            1 + this.getLength(player, x + 1, y, 1, 0) + this.getLength(player, x - 1, y, -1, 0),
            1 + this.getLength(player, x, y + 1, 0, 1) + this.getLength(player, x, y - 1, 0, -1),
            1 + this.getLength(player, x + 1, y + 1, 1, 1) + this.getLength(player, x - 1, y - 1, -1, -1),
            1 + this.getLength(player, x - 1, y + 1, -1, 1) + this.getLength(player, x + 1, y - 1, 1, -1)
        )
    }

    validate(maximizingPlayer = 1) {

        let player = this.side == 'X' ? 1 : -1, maxLength = null;
        this.winner = null;
        this.combo = {
            xw: null,
            uc4: null,
            c4: null,
            uc3: null,
            uc2: null
        };
        switch (document.querySelector("#rules").value) {

            case "Standard":
                for (let x = 0;x < this.matrix.length;x++) {
                    for (let y = 0;y < this.matrix.length;y++) {
                        if (this.matrix[x][y].value != player) continue;
                        maxLength = Math.max(maxLength,this.getMaxLength(player,x,y));
                    }
                }
                switch (true) {
                    case (maxLength >= 3):
                        this.winner = this.side;
                        return 100 * maximizingPlayer;
                    case (maxLength == 2):
                        return 10 * maximizingPlayer;
                    default:
                        return 0;
                }

            case "Gomoku":
                for (let x = 0;x < this.matrix.length;x++) {
                    for (let y = 0;y < this.matrix.length;y++) {
                        this.gomokuCombos(player,x,y);
                    }
                }
                switch (true) {
                    case (this.combo.xw == true):
                        this.winner = this.side;
                        return 10000 * maximizingPlayer;
                    case (this.combo.uc4 == true):
                        return 1000 * maximizingPlayer;
                    case (this.combo.c4 == true):
                        return 500 * maximizingPlayer;    
                    case (this.combo.uc3 == true):
                        return 100 * maximizingPlayer;
                    case (this.combo.uc2 == true):
                        return 10 * maximizingPlayer;
                    default:
                        return 0;
                }

            case "GomokuPro":

                break;

            case "GomokuSwap2":

                break;
        }    
    }
    
    gameStateCheck(winner, aiFunction) {

        if (winner != null) {

            this.isGameActive = false;
            this.winner == 'X' ? document.querySelector("#display").innerHTML = "Player <span class='playerX'>X</span> Won" : document.querySelector("#display").innerHTML = "Player <span class='playerO'>O</span> Won";
        }
        else {

            document.querySelector("#display-player").classList.remove(`player${this.side}`);
            this.setSide();
            document.querySelector("#display-player").classList.add(`player${this.side}`);
            document.querySelector("#display-player").innerText = this.side;

            if (document.querySelector("#settings").value == 'PvAI') {

                this.setBlockPlayerInteraction();
                setTimeout(aiFunction,1000);
            }

            if (!this.getAvailabeSpots().length == 0) return;
            
            this.isGameActive = false;
            document.querySelector("#display").innerHTML = "TIE";
        }
    }

    remove() {

        for (let row of this.matrix) {
            for(let element of row) {
                element.DOM.remove();
            }
        }

        this.tiles.style.gridTemplateColumns = '';
        this.tiles.style.gridTemplateRows = '';

    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    setValueMatrix(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                this.matrix[i][j].value = arr[i][j];
            
            }
        }
    }
    /*zmodyfikowana walidacja z main. tam gdzie tamta walidacja sprawdzała dla tablic bitowych O i X tu zostało to połączone w jedno wykorzystując "player". tam gdzie są puste pola jest sprzwdzane do 0 a przeciwnik to -(player)*/
    gomokuCombos(player,x,y){
        let combo = {};
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y < this.matrix.length){
            if ((this.matrix[x][y].value == player && this.matrix[x + 1][y].value == player && this.matrix[x + 2][y].value == player && this.matrix[x + 3][y].value == player && this.matrix[x + 4][y].value == player)){
                this.combo.xw = true;
            }
        }
        if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 5) {
            if (this.matrix[x][y].value == player && this.matrix[x][y + 1].value == player && this.matrix[x][y + 2].value == player && this.matrix[x][y + 3].value == player && this.matrix[x][y + 4].value == player){
                this.combo.xw = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y <= this.matrix.length - 5){
            if (this.matrix[x][y].value == player && this.matrix[x + 1][y + 1].value == player && this.matrix[x + 2][y + 2].value == player && this.matrix[x + 3][y + 3].value == player && this.matrix[x + 4][y + 4].value == player){
                this.combo.xw = true;
            }
        }
        if (x >= 0 && y >= 4 && x <= this.matrix.length - 5 && y < this.matrix.length){
            if (this.matrix[x][y].value == player && this.matrix[x + 1][y - 1].value == player && this.matrix[x + 2][y - 2].value == player && this.matrix[x + 3][y - 3].value == player && this.matrix[x + 4][y - 4].value == player){
                this.combo.xw = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y < this.matrix.length){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y].value == player && this.matrix[x + 2][y].value == player && this.matrix[x + 3][y].value == player && this.matrix[x + 4][y].value == player && this.matrix[x + 5][y].value == 0){
                this.combo.uc4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 6){
            if (this.matrix[x][y].value == 0 && this.matrix[x][y + 1].value == player && this.matrix[x][y + 2].value == player && this.matrix[x][y + 3].value == player && this.matrix[x][y + 4].value == player && this.matrix[x][y + 5].value == 0){
                this.combo.uc4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y <= this.matrix.length - 6){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y + 1].value == player && this.matrix[x + 2][y + 2].value == player && this.matrix[x + 3][y + 3].value == player && this.matrix[x + 4][y + 4].value == player && this.matrix[x + 5][y + 5].value == 0){
                this.combo.uc4 = true;
            }
        }
        if (x >= 0 && y >= 5 && x <= this.matrix.length - 6 && y < this.matrix.length){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y - 1].value == player && this.matrix[x + 2][y - 2].value == player && this.matrix[x + 3][y - 3].value == player && this.matrix[x + 4][y - 4].value == player && this.matrix[x + 5][y - 5].value == 0){
                this.combo.uc4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y < this.matrix.length){
            if (this.matrix[x][y].value == -(player) && this.matrix[x + 1][y].value == player && this.matrix[x + 2][y].value == player && this.matrix[x + 3][y].value == player && this.matrix[x + 4][y].value == player && this.matrix[x + 5][y].value  == 0){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 6){
            if (this.matrix[x][y].value == -(player) && this.matrix[x][y + 1].value == player && this.matrix[x][y + 2].value == player && this.matrix[x][y + 3].value == player && this.matrix[x][y + 4].value == player && this.matrix[x][y + 5].value  == 0){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y <= this.matrix.length - 6){
            if (this.matrix[x][y].value == -(player) && this.matrix[x + 1][y + 1].value == player && this.matrix[x + 2][y + 2].value == player && this.matrix[x + 3][y + 3].value == player && this.matrix[x + 4][y + 4].value == player && this.matrix[x + 5][y + 5].value  == 0){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 5 && x <= this.matrix.length - 6 && y < this.matrix.length){
            if (this.matrix[x][y].value == -(player) && this.matrix[x + 1][y - 1].value == player && this.matrix[x + 2][y - 2].value == player && this.matrix[x + 3][y - 3].value == player && this.matrix[x + 4][y - 4].value == player && this.matrix[x + 5][y - 5].value  == 0){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y < this.matrix.length){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y].value == player && this.matrix[x + 2][y].value == player && this.matrix[x + 3][y].value == player && this.matrix[x + 4][y].value == player && this.matrix[x + 5][y].value == -(player)){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 6){
            if (this.matrix[x][y].value == 0 && this.matrix[x][y + 1].value == player && this.matrix[x][y + 2].value == player && this.matrix[x][y + 3].value == player && this.matrix[x][y + 4].value == player && this.matrix[x][y + 5].value == -(player)){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y <= this.matrix.length - 6){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y + 1].value == player && this.matrix[x + 2][y + 2].value == player && this.matrix[x + 3][y + 3].value == player && this.matrix[x + 4][y + 4].value == player && this.matrix[x + 5][y + 5].value == -(player)){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 5 && x <= this.matrix.length - 6 && y < this.matrix.length){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y - 1].value == player && this.matrix[x + 2][y - 2].value == player && this.matrix[x + 3][y - 3].value == player && this.matrix[x + 4][y - 4].value == player && this.matrix[x + 5][y - 5].value == -(player)){
                this.combo.c4 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y < this.matrix.length){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y].value == player && this.matrix[x + 2][y].value == player && this.matrix[x + 3][y].value == player && this.matrix[x + 4][y].value == 0){
                this.combo.uc3 = true;
            }
        }
        if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 5){
            if (this.matrix[x][y].value == 0 && this.matrix[x][y + 1].value == player && this.matrix[x][y + 2].value == player && this.matrix[x][y + 3].value == player && this.matrix[x][y + 4].value == 0){
                this.combo.uc3 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y <= this.matrix.length - 5){
            if(this.matrix[x][y].value == 0 && this.matrix[x + 1][y + 1].value == player && this.matrix[x + 2][y + 2].value == player && this.matrix[x + 3][y + 3].value == player && this.matrix[x + 4][y + 4].value == 0){
                this.combo.uc3 = true;
            }
        }
        if (x >= 0 && y >= 4 && x <= this.matrix.length - 5 && y < this.matrix.length){
            if(this.matrix[x][y].value == 0 && this.matrix[x + 1][y - 1].value == player && this.matrix[x + 2][y - 2].value == player && this.matrix[x + 3][y - 3].value == player && this.matrix[x + 4][y - 4].value == 0){
                this.combo.uc3 = true;
            }
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 4 && y < this.matrix.length){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y].value == player && this.matrix[x + 2][y].value == player && this.matrix[x + 3][y].value == 0){
                this.combo.uc2 = true;
            }
        }
        if (x >= 0 && y >= 0 && x < this.matrix.length  && y <= this.matrix.length - 4){
            if (this.matrix[x][y].value == 0 && this.matrix[x][y + 1].value == player && this.matrix[x][y + 2].value == player && this.matrix[x][y + 3].value == 0){
                this.combo.uc2 = true;
            }
            
        }
        if (x >= 0 && y >= 0 && x <= this.matrix.length - 4 && y <= this.matrix.length - 4){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y + 1].value == player && this.matrix[x + 2][y + 2].value == player && this.matrix[x + 3][y + 3].value == 0){
                this.combo.uc2 = true;
            }
            
        }
        if (x >= 0 && y >= 3 && x <= this.matrix.length - 4 && y < this.matrix.length){
            if (this.matrix[x][y].value == 0 && this.matrix[x + 1][y - 1].value == player && this.matrix[x + 2][y - 2].value == player && this.matrix[x + 3][y - 3].value == 0){
                this.combo.uc2 = true;
            }
            
        }
        return combo;
    }
}