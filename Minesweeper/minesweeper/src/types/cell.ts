type CellType =  {
    row: number;
    col: number;
    hasBomb:boolean;
    isRevealed: boolean;
    isFlagged:boolean;
    neighborBombs: number; 
    disarmed:boolean;
}

export default CellType;