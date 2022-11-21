let Vectors = {
    sum(a,b)
    {
        if(a.length !== b.length) return false;
        for(let i = 0; i < a.length; i++) {
            a[i] = a[i] + b[i];
        }
        return a;
    },

    mulByScalar(a,b)
    {
        if(b instanceof Array) return false;
        if(!(a instanceof Array)) return false;
        if(typeof b != 'number') return false;
        for(let i = 0; i < a.length; i++) {
            a[i] = a[i] * b;
        }
        return a;
    }
}