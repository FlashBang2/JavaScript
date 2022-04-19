function stringRotate(a,b)
{
  return b>=0 && a!="" ? a.slice(b,a.length)+a.slice(0,b):""
}
