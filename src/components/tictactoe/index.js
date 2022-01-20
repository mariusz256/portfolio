import "./game.scss";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Circle from "./circle";
import Cross from "./cross";
import Button from "./Button";
import {
  EffectComposer,
  Bloom,
  SelectiveBloom,
} from "@react-three/postprocessing";

function Game() {
  const [player, setPlayer] = useState("circle");
  const [board, setBoard] = useState(new Array(9));
  const [won, setWon] = useState(false);
  const [draw, setDraw] = useState(false);
  const [hovered, setHover] = useState(true);

  const lightRef = useRef();
  const meshRefs = new Array(9).fill(useRef(), 0, 9);

  //text in three https://codesandbox.io/s/circling-birds-forked-p1wcg?file=/src/App.js

  // useEffect(() => {
  //   document.body.style.cursor = hovered ? "pointer" : "auto";
  // }, [hovered]);

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

    const won = WIN_COMBINATIONS.filter((el) =>
      el.every((i) => playerMove.includes(i))
    );

    setWon(() => (won.length > 0 ? player : false));
  };

  const checkDraw = () => {};

  const updateBoard = (e) => {
    console.log(e.object.position);

    if (e.object.player || won || draw) return;
    e.object.player = player;
    setBoard((prev) => {
      prev[e.object.boardID] = e.object;
      return prev;
    });

    console.log(chceckWin(player));
    setPlayer((prev) => (prev === CIRCLE ? CROSS : CIRCLE));
  };

  const renderPlayer = () => {
    return board.map((el, i) => {
      const { x, y, z } = el.position;
      if (el.player === CIRCLE)
        return <Circle key={i} position={[x, y, z + 1]} />;
      if (el.player === CROSS)
        return <Cross key={i} position={[x, y, z + 1]} />;
      return null;
    });
  };

  const createBoard = () => {
    const board = [];
    for (let i = 0; i < 9; i++) {
      let position;
      if (i < 3) {
        position = [-5 + i * 5.5, 5, -5];
      } else if (i >= 3 && i < 6) {
        position = [-5 + (i - 3) * 5.5, 5 - 5.5, -5];
      } else {
        position = [-5 + (i - 6) * 5.5, 5 - 11, -5];
      }
      board.push(
        <mesh
          ref={meshRefs[i]}
          key={i}
          userData={{ player: "" }}
          onClick={updateBoard}
          position={position}
          name={i}
          player=""
          boardID={i}
        >
          <boxGeometry args={[5, 5, 0.5]} />
          <meshStandardMaterial color="#b20072" />
        </mesh>
      );
    }
    return board;
  };

  console.log(won);

  return (
    <div className="game">
      <div className="game__board">
        <Canvas camera={{ fov: 110, position: [0, 0, 10] }}>
          {/* <ambientLight /> */}
          <pointLight ref={lightRef} position={(10, 10, 10)} />
          {createBoard()}
          {renderPlayer()}
          <Suspense fallback={null}>
            {(won || draw) && (
              <Button
                lightRef={lightRef}
                onClick={() => console.log("click reset")}
                position={[0.5, -0.5, 0]}
              >
                RESET
              </Button>
            )}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Game;
