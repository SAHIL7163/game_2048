import React from "react";
import "./PausePopup.css";

const PausePopup = ({ onResume, StartnewGame }) => {
  return (
    <div className="pause-popup">
      <div className="popup-content">
        <h2>Game Paused</h2>
        <div className="buttons">
          <button onClick={onResume}>Resume</button>
          <button onClick={StartnewGame}>Start New Game</button>
        </div>
      </div>
    </div>
  );
};

export default PausePopup;
