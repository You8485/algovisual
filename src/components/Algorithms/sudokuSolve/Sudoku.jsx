import React from "react";
import "./Sudoku.css";
import { Container } from "react-bootstrap";
import SudokuSolver from "./SudokuSolver";

function Sudoku() {
  return (
    //<Container className="text-center">
    <div>
      <h1 className="mt-3 text-center">Sudoku Solver</h1>
      <div className= "ml-0 mr-5  pl-0 pr-5">
      <span className="mr-3 text-center">
      <SudokuSolver />
      </span>
     </div>
      </div>
    //</Container>
  );
}

export default Sudoku;
