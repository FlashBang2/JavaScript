function parametricSort(a, b)
{
	return b=='asc' || b=='desc' ?  b=='asc' ? a.sort((a,b)=>a-b): a.sort((a,b)=>b-a): false
}
