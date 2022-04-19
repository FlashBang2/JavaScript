 function objectsDiff(a, b)
{
  return Object.keys(a).filter(x => !Object.keys(b).includes(x))
                       .concat(Object.keys(b).filter(x => !Object.keys(a).includes(x)))
}