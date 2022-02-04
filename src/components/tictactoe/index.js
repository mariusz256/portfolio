import "./game.scss";
import React, { Suspense, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { MemoizedBoard } from "./Board";
import Lamp from "./Lamp";
import { OrbitControls } from "@react-three/drei";

import { Cursor } from "./helpers/Drag";
import Pawns from "./pawns/Pawns";
import Planes from "./planes/Planes";

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
  const [game, setGame] = useState({
    board: new Array(9),
  });

  const onContact = useCallback((e, player) => {
    if (Object.keys(e.body.userData).length === 0) return;
    const id = e.body.userData.id;
    return setGame((state) => {
      const newState = { ...state };
      newState.board[id] = player;
      return newState;
    });
  }, []);

  return (
    <div className="game">
      <div className="game__board">
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ position: [-40, 40, 40], fov: 25, near: 1, far: 100 }}
        >
          <Suspense>
            {/* <OrbitControls /> */}
            <Lamp position={[0, 20, 0]} />
            <ambientLight intensity={0.2} />
            <Physics gravity={[0, -50, 0]}>
              <MemoizedBoard />
              <Planes />
              <Pawns onContact={onContact} />
              <Cursor />
            </Physics>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Game;
