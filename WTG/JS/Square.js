class Square{
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.DOM = document.createElement('div');
        this.DOM.classList.add('tile');
        this.value = 0;
    }

    setOnClick(OnClickFunction){
        this.DOM.addEventListener('click', OnClickFunction);
    }

    setValue(player)
    {
        player == 'X' ? this.value = 1 : this.value = -1;
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