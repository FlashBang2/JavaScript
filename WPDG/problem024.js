let Stack = {
    arr: [],
    push(a,b=1){
        for(let i=0;i<b-1;i++) this.arr.push(null);
        this.arr.push(a);
    },
    pop(a=1){
        for(let i=0;i<a;i++) {
            let x = this.arr.pop();
            if(i==a-1) return x;
        }
    }
}