const MCS = (board) =>{
    /*  1) Tree Traversal
            UCB1(board) = averageValueOfState + 2 * Math.sqrt(Math.log(N) / n))
            this allows you to decide which action you will choose after certain amount of iteration
            UCB1 calculates max value and the most promising action that will result in victory at any given time
        2) Node Expansion
            How times was it visited n > 0
            if its true that it was visited
            then you need to expand all its child aka actions availabe to take
            after calculation of UCB1 for need created situations you want to move to the highest value
            if not then you would just move out to rollout
        3) Rollout (random simulation)
            Playout of game using random choices
        4) Backpropagation
            Update n values for all nodes leading up to this resolution
            also update t value
    */
}