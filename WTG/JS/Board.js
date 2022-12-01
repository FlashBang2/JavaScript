class Board{

    tiles = document.querySelector("#container");

    constructor(boardSize, turnOrder)
    {
        this.matrix = [],                       this.side = document.querySelector('#side').value,  this.isGameActive = true;
        this.blockPlayerInteraction = false,    this.boardSize = boardSize,                         this.winner = null;
        this.value = null;

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
            for (let y = 0;y < this.matrix[0].length;y++) {
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

    validate() {

        switch (document.querySelector("#rules").value) {

            case "Standard":
                
                let element = this.side == 'X' ? 1 : -1;

                if ([].concat(...this.getValueMatrix()).some((e,index,array) =>   index > 1 &&
                                                                                        element === array[index - 2] &&
                                                                                        element === array[index - 1] &&
                                                                                        element === array[index])) { 
                    this.winner = this.side;
                    return 100;
                }
                    
                break;

            case "Gomoku":

                //let winCondition = [1,1,1,1,1]

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

        this.tiles.style.gridTemplateColumns = '';
        this.tiles.style.gridTemplateRows = '';

    }

}