function getShortMessages(messages)
{
  return messages.filter((x)=>x.message.length<=50).map((x)=>Object.values(x)).flat()
}