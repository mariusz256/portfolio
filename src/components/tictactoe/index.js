import "./game.scss";
import React, { Suspense, useCallback, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Circle from "./circle";
import Cross from "./cross";
import { Physics } from "@react-three/cannon";
import { MemoizedBoard } from "./Board";
import Plane from "./Plane";
import Lamp from "./Lamp";
import { OrbitControls } from "@react-three/drei";

import { Cursor } from "./helpers/Drag";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const CIRCLE = "circle";
const CROSS = "cross";

function Game() {
  const [state, setState] = useState(0);

  return (
    <div className="game">
      <div className="game__board">
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ position: [-40, 40, 40], fov: 25, near: 1, far: 100 }}
        >
          {/* <OrbitControls /> */}
          <Lamp position={[0, 20, 0]} />
          <Physics gravity={[0, -50, 0]}>
            <MemoizedBoard />
            <Plane />
            <Circle position={[0, 2, 12]} />

            <Cross position={[0, 2, -12]} />
            <Cursor />
          </Physics>
        </Canvas>
      </div>
      <button onClick={() => setState((s) => s + 1)}>Add</button>
    </div>
  );
}

export default Game;
