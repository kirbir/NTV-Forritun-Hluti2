"use client";

import { useState } from "react";

const BOARD_SIZE = 10;
const BOMB_COUNT = 10;

const recursivelyCountToZero = (startingNumber: number) => {
  console.log(startingNumber);
  if (startingNumber > 0) {
    return recursivelyCountToZero(startingNumber - 1);
  }

  return startingNumber;
};

// Generate bomb positions randomly
const generateBombs = (size: number, count: number) => {
  const bombs: CellType[] = [];
  while (bombs.length < count) {
    const position = Math.floor(Math.random() * size * size);
    if (!bombs.includes(position)) {
      bombs.push(position);
    }
  }

  return bombs;
};

const generateCells = () => {
  const cellArray :CellType[][]= [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowArray:CellType[] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = 0;

      rowArray.push(cell);
    }
    cellArray.push(rowArray);
  }

  return cellArray;
};

const Cell = () => {
  return <div className="bg-gray-400 h-[40px] w-[40px]" />;
};





type CellType = number;

const MineSweeper = () => {
  const [gameBoard, setGameBoard] = useState<CellType[][]>([]);
  const [bombPositions, setBombPositions] = useState<CellType[][]>([]);
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
      window.alert("BOOM, game over you hit a bomb");
      endGame(false);
      window.alert("BOOM, game over you hit a bomb");
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
      {row.map((_, colIndex) => (
        <button
          key={`${rowIndex}, ${colIndex.toString()}`}
          type="button"
          onClick={() => {
            revealCell(colIndex, rowIndex);
          }}
        >
          <Cell />
        </button>
      ))}
    </div>
  );

  // Count bombs around a cell
  const countBombsAround = (row: number, col: number) => {
    let count = 0;

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
  const toggleFlag = (row, col) => {};

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
