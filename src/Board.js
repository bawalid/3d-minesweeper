import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { listToMatrix } from "./gameStart";
import Cell from "./Cell";

export default function Board({ squares, handleClick, toggleFlag }) {
  const [board, setBoard] = useState(listToMatrix(squares, 10));
  useFrame(() => setBoard(listToMatrix(squares, 10)));
  return (
    <group position={[1,0,0]}>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            click={handleClick}
            toggleFlag={toggleFlag}
            id={cell.id}
            data={cell.data}
            value={cell.value}
            isChecked={cell.checked}
            isFlag={cell.flag}
            position={[j * 2, 0, i * 2]}
            key={`${cell.id}`}
          />
        ))
      )}
    </group>
  );
}
