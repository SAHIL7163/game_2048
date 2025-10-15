export const GRID_SIZE = 4;

export const createEmptyGrid = (size = GRID_SIZE) => {
  const board = [];
  for (let i = 0; i < size; i++) {
    board.push(Array(size).fill(0));
  }
  return board;
};

export const addRandomTile = (board) => {
  const emptyCells = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) emptyCells.push({ r, c });
    });
  });

  if (emptyCells.length === 0) return board;

  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;

  board[r][c] = newValue;
  return board;
};

const slideLeft = (row) => {
  let newRow = row.filter((val) => val !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }
  newRow = newRow.filter((val) => val !== 0);
  while (newRow.length < GRID_SIZE) {
    newRow.push(0);
  }
  return newRow;
};

export const moveLeft = (board) => {
  return board.map((row) => slideLeft([...row]));
};

export const moveRight = (board) => {
  return board.map((row) => slideLeft([...row].reverse()).reverse());
};

export const transpose = (board) => {
  return board[0].map((_, c) => board.map((row) => row[c]));
};

export const moveUp = (board) => {
  const transposed = transpose(board);
  const moved = transposed.map((row) => slideLeft([...row]));
  return transpose(moved);
};

export const moveDown = (board) => {
  const transposed = transpose(board);
  const moved = transposed.map((row) =>
    slideLeft([...row].reverse()).reverse()
  );
  return transpose(moved);
};

export const checkWin = (grid) => grid.some((row) => row.includes(2048));

export const checkLose = (grid) => {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 0) return false;
      if (c < GRID_SIZE - 1 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < GRID_SIZE - 1 && grid[r][c] === grid[r + 1][c]) return false;
    }
  }
  return true;
};
