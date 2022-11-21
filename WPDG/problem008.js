function magicSequence(a)
{
	return a>1 ?  a>2 ?  a>3 ? magicSequence(a-1)*(a-3) : -2 : -2  : -1
}
