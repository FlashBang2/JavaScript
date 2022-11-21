function strangeSum(a, b)
{
  return a==b ? 3*(a+b) : typeof a=="number" && typeof b=="number" && a%1==0 && b%1==0 ? a+b : null
}
