import React from "react";
import "./Sudoku.css";
import { FormControl } from "react-bootstrap";

function Square({ id, value, disabled, style, onChange }) {
  return (
    <FormControl
      className="square"
      disabled={disabled}
      maxLength="1"
      id={id}
      type="text"
      onChange={(e) => onChange(e, id)}
      value={value}
      style={style}
    />
  );
}

export default Square;
