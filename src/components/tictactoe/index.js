import "./game.scss";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Circle from "./circle";
import Cross from "./cross";
import Button from "./Button";
import {
  EffectComposer,
  Bloom,
  SelectiveBloom,
} from "@react-three/postprocessing";

import { Physics, useBox } from "@react-three/cannon";
import Field from "./Board";
import { OrbitControls } from "@react-three/drei";
import Board from "./Board";
import Plane from "./Plane";

function Game() {
  const [player, setPlayer] = useState("circle");
  const [board, setBoard] = useState(new Array(9));
  const [won, setWon] = useState(false);
  const [draw, setDraw] = useState(false);
  const [startReset, setReset] = useState(false);
  // const [hovered, setHover] = useState(true);

  // const [ref, api] = useBox(() => ({ mass: 1 }));

  const lightRef = useRef();
  // const meshRefs = new Array(9).fill(useRef(), 0, 9);

  // useThree(({ camera }) => {
  //   camera.rotation.set(12, 0, 0);
  // });

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

  const chceckWin = (player) => {
    const playerMove = board
      .filter((el) => el.player === player)
      .map((el) => el.boardID);

    const won = WIN_COMBINATIONS.filter((comb) =>
      comb.every((el) => playerMove.includes(el))
    );

    setWon(() => (won.length > 0 ? player : false));
  };

  const checkDraw = () => {
    setDraw(!board.includes(undefined));
  };

  const reset = () => {
    setBoard(new Array(9));
    setWon(false);
    setDraw(false);
  };

  const updateBoard = (e) => {
    // console.log(e.object.boardID);
    // console.log(board);

    if (board[e.object.boardID] || won || draw || startReset) return;
    e.object.player = player;
    setBoard((prev) => {
      prev[e.object.boardID] = e.object;
      return prev;
    });

    chceckWin(player);
    checkDraw();
    setPlayer((prev) => (prev === CIRCLE ? CROSS : CIRCLE));
  };

  const renderPlayer = () => {
    return board.map((el, i) => {
      const { x, y, z } = el.position;
      if (el.player === CIRCLE)
        return <Circle key={i} position={[x, y + 10, z]} />;
      if (el.player === CROSS)
        return <Cross key={i} position={[x, y + 10, z]} />;
      return null;
    });
  };

  return (
    <div className="game">
      <div className="game__board">
        <Canvas camera={{ fov: 110, position: [0, 30, 5] }}>
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
          />
          <pointLight ref={lightRef} position={(10, 10, 10)} />
          <Physics gravity={[0, -50, 0]}>
            <Board
              onClick={updateBoard}
              reset={startReset}
              setReset={setReset}
              clearBoard={reset}
            />
            {renderPlayer()}
            <Plane position={[0, -10, 0]} />
            <Suspense fallback={null}>
              {(won || draw) && (
                <Button
                  lightRef={lightRef}
                  onClick={() => {
                    setReset(!startReset);
                    console.log(startReset);
                  }}
                  position={[0, 25, -2.5]}
                  won={won}
                  draw={draw}
                >
                  RESET
                </Button>
              )}
            </Suspense>
          </Physics>
        </Canvas>
      </div>
    </div>
  );
}

export default Game;
