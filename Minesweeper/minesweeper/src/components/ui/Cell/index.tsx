import CellType from "@/types/cell";

  

  // Define Cell component INSIDE MineSweeper, before the return statement
  export const Cell = ({ cell, gameEnded }: { cell: CellType;gameEnded: boolean }) => {
    if (cell.isFlagged && !gameEnded) {
      return (
        <div className="bg-gray-400 h-[25px] w-[25px]  border-t-white border-l-white border-2 border-b-gray-500 border-r-gray-500 flex items-center justify-center">
          🚩
        </div>
      );
    }
    
    if (cell.isRevealed) {
      if (cell.hasBomb && cell.isFlagged && gameEnded) {
        return (
          <div className="bg-green-400 h-[25px] w-[25px] flex items-center justify-center">
            🚩
          </div>
        );
      }
      if (cell.hasBomb) {
        return (
          <div className="bg-red-500 h-[25px] w-[25px] flex items-center justify-center">
            💣
          </div>
        );
      }
      return (
        <div className="bg-gray-500 border-2 border-gray-700 h-[25px] w-[25px] flex items-center justify-center text-black">
          {cell.neighborBombs > 0 ? cell.neighborBombs : ""}
        </div>
      );
    }
    
    return (
      <div className="bg-gray-400 h-[25px] w-[25px] border-t-white border-l-white border-2 border-b-gray-500 border-r-gray-500" />
    );
  };
