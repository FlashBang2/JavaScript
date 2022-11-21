class Square{
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.DOM = document.createElement('div');
        this.DOM.classList.add('tile');
        this.value = '';
    }

    setOnClick(OnClickFunction)
    {
        this.DOM.addEventListener('click', OnClickFunction);
    }

    getValue()
    {
        return this.value;
    }

    getRow()
    {
        return this.row;
    }
    
    getColumn()
    {
        return this.column;
    }
}