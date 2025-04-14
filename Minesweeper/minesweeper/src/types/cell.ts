type CellType =  {
    row: number;
    cell: number;
    hasBomb:boolean;
    isRevealed: boolean;
    isFlagged:boolean;
    neighborBombs: number; 
}

export default CellType;