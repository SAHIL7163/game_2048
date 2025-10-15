import React from "react";
import Tile from "./Tile";
import "./Board.css";

const Board = ({ grid }) => {
  return (
    <div className="board">
      {grid.map((row, i) => (
        <div className="board-row" key={i}>
          {row.map((value, j) => (
            <Tile key={j} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
