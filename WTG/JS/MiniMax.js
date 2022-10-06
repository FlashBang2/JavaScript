export const turnAI = () =>{
    
}

let scores = {
    X:1,
    O:-1,
    TIE:0
}

const minimax = (board, depth, isMaximizing) =>{
    if (result !== null) {
        return scores[result];
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (board[i][j] == ''){
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
            return bestScore
        }
    }
}