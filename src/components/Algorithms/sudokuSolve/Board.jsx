import React from "react";
//import "./sudoku.css";

import Square from "./Square";

function Board({ startGrid, grid, onChange, disabled, popover }) {
  const showSquares = () => {
    const squares = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const index = `${i},${j}`;
        squares.push(
          <Square
            style={
              startGrid[i][j] === 0 ? { color: "red" } : { color: "black" }
            }
            
            value={grid[i][j] === 0 ? "" : grid[i][j]}
            key={index}
            disabled={disabled}
            id={index}
            onChange={onChange}
          />
        );
      }
    }

    return squares;
  };

  return <div className="sudoku-grid shadow">{showSquares()}</div>;
}

export default Board;
