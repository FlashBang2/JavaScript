function carry(f){
    let nargs = f.length;
    let vargs = [];
    let curried = (...args) => vargs.push(...args) >= nargs
        ? f(...vargs.slice(0, nargs))
        : curried;

    return curried;
}