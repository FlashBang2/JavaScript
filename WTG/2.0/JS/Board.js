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
        for(let x = 0;x < this.boardSize;x++)
        {
            let row = [];
            let Xrow = [];
            let Orow = [];
            this.tiles.style.gridTemplateColumns += `${100/this.boardSize}% `;
            this.tiles.style.gridTemplateRows += `${100/this.boardSize}%`;
            for (let y = 0;y < this.boardSize;y++)
            {
                let square = new Square(x, y);
                if (document.querySelector("#settings").value != "AIvAI")
                    square.setOnClick(() =>turnOrder(square));
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

    getAvailabeSpots()
    {
        let array = [];
        for (let x = 0;x < this.matrix.length;x++)
        {
            for (let y = 0;y < this.matrix[0].length;y++)
            {
                if (this.matrix[x][y].getValue() != 1) continue;

                //Corners

                if (x == 0 && y == 0)
                {
                    if (this.matrix[x + 1][y + 1].getValue() == 1 || array.includes({x:x + 1, y:y + 1})) continue;
                    array.push({x:x + 1, y: y + 1});
                    if (this.matrix[x + 1][y].getValue() == 1 || array.includes({x:x + 1, y:y})) continue;
                    array.push({x:x + 1, y:y});
                    if (this.matrix[x][y + 1].getValue() == 1 || array.includes({x:x,y:y + 1})) continue;
                    array.push({x:x,y: y + 1});
                }
                if (x == 0 && y == this.matrix.boardSize)
                {
                    if (this.matrix[x + 1][y].getValue() == 1 || array.includes({x:x + 1,y:y})) continue;
                    array.push({x:x + 1,y:y});
                    if (this.matrix[x + 1][y - 1].getValue() == 1 || array.includes({x:x + 1,y: y - 1})) continue;
                    array.push({x:x + 1,y:y - 1});
                    if (this.matrix[x][y - 1].getValue() == 1 || array.includes({x:x,y: y - 1})) continue;
                    array.push({x:x,y:y - 1});
                }
                if (x == this.matrix.boardSize && y == this.matrix.boardSize)
                {
                    if (this.matrix[x - 1][y - 1].getValue() == 1 || array.includes({x:x - 1,y: y - 1})) continue;
                    array.push({x:x - 1, y:y - 1});
                    if (this.matrix[x - 1][y].getValue() == 1 || array.includes({x:x - 1, y:y})) continue;
                    array.push({x:x - 1, y:y});
                    if (this.matrix[x][y - 1].getValue() == 1 || array.includes({x:x, y: y - 1})) continue;
                    array.push({x:x, y:y - 1});
                }
                if (x == this.matri.boardSize && y == 0)
                {
                    if (this.matrix[x - 1][y].getValue() == 1 || array.includes({x:x - 1,y:y})) continue;
                    array.push({x:x - 1, y:y});
                    if (this.matrix[x - 1][y + 1].getValue() == 1 || array.includes({x:x - 1, y:y + 1})) continue;
                    array.push({x:x - 1,y:y + 1});
                    if (this.matrix[x][y + 1].getValue() || array.includes({x:x,y: y + 1})) continue;
                    array.push({x:x,y: y + 1});
                }

                //Borders
                
                if (x == 0 && y > 0 && y < this.matrix.boardSize)
                {
                    if (this.matrix[x][y - 1].getValue() == 1 || array.includes({x:x,y:y - 1})) continue;
                    array.push({x:x,y:y - 1});
                    if (this.matrix[x][y + 1].getValue() == 1 || array.includes({x:x,y:y + 1})) continue;
                    array.push({x:x,y:y + 1});
                    if (this.matrix[x + 1][y].getValue() == 1 || array.includes({x:x + 1,y:y})) continue;
                    array.push({x:x + 1,y:y});
                    if (this.matrix[x + 1][y + 1].getValue() == 1 || array.includes({x:x + 1, y:y + 1})) continue;
                    array.push({x:x + 1, y:y + 1});
                    if (this.matrix[x + 1][y - 1].getValue() == 1 || array.includes({x:x + 1,y:y - 1})) continue;
                    array.push({x:x + 1,y:y - 1});
                }
                if (x > 0 && x < this.matrix.boardSize && y == 0)
                {
                    if (this.matrix[x - 1][y].getValue() == 1 || array.includes({x:x - 1,y:y})) continue;
                    array.push({x:x - 1,y:y});
                    if (this.matrix[x + 1][y].getValue() == 1 || array.includes({x:x + 1,y:y})) continue;
                    array.push({x:x + 1,y:y});
                    if (this.matrix[x][y + 1].getValue() == 1 || array.includes({x:x,y: y + 1})) continue;
                    array.push({x:x,y: y + 1});
                    if (this.matrix[x - 1][y + 1].getValue() == 1 || array.includes({x:x - 1,y:y + 1})) continue;
                    array.push({x:x - 1,y:y + 1});
                    if (this.matrix[x + 1][y + 1].getValue() == 1 || array.includes({x:x + 1,y:y + 1})) continue;
                    array.push({x:x + 1,y:y + 1});
                }
                if (y == this.matrix.boardSize && x > 0 && x < this.matrix.boardSize)
                {
                    if (this.matrix[x - 1][y].getValue() == 1 || array.includes({x:x - 1,y:y})) continue;
                    array.push({x:x - 1,y:y});
                    if (this.matrix[x - 1][y + 1].getValue() == 1 || array.includes({x:x - 1,y:y + 1})) continue;
                    array.push({x:x - 1,y:y + 1});
                    if (this.matrix[x - 1][y - 1].getValue() == 1 || array.includes({x:x - 1,y:y - 1})) continue;
                    array.push({x:x - 1,y:y - 1});
                    if (this.matrix[x][y - 1].getValue() == 1 || array.includes({x:x,y:y - 1})) continue;
                    array.push({x:x,y:y - 1});
                    if (this.matrix[x][y + 1].getValue() == 1 || array.includes({x:x,y:y + 1})) continue;
                    array.push({x:x,y:y + 1});
                }
                if (x == this.matrix.boardSize && y > 0 && y < this.matrix.boardSize)
                {
                    if (this.matrix[x][y - 1].getValue() == 1 || array.includes({x:x,y:y - 1})) continue;
                    array.push({x:x,y:y - 1});
                    if (this.matrix[x + 1][y - 1].getValue() == 1 || array.includes({x:x + 1,y:y - 1})) continue;
                    array.push({x:x + 1,y:y - 1});
                    if (this.matrix[x - 1][y - 1].getValue() == 1 || array.includes({x:x - 1,y:y - 1})) continue;
                    array.push({x:x - 1,y:y - 1});
                    if (this.matrix[x + 1][y].getValue() == 1 || array.includes({x:x + 1,y:y})) continue;
                    array.push({x:x + 1,y:y});
                    if (this.matrix[x - 1][y].getValue() == 1 || array.includes({x:x - 1,y:y})) continue;
                    array.push({x:x - 1,y:y});
                }

                //Inside

                if (x > 0 && x < this.matrix.boardSize && y > 0 && y < this.matrix.boardSize)
                {
                    if (this.matrix[x - 1][y].getValue() == 1 || array.includes({x:x - 1,y:y})) continue;
                    array.push({x:x - 1,y:y});
                    if (this.matrix[x - 1][y + 1].getValue() == 1 || array.includes({x:x - 1,y:y + 1})) continue;
                    array.push({x:x - 1,y:y + 1});
                    if (this.matrix[x - 1][y - 1].getValue() == 1 || array.includes({x:x - 1,y:y - 1})) continue;
                    array.push({x:x - 1,y:y - 1});
                    if (this.matrix[x][y + 1].getValue() == 1 || array.includes({x:x,y:y + 1})) continue;
                    array.push({x:x,y:y + 1});
                    if (this.matrix[x][y - 1].getValue() == 1 || array.includes({x:x,y:y - 1})) continue;
                    array.push({x:x,y:y - 1});
                    if (this.matrix[x + 1][y].getValue() == 1 || array.includes({x:x + 1,y:y})) continue;
                    array.push({x:x + 1,y:y});
                    if (this.matrix[x + 1][y + 1].getValue() == 1 || array.includes({x:x + 1,y:y + 1})) continue;
                    array.push({x:x + 1,y:y + 1});
                    if (this.matrix[x + 1][y - 1].getValue() == 1 || array.includes({x:x + 1,y:y - 1})) continue;
                    array.push({x:x + 1,y:y - 1});
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
                for(let x = 0;x <= this.matrix.length - 3;x++)
                {
                    if ((parseInt(this.Xbits[x].join(""),2) & parseInt(this.Xbits[x + 1].join(""),2) & parseInt(this.Xbits[x + 2].join(""),2)) ||
                        (parseInt(flipedX[x].join(""),2) & parseInt(flipedX[x + 1].join(""),2) & parseInt(flipedX[x + 2].join(""),2)) ||
                        (parseInt(this.Xbits[x].join(''),2) & parseInt(this.Xbits[x + 1].join(''),2) << 1 & parseInt(this.Xbits[x + 2].join(''),2) << 2) ||
                        (parseInt(this.Xbits[x].join(''),2) & parseInt(this.Xbits[x + 1].join(''),2) >> 1 & parseInt(this.Xbits[x + 2].join(''),2) >> 2) != 0)
                        this.winner = 'X';
                    if ((parseInt(this.Obits[x].join(""),2) & parseInt(this.Obits[x + 1].join(""),2) & parseInt(this.Obits[x + 2].join(""),2)) ||
                        (parseInt(flipedO[x].join(""),2) & parseInt(flipedO[x + 1].join(""),2) & parseInt(flipedO[x + 2].join(""),2)) ||
                        (parseInt(this.Obits[x].join(''),2) & parseInt(this.Obits[x + 1].join(''),2) << 1 & parseInt(this.Obits[x + 2].join(''),2) << 2) ||
                        (parseInt(this.Obits[x].join(''),2) & parseInt(this.Obits[x + 1].join(''),2) >> 1 & parseInt(this.Obits[x + 2].join(''),2) >> 2) != 0)
                        this.winner = 'O';
                }
                break;
            case "Gomoku":
                for(let x = 0;x <= this.matrix.length - 5;x++)
                {
                    if ((parseInt(this.Xbits[x].join(""),2) & parseInt(this.Xbits[x + 1].join(""),2) & parseInt(this.Xbits[x + 2].join(""),2) & parseInt(this.Xbits[x + 3].join(""),2) & parseInt(this.Xbits[x + 4].join(""),2)) ||
                        (parseInt(flipedX[x].join(""),2) & parseInt(flipedX[x + 1].join(""),2) & parseInt(flipedX[x + 2].join(""),2) & parseInt(flipedX[x + 3].join(""),2) & parseInt(flipedX[x + 4].join(""),2)) ||
                        (parseInt(this.Xbits[x].join(''),2) & parseInt(this.Xbits[x + 1].join(''),2) << 1 & parseInt(this.Xbits[x + 2].join(''),2) << 2 & parseInt(this.Xbits[x + 3].join(""),2) << 3 & parseInt(this.Xbits[x + 4].join(""),2) << 4) ||
                        (parseInt(this.Xbits[x].join(''),2) & parseInt(this.Xbits[x + 1].join(''),2) >> 1 & parseInt(this.Xbits[x + 2].join(''),2) >> 2 & parseInt(this.Xbits[x + 3].join(""),2) >> 3 & parseInt(this.Xbits[x + 4].join(""),2) >> 4) != 0)
                        this.winner = 'X';
                    if ((parseInt(this.Obits[x].join(""),2) & parseInt(this.Obits[x + 1].join(""),2) & parseInt(this.Obits[x + 2].join(""),2) & parseInt(this.Obits[x + 3].join(""),2) & parseInt(this.Obits[x + 4].join(""),2)) ||
                        (parseInt(flipedO[x].join(""),2) & parseInt(flipedO[x + 1].join(""),2) & parseInt(flipedO[x + 2].join(""),2) & parseInt(flipedO[x + 3].join(""),2) & parseInt(flipedO[x + 4].join(""),2)) ||
                        (parseInt(this.Obits[x].join(''),2) & parseInt(this.Obits[x + 1].join(''),2) << 1 & parseInt(this.Obits[x + 2].join(''),2) << 2 & parseInt(this.Obits[x + 3].join(""),2) << 3 & parseInt(this.Obits[x + 4].join(""),2) << 4) ||
                        (parseInt(this.Obits[x].join(''),2) & parseInt(this.Obits[x + 1].join(''),2) >> 1 & parseInt(this.Obits[x + 2].join(''),2) >> 2 & parseInt(this.Obits[x + 3].join(""),2) >> 3 & parseInt(this.Obits[x + 4].join(""),2) >> 4) != 0)
                        this.winner = 'O';
                }
                break;
            case "GomokuPro":

                break;
            case "GomokuSwap2":

                break;
        } 
    }

    remove()
    {
        for (let row of this.matrix)
        {
            for(let element of row)
            {
                element.DOM.remove();
            }
        }
        this.tiles.style.gridTemplateColumns = '';
        this.tiles.style.gridTemplateRows = '';
    }

}