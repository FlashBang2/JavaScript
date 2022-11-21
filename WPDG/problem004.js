function getTotalNumberOfNewYaersEveSundays(a, b)
{
	var licz=0
	while(a<=b)
	{
		if(new Date(a,0,1).getDay()==0)
		{
			licz++
		}
		a++
	}
	return licz
}
