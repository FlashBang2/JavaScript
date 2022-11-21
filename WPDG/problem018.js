function reduce(arr, fn, initial)
{
  const iter = Object(this).next ? this : arr.keys(); 
  let item = iter.next();
  if (arguments.length < 3)
  {
        initial = arr[item.value];
        item = iter.next();
  }
  if (item.done) return initial;
    initial = fn(initial, arr[item.value], item.value, arr);
    return reduce.call(iter, arr, fn, initial);
}