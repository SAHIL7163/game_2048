import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const gridRef = useRef(grid);
  const boardRef = useRef(null);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const handleKeyDown = (e) => {
    if (gameOver || win) return;

    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!keys.includes(e.key)) return;

    e.preventDefault();

    let newGrid;
    switch (e.key) {
      case "ArrowLeft":
        newGrid = moveLeft(gridRef.current);
        break;
      case "ArrowRight":
        newGrid = moveRight(gridRef.current);
        break;
      case "ArrowUp":
        newGrid = moveUp(gridRef.current);
        break;
      case "ArrowDown":
        newGrid = moveDown(gridRef.current);
        break;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(gridRef.current)) {
      newGrid = addRandomTile(newGrid);
      setGrid([...newGrid]);
      setScore(calculateScore(newGrid));

      if (checkWin(newGrid)) setWin(true);
      else if (checkLose(newGrid)) setGameOver(true);
    }
  };

  useEffect(() => {
    boardRef.current.focus();
  }, []);

  return (
    <div className="app">
      <h1>2048 Game</h1>
      <p>Score: {score}</p>
      <div
        className="board-container"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={boardRef}
      >
        <Board grid={grid} />
      </div>
      {win && <div className="message">🎉 You Win!</div>}
      {gameOver && <div className="message">💀 Game Over!</div>}
      <button onClick={restartGame}>Restart</button>
    </div>
  );
};
