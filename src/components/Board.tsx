import { useState } from "react";
import Cell from "./Cell";

const Board = ({ cells }: { cells: number[][] }) => {
  return (
    <div>
      {cells.map((row) => {
        return (
          <div className="board-row">
            {row.map((val, idx) => {
              return <Cell type={val}></Cell>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
