"use client";

import { useState } from "react";
import  CellType from "@/types/cell";

const BOARD_SIZE = 10;
const BOMB_COUNT = 10;


const recursivelyCountToZero = (startingNumber: number) => {
  console.log(startingNumber);
  if (startingNumber == 0) {
    return;
  }

  return recursivelyCountToZero(startingNumber -1);
};

// Generate bomb positions randomly
const generateBombs = (size: number, count: number) => {
  const bombs: number[] = [];
  while (bombs.length < count) {

    const position = Math.floor(Math.random() * size * size);
    if (!bombs.includes(position)) {
      bombs.push(position);
    }
  }

  return bombs;
};

const generateCells = (): CellType[] => {
  const cells: CellType[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell: CellType = {
        row: row,
        cell: col,
        hasBomb: false,      // Initially, no bombs
        isRevealed: false,   // Initially, not revealed
        isFlagged: false,    // Initially, not flagged
        neighborBombs: 0     // Initially, no neighboring bombs
      };
      cells.push(cell);
    }
  }
  return cells;
};









const MineSweeper = () => {
  const [gameBoard, setGameBoard] = useState<CellType[][]>([]);
  const [bombPositions, setBombPositions] = useState<number[]>([]);
  const [gameEnded, setGameEnded] = useState(true);

  const initGame = () => {
    recursivelyCountToZero(2);
    setGameEnded(true);

    setBombPositions(generateBombs(BOARD_SIZE, BOMB_COUNT));

    const cellArray = generateCells();

    setGameBoard(cellArray);
    console.log(cellArray);
    console.log(bombPositions);
  };


  const revealCell = (colIndex: number, rowIndex: number) => {
    const linearIndex = rowIndex * BOARD_SIZE + colIndex;
    console.log(colIndex, rowIndex);
    
    if (bombPositions.includes(linearIndex)) {
      endGame(false);
    }
  };

  const Cell = (flag:boolean) => {
    if (flag) {
      return <div className="bg-red-300 h-[40px] w-[40px]" />;
    } else {
    return <div className="bg-gray-400 h-[40px] w-[40px]" />;
    }
  };

  const CellColumn = ({
    row,
    rowIndex,
  }: {
    row: CellType[];
    rowIndex: number;
  }) => (
    <div className="gap-4 flex flex-row">
      {row.map((cell, colIndex) => (
        <button
          key={`${rowIndex}, ${colIndex.toString()}`}
          type="button"
          onClick={() => {
            revealCell(colIndex, rowIndex);
            console.log(`bombs around the cell: ${countBombsAround(rowIndex, colIndex)}`);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleFlag(colIndex, rowIndex);
          }}
        >
          <Cell cell={cell} />
        </button>
      ))}
    </div>
  );

  // Count bombs around a cell
  const countBombsAround = (row: number, col: number) => {
     let count  =  0;

    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {

          const index = r * BOARD_SIZE + c;
          if (bombPositions.includes(index)) {
            count++;
          }
        }
      }
    }

    return count;
  };

  // "Recursively" reveal all empty cells around a cell with no bombs - see towards the end of recording for explanation
  const revealEmptyCells = (row, col) => {};

  // Toggle flagging on a cell
  const toggleFlag = (colIndex: number, rowIndex: number) => {
    const newBoard = [...gameBoard]; // Create a copy of the board
    const position = rowIndex * BOARD_SIZE + colIndex; // Calculate the position in the flat array
    const cell = newBoard[position]; // Access the specific cell

    if (cell) { // Check if the cell is defined
      cell.isFlagged = !cell.isFlagged; // Toggle the flag state
      setGameBoard(newBoard); // Update the game board state
    } else {
      console.error("Cell not found at position:", position);
    }
  };

  // Reveal all bombs when the game is over
  const revealAllBombs = () => {};

  // Check if the player has won
  const checkWinCondition = () => {};

  // Reset the game
  function resetGame() {
    initGame();
  }

  // End the game (either won or lost)
  const endGame = (won: boolean) => {
    setGameEnded(true);
    if (won) {
      alert("Congratulations, You Win!");
    } else {
      alert("Game Over! You clicked on a bomb!");
      revealAllBombs();
    }
  };

  return (
    <div className="p-20">
      <button
        type="button"
        onClick={initGame}
        className="border border-red-600 p-4 rounded"
      >
        Initialize board
      </button>
      <div className="gap-4 flex flex-col">
        {gameBoard.map((row, rowIndex) => (
          <CellColumn row={row} rowIndex={rowIndex} key={rowIndex.toString()} />
        ))}
      </div>
    </div>
  );
};

export default MineSweeper;
