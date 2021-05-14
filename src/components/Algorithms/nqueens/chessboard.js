import _ from "lodash";
// import "./chessboard.css";
import styles from './chessboard.module.css';
import React from "react";
import { useState } from "react";


export const ChessBoard = ({ boardSize, queenPositions = [] }) => 
{
  let ChessBoard = [];
  for (let i = 0; i <= boardSize; i++) {
    let newRow = true;
    for (let j = 0; j <= boardSize; j++) {
      let classNames = [styles.block];
      if (i === 0) {
        classNames.push("chessColumnNumber");
        ChessBoard.push(
          <div className={classNames.join(" ")}>
            <span className="coin">{j - 1 < 0 ? "" : j - 1}</span>
          </div>
        );
        continue;
      }
      if (newRow) {
        classNames.push(styles.clearRow);
        classNames.push("chessColumnNumber");
        newRow = false;
        ChessBoard.push(
          <div className={classNames.join(" ")}>
            <span className={styles.coin}>{i - 1 < 0 ? "" : i - 1}</span>
          </div>
        );
        continue;
      }

      classNames.push(
        (i + j) % 2 === 0 ? styles.chessColumnWhite : styles.chessColumnBlack
      );
      const pos = { x: i - 1, y: j - 1 };
      ChessBoard.push(
        <div key={`check-${i}${j}`} className={classNames.join(" ")}>
          {_.find(queenPositions, pos) ? (
            <span className={styles.coin}>&#x2655;</span>
          ) : (
            <span></span>
          )}
        </div>
      );
    }
  }
  return ChessBoard;
};
