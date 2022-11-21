class Board{
    constructor(boardSize, turnOrder)
    {
        this.matrix = [];
        this.tiles = document.querySelector("#container");
        this.side = document.querySelector('#side').value;
        this.Xbits = [];
        this.Obits = [];
        this.winner = null;
        this.isGameActive = true;
        this.blockPlayerInteraction = false;
        this.boardSize = boardSize;

        this.tiles.style.maxWidth = `${50*this.boardSize}px`;
        for(let x = 0;x < this.boardSize;x++){
            let row = [];
            let Xrow = [];
            let Orow = [];
            this.tiles.style.gridTemplateColumns += `${100/this.boardSize}% `;
            this.tiles.style.gridTemplateRows += `${100/this.boardSize}%`;
            for (let y = 0;y < this.boardSize;y++){
                let square = new Square(x, y);
                if (document.querySelector("#settings").value != "AIvAI") square.setOnClick(() =>turnOrder(square));
                this.tiles.append(square.DOM);
                row.push(square);
                Xrow.push(0);
                Orow.push(0);
            }
            this.matrix.push(row);
            this.Xbits.push(Xrow);
            this.Obits.push(Orow);
        }
    }

    setSide()
    {
        this.side = this.side == 'X' ? 'O' : 'X';
    }

    setBlockPlayerInteraction()
    {
        this.blockPlayerInteraction = this.blockPlayerInteraction == false ? true : false;
    }

    getSide()
    {
        return this.side;
    }

    getMatrix()
    {
        return this.matrix;
    }

    getWinner()
    {
        return this.winner;
    }

    getValueMatrix()
    {
        return this.matrix.reduce((arr, row) => {

            row = row.reduce((a, c) => {
                a.push(c.getValue())
                return a;
            }, []);

            arr.push(row);
            return arr;
        }, []);
    }

    alreadyInIt(array, X, Y)
    {
        for (let element of array){
            if (element.x == X && element.y == Y) return true;
        }
        return false;
    }

    getAvailabeSpots()
    {
        let array = [];
        for (let x = 0;x < this.matrix.length;x++){
            for (let y = 0;y < this.matrix[0].length;y++){
                if (this.matrix[x][y].getValue() == 0) continue;
                for (let i = x - 1;i <= x + 1;i++){
                    for (let j = y - 1;j <= y + 1;j++){
                        if (i >= 0 && j >= 0 && i < this.boardSize && j < this.boardSize && this.matrix[i][j].getValue() == 0 && !this.alreadyInIt(array,i,j)){
                            array.push({x:i,y:j});
                        }
                    }
                }
            }
        }
        return array;
    }

    validate()
    {
        let flipedX = this.Xbits.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])), []);
        let flipedO = this.Obits.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])), []);
        this.winner = null;
        switch (document.querySelector("#rules").value)
        {
            case "Standard":
                for(let x = 0;x <= this.matrix.length - 3;x++){
                    if (this.getSide() == 'X'){
                        if ((parseInt(this.Xbits[x].join(""),2) & parseInt(this.Xbits[x + 1].join(""),2) & parseInt(this.Xbits[x + 2].join(""),2)) ||
                        (parseInt(flipedX[x].join(""),2) & parseInt(flipedX[x + 1].join(""),2) & parseInt(flipedX[x + 2].join(""),2)) ||
                        (parseInt(this.Xbits[x].join(''),2) & parseInt(this.Xbits[x + 1].join(''),2) << 1 & parseInt(this.Xbits[x + 2].join(''),2) << 2) ||
                        (parseInt(this.Xbits[x].join(''),2) & parseInt(this.Xbits[x + 1].join(''),2) >> 1 & parseInt(this.Xbits[x + 2].join(''),2) >> 2) != 0){
                        this.winner = 'X';
                        return 100;
                        }
                    }
                    else{
                        if ((parseInt(this.Obits[x].join(""),2) & parseInt(this.Obits[x + 1].join(""),2) & parseInt(this.Obits[x + 2].join(""),2)) ||
                        (parseInt(flipedO[x].join(""),2) & parseInt(flipedO[x + 1].join(""),2) & parseInt(flipedO[x + 2].join(""),2)) ||
                        (parseInt(this.Obits[x].join(''),2) & parseInt(this.Obits[x + 1].join(''),2) << 1 & parseInt(this.Obits[x + 2].join(''),2) << 2) ||
                        (parseInt(this.Obits[x].join(''),2) & parseInt(this.Obits[x + 1].join(''),2) >> 1 & parseInt(this.Obits[x + 2].join(''),2) >> 2) != 0){
                        this.winner = 'O';
                        return 100;
                        }
                    }   
                }
                return 0;
            case "Gomoku":
                for (let x = 0;x < this.matrix.length;x++){
                    for (let y = 0;y < this.matrix.length;y++){
                        if (this.getSide() == 'X'){
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if ((this.Xbits[x][y] == 1 && this.Xbits[x + 1][y] == 1 && this.Xbits[x + 2][y] == 1 && this.Xbits[x + 3][y] == 1 && this.Xbits[x + 4][y] == 1)){
                                    this.winner = 'X';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 5) {
                                if (this.Xbits[x][y] == 1 && this.Xbits[x][y + 1] == 1 && this.Xbits[x][y + 2] == 1 && this.Xbits[x][y + 3] == 1 && this.Xbits[x][y + 4] == 1){
                                    this.winner = 'X';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y <= this.matrix.length - 5){
                                if (this.Xbits[x][y] == 1 && this.Xbits[x + 1][y + 1] == 1 && this.Xbits[x + 2][y + 2] == 1 && this.Xbits[x + 3][y + 3] == 1 && this.Xbits[x + 4][y + 4] == 1){
                                    this.winner = 'X';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 4 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if (this.Xbits[x][y] == 1 && this.Xbits[x + 1][y - 1] == 1 && this.Xbits[x + 2][y - 2] == 1 && this.Xbits[x + 3][y - 3] == 1 && this.Xbits[x + 4][y - 4] == 1){
                                    this.winner = 'X';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y < this.matrix.length){
                                if (this.matrix[x][y].getValue() == 0 && this.Xbits[x + 1][y] == 1 && this.Xbits[x + 2][y] == 1 && this.Xbits[x + 3][y] == 1 && this.Xbits[x + 4][y] == 1 && this.matrix[x + 5][y].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 6){
                                if (this.matrix[x][y].getValue() == 0 && this.Xbits[x][y + 1] == 1 && this.Xbits[x][y + 2] == 1 && this.Xbits[x][y + 3] == 1 && this.Xbits[x][y + 4] == 1 && this.matrix[x][y + 5].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y <= this.matrix.length - 6){
                                if (this.matrix[x][y].getValue() == 0 && this.Xbits[x + 1][y + 1] == 1 && this.Xbits[x + 2][y + 2] == 1 && this.Xbits[x + 3][y + 3] == 1 && this.Xbits[x + 4][y + 4] == 1 && this.matrix[x + 5][y + 5].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 5 && x <= this.matrix.length - 6 && y < this.matrix.length){
                                if (this.matrix[x][y].getValue() == 0 && this.Xbits[x + 1][y - 1] == 1 && this.Xbits[x + 2][y - 2] == 1 && this.Xbits[x + 3][y - 3] == 1 && this.Xbits[x + 4][y - 4] == 1 && this.matrix[x + 5][y - 5].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if (this.matrix[x][y].getValue() == 0 && this.Xbits[x + 1][y] == 1 && this.Xbits[x + 2][y] == 1 && this.Xbits[x + 3][y] == 1 && this.matrix[x + 4][y].getValue() == 0){
                                    return 100;
                                }
                            }
                            if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 5){
                                if (this.matrix[x][y].getValue() == 0 && this.Xbits[x][y + 1] == 1 && this.Xbits[x][y + 2] == 1 && this.Xbits[x][y + 3] == 1 && this.matrix[x][y + 4].getValue() == 0){
                                    return 100;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y <= this.matrix.length - 5){
                                if(this.matrix[x][y].getValue() == 0 && this.Xbits[x + 1][y + 1] == 1 && this.Xbits[x + 2][y + 2] == 1 && this.Xbits[x + 3][y + 3] == 1 && this.matrix[x + 4][y + 4].getValue() == 0){
                                    return 100;
                                }
                            }
                            if (x >= 0 && y >= 4 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if(this.matrix[x][y].getValue() == 0 && this.Xbits[x + 1][y - 1] == 1 && this.Xbits[x + 2][y - 2] == 1 && this.Xbits[x + 3][y - 3] == 1 && this.matrix[x + 4][y - 4].getValue() == 0){
                                    return 100;
                                }
                            }
                        }
                        else{
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if (this.Obits[x][y] == 1 && this.Obits[x + 1][y] == 1 && this.Obits[x + 2][y] == 1 && this.Obits[x + 3][y] == 1 && this.Obits[x + 4][y] == 1){
                                    console.log('hi');
                                    this.winner = 'O';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 5){
                                if (this.Obits[x][y] == 1 && this.Obits[x][y + 1] == 1 && this.Obits[x][y + 2] == 1 && this.Obits[x][y + 3] == 1 && this.Obits[x][y + 4] == 1){
                                    console.log('hi');
                                    this.winner = 'O';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y <= this.matrix.length - 5){
                                if (this.Obits[x][y] == 1 && this.Obits[x + 1][y + 1] == 1 && this.Obits[x + 2][y + 2] == 1 && this.Obits[x + 3][y + 3] == 1 && this.Obits[x + 4][y + 4] == 1){
                                    console.log('hi');
                                    this.winner = 'O';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 4 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if (this.Obits[x][y] == 1 && this.Obits[x + 1][y - 1] == 1 && this.Obits[x + 2][y - 2] == 1 && this.Obits[x + 3][y - 3] == 1 && this.Obits[x + 4][y - 4] == 1){
                                    console.log('hi');
                                    this.winner = 'O';
                                    return 10000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y < this.matrix.length){
                                if (this.matrix[x][y].getValue() == 0 && this.Obits[x + 1][y] == 1 && this.Obits[x + 2][y] == 1 && this.Obits[x + 3][y] == 1 && this.Obits[x + 4][y] == 1 && this.matrix[x + 5][y].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 6){
                                if (this.matrix[x][y].getValue() == 0 && this.Obits[x][y + 1] == 1 && this.Obits[x][y + 2] == 1 && this.Obits[x][y + 3] == 1 && this.Obits[x][y + 4] == 1 && this.matrix[x][y + 5].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 6 && y <= this.matrix.length - 6){
                                if (this.matrix[x][y].getValue() == 0 && this.Obits[x + 1][y + 1] == 1 && this.Obits[x + 2][y + 2] == 1 && this.Obits[x + 3][y + 3] == 1 && this.Obits[x + 4][y + 4] == 1 && this.matrix[x + 5][y + 5].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 5 && x <= this.matrix.length - 6 && y < this.matrix.length){
                                if (this.matrix[x][y].getValue() == 0 && this.Obits[x + 1][y - 1] == 1 && this.Obits[x + 2][y - 2] == 1 && this.Obits[x + 3][y - 3] == 1 && this.Obits[x + 4][y - 4] == 1 && this.matrix[x + 5][y - 5].getValue() == 0){
                                    return 1000;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if (this.matrix[x][y].getValue() == 0 && this.Obits[x + 1][y] == 1 && this.Obits[x + 2][y] == 1 && this.Obits[x + 3][y] == 1 && this.matrix[x + 4][y].getValue() == 0){
                                    return 100;
                                }
                            }
                            if (x >= 0 && y >= 0 && x < this.matrix.length && y <= this.matrix.length - 5){
                                if (this.matrix[x][y].getValue() == 0 && this.Obits[x][y + 1] == 1 && this.Obits[x][y + 2] == 1 && this.Obits[x][y + 3] == 1 && this.matrix[x][y + 4].getValue() == 0){
                                    return 100;
                                }
                            }
                            if (x >= 0 && y >= 0 && x <= this.matrix.length - 5 && y <= this.matrix.length - 5){
                                if(this.matrix[x][y].getValue() == 0 && this.Obits[x + 1][y + 1] == 1 && this.Obits[x + 2][y + 2] == 1 && this.Obits[x + 3][y + 3] == 1 && this.matrix[x + 4][y + 4].getValue() == 0){
                                    return 100;
                                }
                            }
                            if (x >= 0 && y >= 4 && x <= this.matrix.length - 5 && y < this.matrix.length){
                                if(this.matrix[x][y].getValue() == 0 && this.Obits[x + 1][y - 1] == 1 && this.Obits[x + 2][y - 2] == 1 && this.Obits[x + 3][y - 3] == 1 && this.matrix[x + 4][y - 4].getValue() == 0){
                                    return 100;
                                }
                            }
                        }
                    }
                }
                return 0;
            case "GomokuPro":

                break;
            case "GomokuSwap2":

                break;
        } 
    }

    remove()
    {
        for (let row of this.matrix){
            for(let element of row){
                element.DOM.remove();
            }
        }
        this.tiles.style.gridTemplateColumns = '';
        this.tiles.style.gridTemplateRows = '';
    }

}