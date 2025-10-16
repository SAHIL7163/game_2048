export const createEmptyGrid = (size = 4) =>
  Array.from({ length: size }, () => Array(size).fill(0));

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

  const newBoard = board.map((row) => [...row]);
  newBoard[r][c] = newValue;
  return newBoard;
};

const slideLeftWithScore = (row) => {
  const newRow = row.filter((v) => v !== 0);
  let mergedRow = [];
  let score = 0;

  for (let i = 0; i < newRow.length; i++) {
    if (i + 1 < newRow.length && newRow[i] === newRow[i + 1]) {
      mergedRow.push(newRow[i] * 2);
      score += newRow[i] * 2;
      i++; 
    } else {
      mergedRow.push(newRow[i]);
    }
  }

  while (mergedRow.length < row.length) mergedRow.push(0);

  return { row: mergedRow, score };
};

const boardsEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const moveLeft = (board) => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const { row: newRow, score } = slideLeftWithScore(row);
    totalScore += score;
    return newRow;
  });
  const moved = !boardsEqual(board, newBoard);
  return { newBoard, moved, score: totalScore };
};

export const moveRight = (board) => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const reversed = [...row].reverse();
    const { row: newRow, score } = slideLeftWithScore(reversed);
    totalScore += score;
    return newRow.reverse();
  });
  const moved = !boardsEqual(board, newBoard);
  return { newBoard, moved, score: totalScore };
};

export const transpose = (board) => board[0].map((_, c) => board.map((row) => row[c]));

export const moveUp = (board) => {
  const transposed = transpose(board);
  let totalScore = 0;
  const movedRows = transposed.map((row) => {
    const { row: newRow, score } = slideLeftWithScore(row);
    totalScore += score;
    return newRow;
  });
  const newBoard = transpose(movedRows);
  const moved = !boardsEqual(board, newBoard);
  return { newBoard, moved, score: totalScore };
};

export const moveDown = (board) => {
  const transposed = transpose(board);
  let totalScore = 0;
  const movedRows = transposed.map((row) => {
    const reversed = [...row].reverse();
    const { row: newRow, score } = slideLeftWithScore(reversed);
    totalScore += score;
    return newRow.reverse();
  });
  const newBoard = transpose(movedRows);
  const moved = !boardsEqual(board, newBoard);
  return { newBoard, moved, score: totalScore };
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
