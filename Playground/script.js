function three(x) {
    return x ? x(3) : 3;
}

function two(x) {
    return x ? x(2) : 2; 
}

function add(x) {
    return (v) => {return x + v}; 
}

function test(e) {
    return e ? e("hello") : console.log(e);
}

function main() {
   console.log(three(add(two())));
}

/* 
1) two() = 2;
2) add(2) = (v) => {return 2 + v};
3) three((v) => {return 2 + v}) = (3) => {return 2 + 3};
4) 5;
*/