export const createEmptyGrid = (size = 4) => {
  const board = [];
  for (let i = 0; i < size; i++) {
    board.push(Array(size).fill(0));
  }
  return board;
};

export const addRandomTile = (board) => {
  const emptyCells = [];
  const size = board.length;

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

const slideLeft = (row, size) => {
  let newRow = row.filter((val) => val !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }
  newRow = newRow.filter((val) => val !== 0);
  while (newRow.length < size) {
    newRow.push(0);
  }
  return newRow;
};

export const moveLeft = (board) => {
  const size = board.length;
  return board.map((row) => slideLeft([...row], size));
};

export const moveRight = (board) => {
  const size = board.length;
  return board.map((row) => slideLeft([...row].reverse(), size).reverse());
};

export const transpose = (board) => {
  return board[0].map((_, c) => board.map((row) => row[c]));
};

export const moveUp = (board) => {
  const size = board.length;
  const transposed = transpose(board);
  const moved = transposed.map((row) => slideLeft([...row], size));
  return transpose(moved);
};

export const moveDown = (board) => {
  const size = board.length;
  const transposed = transpose(board);
  const moved = transposed.map((row) =>
    slideLeft([...row].reverse(), size).reverse()
  );
  return transpose(moved);
};

export const checkWin = (grid) => grid.some((row) => row.includes(2048));

export const checkLose = (grid) => {
  const size = grid.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) return false;
      if (c < size - 1 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < size - 1 && grid[r][c] === grid[r + 1][c]) return false;
    }
  }
  return true;
};
