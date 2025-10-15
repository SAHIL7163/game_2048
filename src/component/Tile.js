import React from "react";
import "./Tile.css";

const Tile = ({ value }) => {
  return <div className={`tile tile-${value}`}>{value !== 0 ? value : ""}</div>;
};

export default Tile;
