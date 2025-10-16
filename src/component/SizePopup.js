import React from 'react';
import './SizePopup.css';

const SizePopup = ({ showSizePopup, handleSizeSelect }) => {
  return (
    showSizePopup && (
      <div className="size-popup">
        <div className="popup-content">
          <h2>Select Board Size</h2>
          <div className="buttons">
            <button onClick={() => handleSizeSelect(4)}>4x4</button>
            <button onClick={() => handleSizeSelect(5)}>5x5</button>
            <button onClick={() => handleSizeSelect(6)}>6x6</button>
          </div>
        </div>
      </div>
    )
  );
};

export default SizePopup;
