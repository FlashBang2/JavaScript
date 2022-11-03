class Board{
    constructor(boardSize, turnOrder)
    {
        this.matrix = [];
        this.tiles = document.querySelector("#container");
        this.side = document.querySelector('#side').value;
        this.rules = document.querySelector("#rules").value;
        this.winner = null;
        this.isGameStoped = false;
        this.blockPlayerInteraction = false;
        this.availabeMoves = [];
        this.size = boardSize;

        this.tiles.style.maxWidth = `${50*this.size}px`;
        for(let x = 0;x < this.size;x++)
        {
            let row = [];
            this.tiles.style.gridTemplateColumns += `${100/this.size}% `;
            this.tiles.style.gridTemplateRows += `${100/this.sizee}%`;
            for (let y = 0;y < this.size;y++)
            {
                let square = new Square(x, y);
                if (document.querySelector("#settings").value != "AIvAI")
                    square.setOnClick(() =>turnOrder(square));
                this.tiles.append(square.DOM);
                row.push(square);
                this.availabeMoves.push({x,y});
            }
            this.matrix.push(row);
        }
    }

    setSide()
    {
        this.side = this.side == 'X' ? 'O' : 'X';
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

    announceWinner()
    {
        this.isGameStoped = true;
        document.querySelector("#display").innerHTML = `Player <span class = 'player${this.winner}'>${this.winner}</span> Won`;
    }

    gamesContinues()
    {
        document.querySelector("#display-player").classList.remove(`player${this.side}`);
        this.setSide();
        document.querySelector("#display-player").classList.add(`player${this.side}`);
        document.querySelector("#display-player").innerText = this.side;
        if (this.availabeMoves.length != 0) return;
        this.isGameStoped = false;
        document.querySelector("#display").innerHTML = "TIE";
    }

    getLength(x, y, dirX, dirY)
    {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) return 0;
        if (this.matrix[x][y].value !== this.side) return 0;
        return 1 + this.getLength(x + dirX, y + dirY, dirX, dirY);
    }

    getMaxLength(x,y)
    {
        if (this.matrix[x][y].value !== this.side) return 0;
        return Math.max(
            1 + this.getLength(x + 1, y, 1, 0) + this.getLength(x - 1, y, -1, 0),
            1 + this.getLength(x, y + 1, 0, 1) + this.getLength(x, y - 1, 0, -1),
            1 + this.getLength(x + 1, y + 1, 1, 1) + this.getLength(x - 1, y - 1, -1, -1),
            1 + this.getLength(x - 1, y + 1, -1, 1) + this.getLength(x + 1, y - 1, 1, -1)
        );
    }

    validate()
    {   
        let length = 0;
        switch (this.rules)
        {
            case "Standard":
                for (let x = 0; x < this.size; x++)
                {
                    for (let y = 0; y < this.size; y++)
                    {
                        length = this.getMaxLength(x,y);
                        if (length >= 3) return this.side;
                    }
                }
                return null;
            case "Gomoku":
                for (let x = 0; x < this.size; x++)
                {
                    for (let y = 0; y < this.size; y++)
                    {
                        length = this.getMaxLength(x,y);
                        if (length >= 5) return this.side;
                    }
                }
                return null;
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