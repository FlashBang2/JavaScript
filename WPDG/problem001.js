function triangleArea(a,b,c)
{
 return a+b>c && b+c>a && c+a>b && a>0 && b>0 && c>0? (Math.round(Math.sqrt((a+b+c)/2*((a+b+c)/2-a)*((a+b+c)/2-b)*((a+b+c)/2-c))*100))/100: -1
}


