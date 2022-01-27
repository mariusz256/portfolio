import "./game.scss";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Circle from "./circle";
import Cross from "./cross";
import Button from "./Button";
import { Physics } from "@react-three/cannon";
import Board from "./Board";
import Plane from "./Plane";
import Lamp from "./Lamp";

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
  const [player, setPlayer] = useState("circle");
  const [board, setBoard] = useState(new Array(9));
  const [won, setWon] = useState(false);
  const [draw, setDraw] = useState(false);
  const [startReset, setReset] = useState(false);
  const [animation, setAnimation] = useState(false);

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
    if (board[e.object.boardID] || won || draw || startReset || animation)
      return;
    e.object.player = player;
    setBoard((prev) => {
      prev[e.object.boardID] = e.object;
      return prev;
    });
    chceckWin(player);
    checkDraw();
    setAnimation(true);
    setPlayer((prev) => (prev === CIRCLE ? CROSS : CIRCLE));
    delay(500).then(() => setAnimation(false));
  };

  const renderPlayer = () => {
    return board.map((el, i) => {
      const { x, y, z } = el.position;
      if (el.player === CIRCLE)
        return <Circle key={i} position={[x, y + 25, z]} args={[4, 4, 4]} />;
      if (el.player === CROSS)
        return <Cross key={i} position={[x, y + 25, z]} args={[4, 4, 4]} />;
      return null;
    });
  };

  return (
    <div className="game">
      <div className="game__board">
        <Canvas camera={{ fov: 50, position: [11, 40, 22] }}>
          {/* <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          /> */}
          <Lamp position={[5, 35, 10]} />
          <Physics gravity={[1, -50, 0]}>
            <Board
              updateBoard={updateBoard}
              reset={startReset}
              setReset={setReset}
              clearBoard={reset}
            />
            {renderPlayer()}
            <Plane position={[0, -10, 0]} />
            <Suspense fallback={null}>
              {(won || draw) && (
                <Button
                  onClick={() => {
                    setReset(true);
                  }}
                  position={[0, 35, -2.5]}
                  children={"RESET"}
                />
              )}
            </Suspense>
          </Physics>
        </Canvas>
      </div>
    </div>
  );
}

export default Game;
