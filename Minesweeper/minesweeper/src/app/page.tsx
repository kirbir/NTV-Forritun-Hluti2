"use client";

import { useEffect, useRef, useState } from "react";
import CellType from "@/types/cell";
import StopWatch from "@/components/Stopwatch";
import LEVELS from "@/constants/settings";
import { Cell } from "@/components/ui/Cell";
import Confetti from "@/components/ui/Confetti";

const MineSweeper = () => {
  // 1. Game Level and Constants
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameLevel, setGameLevel] = useState<keyof typeof LEVELS>("NORMAL");
  const { BOARD_SIZE, BOMB_COUNT, FLAG_COUNT } = LEVELS[gameLevel];
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  function generateCells(): CellType[][] {
    const board: CellType[][] = [];

    // Create empty board
    for (let row = 0; row < BOARD_SIZE; row++) {
      const currentRow: CellType[] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        currentRow.push({
          row,
          col,
          hasBomb: false,
          isRevealed: false,
          isFlagged: false,
          neighborBombs: 0,
          disarmed: false,
        });
      }
      board.push(currentRow);
    }

    // Place bombs
    let bombsPlaced = 0;
    while (bombsPlaced < BOMB_COUNT) {
      const randomRow = Math.floor(Math.random() * BOARD_SIZE);
      const randomCol = Math.floor(Math.random() * BOARD_SIZE);
      if (!board[randomRow][randomCol].hasBomb) {
        board[randomRow][randomCol].hasBomb = true;
        bombsPlaced++;
      }
    }

    // Calculate neighbor bombs
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!board[row][col].hasBomb) {
          let bombCount = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;
              if (
                newRow >= 0 &&
                newRow < BOARD_SIZE &&
                newCol >= 0 &&
                newCol < BOARD_SIZE &&
                board[newRow][newCol].hasBomb
              ) {
                bombCount++;
              }
            }
          }
          board[row][col].neighborBombs = bombCount;
        }
      }
    }
    return board;
  }

  // 3. State Declarations (after helper functions)
  const [gameBoard, setGameBoard] = useState<CellType[][]>(generateCells);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStatus, setGameStatus] = useState("");
  const [totalDisarmed, setTotalDisarmed] = useState(0);
  const [availableFlags, setAvailableFlags] = useState<number>(10);
  const stopwatchRef = useRef<{ start: () => void; stop: () => void }>(null);

  // 4. Game Logic Functions
  function revealAllBombs() {
    setGameBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (newBoard[row][col].hasBomb) {
            newBoard[row][col].isRevealed = true;
          }
        }
      }
      console.log(`Total disarmed is: ${totalDisarmed}`);
      return newBoard;
    });
  }

  useEffect(() => {
    const countDisarmedBombs = () => {
      let disarmedCount = 0;
      const currentBoardSize = LEVELS[gameLevel].BOARD_SIZE;
      for (let row = 0; row < currentBoardSize; row++) {
        for (let col = 0; col < currentBoardSize; col++) {
          if (gameBoard[row][col].hasBomb && gameBoard[row][col].isFlagged) {
            disarmedCount++;

            console.log(`counting disarmed is now: ${disarmedCount}`);
          }
        }
      }
      return disarmedCount;
    };

    const newCount = countDisarmedBombs();
    console.log(`Newcount var is: ${newCount}`);
    const currentBombCount = LEVELS[gameLevel].BOMB_COUNT;
    setTotalDisarmed(newCount);
    console.log(`totalDisarmed is: ${totalDisarmed}`);

    if (newCount === currentBombCount && !gameEnded) {
      endGame(newCount);
    }
  }, [gameBoard, endGame, gameLevel]);


  function endGame(currentCount = totalDisarmed) {
    setGameEnded(true);
    stopwatchRef.current?.stop();
    revealAllBombs();

    if (currentCount === BOMB_COUNT) {
      setIsConfettiVisible(true);
      setGameStatus(
        `😎YOU WIN!! You disarmed ALL bombs: ${currentCount} out of ${BOMB_COUNT}😎`
      );
    } else {
      setGameStatus(
        `Game Over!! You disarmed ${totalDisarmed} out of ${BOMB_COUNT}`
      );
    }
  }

  function toggleFlag(colIndex: number, rowIndex: number) {
    if (gameEnded) return;

    const newBoard = gameBoard.map((row) => [...row]);
    const cell = newBoard[rowIndex][colIndex];

    if (cell) {
      if (!cell.isFlagged && availableFlags === 0) {
        return;
      }

      cell.isFlagged = !cell.isFlagged;
      setGameBoard(newBoard);

      if (cell.isFlagged) {
        setAvailableFlags((prev) => (prev - 1) as typeof FLAG_COUNT);
      } else {
        setAvailableFlags((prev) => (prev + 1) as typeof FLAG_COUNT);
      }
    }
  }

  function revealCell(colIndex: number, rowIndex: number) {
    if (
      gameEnded ||
      gameBoard[rowIndex][colIndex].isRevealed ||
      gameBoard[rowIndex][colIndex].isFlagged
    ) {
      return;
    }

    const newBoard = gameBoard.map((row) => [...row]);

    if (newBoard[rowIndex][colIndex].hasBomb) {
      endGame();
      return;
    }

    function revealAdjacentCells(row: number, col: number) {
      if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
        return;
      }

      const cell = newBoard[row][col];
      if (cell.isRevealed || cell.isFlagged || cell.hasBomb) {
        return;
      }

      cell.isRevealed = true;

      if (cell.neighborBombs === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            revealAdjacentCells(row + i, col + j);
          }
        }
      }
    }

    revealAdjacentCells(rowIndex, colIndex);
    setGameBoard(newBoard);
  }

  function initGame() {
    const newBoard = generateCells();
    setGameBoard(newBoard);
    setGameEnded(false);
    setGameStatus("");
    setTotalDisarmed(0);
    setIsConfettiVisible(false);
    setAvailableFlags(FLAG_COUNT);
    stopwatchRef.current?.start();
  }

  return (
    <div className="flex flex-col p-20 justify-center items-center">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-[length:200%] animate-[gradientMove_6s_ease-in-out_infinite]">
        MEINE-SWEEPAH
      </h1>
      <div className="border-2 p-4 m-2 to-red-950 border-dashed">
        <StopWatch ref={stopwatchRef} />
      </div>
      <div>
        <h1 className="animate-spin"></h1>
        <h1 className="m-2 text-3xl animate-pulse ease-in-out transition-opacity transform-fill fill-amber-300">{gameStatus}</h1>
      </div>
      <div className="flex flex-row p-5 gap-4 items-center">
        <button
          type="button"
          onClick={initGame}
          className=" bg-red-600 hover:border-red-100 hover:border-2 p-4 rounded cursor-crosshair"
        >
          New Game
        </button>
        <p className="text-2xl">🚩</p>
        <p className="border-2 border-red-600 p-3 rounded">
          {availableFlags}
        </p>
      </div>

      {isConfettiVisible && <Confetti />}

      {/* render the gameBoard */} 
      <div className="gap-0 flex flex-col ">
        {gameBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="gap-0 flex flex-row ">
            {row.map((cell, colIndex) => (
              <button
              className="hover:cursor-cell"
                key={`${rowIndex},${colIndex}`}
                type="button"
                onClick={() => revealCell(colIndex, rowIndex)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFlag(colIndex, rowIndex);
                }}
              >
                <Cell cell={cell} gameEnded={gameEnded} />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MineSweeper;
