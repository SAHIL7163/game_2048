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
import PausePopup from "./component/PausePopup";
import SizePopup from "./component/SizePopup";

const App = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [paused, setPaused] = useState(false);
  const [boardSize, setBoardSize] = useState(4);
  const [showSizePopup, setShowSizePopup] = useState(true);

  const gridRef = useRef(grid);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    if (!showSizePopup) {
      let newGrid = createEmptyGrid(boardSize);
      addRandomTile(addRandomTile(newGrid));
      setGrid([...newGrid]);
    }
  }, [showSizePopup, boardSize]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  }, [score, highScore]);

  const handleKeyDown = (e) => {
    if (gameOver || win || paused) return;
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    handleSwipe(e.key);
  };

  const handleSwipe = (direction) => {
    if (paused) return;
    let newGrid;
    switch (direction) {
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
      default:
        return;
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
    onSwipedLeft: () =>
      !gameOver && !win && !paused && handleSwipe("ArrowLeft"),
    onSwipedRight: () =>
      !gameOver && !win && !paused && handleSwipe("ArrowRight"),
    onSwipedUp: () => !gameOver && !win && !paused && handleSwipe("ArrowUp"),
    onSwipedDown: () =>
      !gameOver && !win && !paused && handleSwipe("ArrowDown"),
    preventScrollOnSwipe: true,
    trackMouse: true,
    minSwipeDistance: 10,
  });

  const restartGame = () => {
    let newGrid = createEmptyGrid(boardSize);
    addRandomTile(addRandomTile(newGrid));
    setGrid([...newGrid]);
    setScore(0);
    setGameOver(false);
    setWin(false);
    setPaused(false);
  };

  const StartnewGame = () => {
    setShowSizePopup(true);
    setScore(0);
    setGameOver(false);
    setWin(false);
    setPaused(false);
    setGrid([]);
  };

  const handleSizeSelect = (size) => {
    setBoardSize(size);
    setShowSizePopup(false);
  };

  const togglePause = () => {
    setPaused(true);
  };

  const resumeGame = () => {
    setPaused(false);
  };

  return (
    <div className="app">
      <SizePopup
        showSizePopup={showSizePopup}
        handleSizeSelect={handleSizeSelect}
      />

      {!showSizePopup && (
        <>
          <div className="header">
            <h1>2048 Game</h1>
            <div className="scores">
              <p>Score: {score}</p>
              <p>High Score: {highScore}</p>
            </div>
            <div className="buttons">
              <button onClick={restartGame}>Restart</button>
              <button onClick={togglePause}>Pause</button>
            </div>
          </div>

          <div className="swipe-area" {...swipeHandlers}>
            <div
              className="board-container"
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <Board grid={grid} />
            </div>
          </div>

          {win && <div className="message">You Win!</div>}
          {gameOver && <div className="message">Game Over!</div>}
          {paused && (
            <PausePopup onResume={resumeGame} StartnewGame={StartnewGame} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
