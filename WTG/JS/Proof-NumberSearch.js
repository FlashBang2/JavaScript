const PNS = (board) =>{
        evaluate( board );
        setProofAndDisproofNumbers( board );
        current = board;
        while ( board.proof != 0 && board.disproof != 0 && resourcesAvailable() ) {
          mostProving = selectMostProvingNode( current );
          expandNode( mostProving );
          current = updateAncestors( mostProving, board );
        }
}