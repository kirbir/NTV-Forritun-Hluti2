const board = document.getElementById("board");
const gameStatus = document.getElementById("status");
// currentPlayer set as let to be able to toggle between X and O
let currentPlayer = "O";
let playCount = 1;
const gameBoard = Array(9).fill(null);
const cells: HTMLDivElement[] = [];

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function handleClick(index: number) {
  const activeCell = document.getElementById(`cell-${index}`);
console.log(`cell click ${index}`)
console.log(playCount);

  if (currentPlayer == "O") {
    playCount += 1;
    checkWinner();
    activeCell!.innerHTML = "O";
    currentPlayer = "X";
    gameStatus!.innerHTML = "<p>Player X do your move</p>";
    
    
  } else {
    playCount += 1;
    checkWinner();
    activeCell!.innerHTML = "X";
    currentPlayer = "O";
    gameStatus!.innerHTML = "<p>Player O do your move</p>";
  
  }

  if (checkWinner()) {
    const winner = currentPlayer === "O" ? "X" : "O";
    gameStatus!.innerHTML = `<p>Player ${winner} is the winner!</p>`;
 
  }

  // Implement a function that when a cell of index is pressed, fills it with the symbol
  // of the player whose turn it is, and check if there's a winner.
  // If there is no winner, swap player's turn
  console.log(activeCell);
}

function checkWinner() {
  // Loop through the cells and check if any win pattern matches with the board for a single player

  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    const cellA = cells[`${a}`].textContent;
    const cellB = cells[`${b}`].textContent;
    const cellC = cells[`${c}`].textContent;

    if (cellA && cellB && cellC && cellA === cellB && cellB === cellC) {
        // Show the winning pattern
        cells[`${a}`].style.backgroundColor = 'green';
        cells[`${a}`].style.color = 'white';
        cells[`${b}`].style.backgroundColor = 'green';
        cells[`${b}`].style.color = 'white';
        cells[`${c}`].style.backgroundColor = 'green';
        cells[`${c}`].style.color = 'white';
        return true;

    }

    if (playCount === 10) {
      gameStatus!.innerHTML = "It's a TIE! Nobody wins";
    }
  }

  return false;
}

function resetGame() {
    currentPlayer = '0'

    cells.forEach((cell,index) => {
        cell.innerHTML =''
        cell.innerHTML = '';
        cell.style.backgroundColor ='';
        cell.style.color = '';
        // Add new event listener & make clickable for a new game
        cell.addEventListener("click", () => handleClick(index), {once: true});
        
    });

    
  // Reset the board, allowing for a new game to be played
  console.log("New game created");
}

function createBoard() {
  for (let index = 0; index < 9; index++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell-${index}`;
    // Make each cell only clickable once
    cell.addEventListener("click", () => handleClick(index), {once:true});
    board!.appendChild(cell);
    cells.push(cell); // Store reference
    console.log(cell);
  }
  console.log('Board created')
}

createBoard();
