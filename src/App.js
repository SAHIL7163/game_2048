import React, { useEffect, useState, useRef } from "react";
import Board from "./component/Board";
import PausePopup from "./component/PausePopup";
import SizePopup from "./component/SizePopup";
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
import "./App.css";

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
      newGrid = addRandomTile(addRandomTile(newGrid));
      setGrid(newGrid);
      setScore(0);
      setGameOver(false);
      setWin(false);
      setPaused(false);
    }
  }, [showSizePopup, boardSize]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  }, [score, highScore]);

  const handleSwipe = (direction) => {
    if (paused || gameOver || win) return;

    let result;
    switch (direction) {
      case "ArrowLeft":
        result = moveLeft(gridRef.current);
        break;
      case "ArrowRight":
        result = moveRight(gridRef.current);
        break;
      case "ArrowUp":
        result = moveUp(gridRef.current);
        break;
      case "ArrowDown":
        result = moveDown(gridRef.current);
        break;
      default:
        return;
    }

    if (result.moved) {
      const newGrid = addRandomTile(result.newBoard);
      setGrid(newGrid);
      setScore((prev) => prev + result.score);

      if (checkWin(newGrid)) setWin(true);
      else if (checkLose(newGrid)) setGameOver(true);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("ArrowLeft"),
    onSwipedRight: () => handleSwipe("ArrowRight"),
    onSwipedUp: () => handleSwipe("ArrowUp"),
    onSwipedDown: () => handleSwipe("ArrowDown"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const handleKey = (e) => {
      const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      if (keys.includes(e.key)) handleSwipe(e.key);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paused, gameOver, win]);

  const restartGame = () => {
    let newGrid = createEmptyGrid(boardSize);
    newGrid = addRandomTile(addRandomTile(newGrid));
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setWin(false);
    setPaused(false);
  };

  const StartNewGame = () => {
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

  const togglePause = () => setPaused(true);
  const resumeGame = () => setPaused(false);

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

          <div className="swipe-area">
            <div {...swipeHandlers} className="board-container">
              <Board grid={grid} />
            </div>
          </div>

          {win && <div className="message">You Win!</div>}
          {gameOver && <div className="message">Game Over!</div>}

          {paused && (
            <PausePopup onResume={resumeGame} StartNewGame={StartNewGame} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
