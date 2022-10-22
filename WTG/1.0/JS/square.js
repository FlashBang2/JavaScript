class Square{
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.DOM = document.createElement('div');
        this.DOM.classList.add('tile'); 
    }

    setOnClick(onClickFunction)
    {
        this.DOM.onclick = onClickFunction;
    }
}