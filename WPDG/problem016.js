 function checkUsersValid(goodUsers) 
{
         return function allUsersValid(submittedUsers)
        {
          return submittedUsers.map((x)=>Object.values(x)).flat().every((x)=>goodUsers.map((x)=>Object.values(x)).flat().some((y)=>y==x))
        };
}