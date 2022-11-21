function reverse(a) 
{
    return function(...b) {
        return a(...b.reverse());
    }
}