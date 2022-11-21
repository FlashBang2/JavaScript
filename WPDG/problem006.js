function divisible(...a)
{
 return (a.map((x)=>a[0]%x).reduce((a,b)=>a+b))==0 ? true : false
}
