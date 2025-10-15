import React, { useEffect, useState } from "react";
import Board from "./component/Board";
import {
  createEmptyGrid,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  checkWin,
  checkLose,
} from "./utils/logic";
import { calculateScore } from "./utils/helpers";

import "./App.css";

const App = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);

  useEffect(() => {
    let newGrid = createEmptyGrid();
    newGrid = addRandomTile(addRandomTile(newGrid));
    setGrid([...newGrid]);
  }, []);

  const handleKeyDown = (event) => {
    if (gameOver) return;

    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();

    let newGrid;
    switch (event.key) {
      case "ArrowUp":
        newGrid = moveUp(grid);
        break;
      case "ArrowDown":
        newGrid = moveDown(grid);
        break;
      case "ArrowLeft":
        newGrid = moveLeft(grid);
        break;
      case "ArrowRight":
        newGrid = moveRight(grid);
        break;
      default:
        return;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      newGrid = addRandomTile(newGrid);
      setGrid([...newGrid]);
      setScore(calculateScore(newGrid));

      if (checkWin(newGrid)) setWin(true);
      else if (checkLose(newGrid)) setGameOver(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, gameOver]);

  const restartGame = () => {
    let newGrid = createEmptyGrid();
    newGrid = addRandomTile(addRandomTile(newGrid));
    setGrid([...newGrid]);
    setScore(0);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="app">
      <h1>2048 Game</h1>
      <p>Score: {score}</p>
      <Board grid={grid} />

      {win && <div className="message">🎉 You Win!</div>}
      {gameOver && <div className="message">💀 Game Over!</div>}

      <button onClick={restartGame}>Restart</button>
    </div>
  );
};

export default App;
