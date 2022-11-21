function countWords(inputWords) 
{
  return inputWords.reduce(function (x, y) {
  return x[y] ? ++x[y] : x[y] = 1, x
}, {})
}
