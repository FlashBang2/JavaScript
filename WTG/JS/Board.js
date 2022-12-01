class Board{

    tiles = document.querySelector("#container");

    constructor(boardSize, turnOrder)
    {
        this.matrix = []; 
        this.side = document.querySelector('#side').value;
        this.isGameActive = true;
        this.blockPlayerInteraction = false;
        this.boardSize = boardSize;
        this.winner = null;
        this.value = null;

        tiles.style.maxWidth = `${50*this.boardSize}px`;
        for(let x = 0;x < this.boardSize;x++) {
            let row = [];
            tiles.style.gridTemplateColumns += `${100/this.boardSize}% `;
            tiles.style.gridTemplateRows += `${100/this.boardSize}%`;
            for (let y = 0;y < this.boardSize;y++) {
                let square = new Square(x, y);
                if (document.querySelector("#settings").value != "AIvAI") square.setOnClick(() =>turnOrder(square));
                tiles.append(square.DOM);
                row.push(square);
            }
            this.matrix.push(row);
        }
    }

    setSide() {
        this.side = this.side == 'X' ? 'O' : 'X';
    }

    setBlockPlayerInteraction() {
        this.blockPlayerInteraction = this.blockPlayerInteraction == false ? true : false;
    }

    getSide() {
        return this.side;
    }

    getMatrix() {
        return this.matrix;
    }

    getWinner() {
        return this.winner;
    }

    getValueMatrix() {
        return this.matrix.reduce((arr, row) => {

            row = row.reduce((a, c) => {
                a.push(c.getValue())
                return a;
            }, []);

            arr.push(row);
            return arr;
        }, []);
    }

    alreadyInIt(array, X, Y) {
        for (let element of array) {
            if (element.x == X && element.y == Y) return true;
        }
        return false;
    }

    getAvailabeSpots() {
        let array = [];
        for (let x = 0;x < this.matrix.length;x++) {
            for (let y = 0;y < this.matrix[0].length;y++) {
                if (this.matrix[x][y].getValue() == 0) continue;
                for (let i = x - 1;i <= x + 1;i++) {
                    for (let j = y - 1;j <= y + 1;j++) {
                        if (i >= 0 && j >= 0 && i < this.boardSize && j < this.boardSize && this.matrix[i][j].getValue() == 0 && !this.alreadyInIt(array,i,j)){
                            array.push({x:i,y:j});
                        }
                    }
                }
            }
        }
        return array;
    }

    validate() {
        switch (document.querySelector("#rules").value) {
            case "Standard":
                break;
            case "Gomoku":
                break;
            case "GomokuPro":
                break;
            case "GomokuSwap2":
                break;
        }    
    }

    remove() {
        for (let row of this.matrix) {
            for(let element of row) {
                element.DOM.remove();
            }
        }
        tiles.style.gridTemplateColumns = '';
        tiles.style.gridTemplateRows = '';
    }
}