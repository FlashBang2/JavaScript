class Square{
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.DOM = document.createElement('div');
        this.DOM.classList.add('tile');
        this.value = 0;
        this.Occupied = false;
    }

    setOnClick(OnClickFunction){
        this.DOM.addEventListener('click', OnClickFunction);
    }

    setValue()
    {
        this.value = this.value == 0 ? 1 : 0;
    }

    setOccupied()
    {
        this.Occupied = this.Occupied == false ? true : false;
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