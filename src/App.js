import React, { useEffect, useState, useRef } from "react";
import Board from "./component/Board";
import { useSwipeable } from "react-swipeable"; 
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
    handleSwipe(e.key);
  };

  const handleSwipe = (direction) => {
    let newGrid;
    switch (direction) {
      case "ArrowLeft": newGrid = moveLeft(gridRef.current); break;
      case "ArrowRight": newGrid = moveRight(gridRef.current); break;
      case "ArrowUp": newGrid = moveUp(gridRef.current); break;
      case "ArrowDown": newGrid = moveDown(gridRef.current); break;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(gridRef.current)) {
      newGrid = addRandomTile(newGrid);
      setGrid([...newGrid]);
      setScore(calculateScore(newGrid));
      if (checkWin(newGrid)) setWin(true);
      else if (checkLose(newGrid)) setGameOver(true);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => !gameOver && !win && handleSwipe("ArrowLeft"),
    onSwipedRight: () => !gameOver && !win && handleSwipe("ArrowRight"),
    onSwipedUp: () => !gameOver && !win && handleSwipe("ArrowUp"),
    onSwipedDown: () => !gameOver && !win && handleSwipe("ArrowDown"),
    preventScrollOnSwipe: true,
    trackMouse: true,
    minSwipeDistance: 10,
  });

  const restartGame = () => {
    let newGrid = addRandomTile(addRandomTile(createEmptyGrid()));
    setGrid([...newGrid]);
    setScore(0);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>2048 Game</h1>
        <p>Score: {score}</p>
        <button onClick={restartGame}>Restart</button>
      </div>
      
      <div
        className="swipe-area"
        {...swipeHandlers}
      >
        <div
          className="board-container"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          ref={boardRef}
        >
          <Board grid={grid} />
        </div>
      </div>

      {win && <div className="message">🎉 You Win!</div>}
      {gameOver && <div className="message">💀 Game Over!</div>}
    </div>
  );
};

export default App;