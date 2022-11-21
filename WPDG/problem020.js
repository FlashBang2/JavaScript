function compose(...arg)
{
  arg = arg.reverse();
    return function(a){
        for(let i=0;i<arg.length;i++) a=arg[i](a);
        return a;
    }
}