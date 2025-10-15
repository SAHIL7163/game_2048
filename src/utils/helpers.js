export const calculateScore = (grid) => {
  return grid.flat().reduce((a, b) => a + b, 0);
};
