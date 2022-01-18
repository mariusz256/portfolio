import "./game.scss";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Game() {
  const [player, setPlayer] = useState("circle");
  const [move, setMove] = useState(new Array(9));

  const renderPlayer = (e) => {
    e.object.player = player;
    setMove((prev) => {
      prev[e.object.boardID] = e.object.player;
      return prev;
    });
    setPlayer((prev) => (prev === "circle" ? "cross" : "circle"));
  };
  console.log(move);

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
          key={i}
          userData={{ player: "" }}
          onClick={renderPlayer}
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

  return (
    <div className="game">
      <div className="game__board">
        <Canvas camera={{ fov: 110, position: [0, 0, 10] }}>
          {/* <ambientLight /> */}
          <pointLight position={(10, 10, 10)} />
          {createBoard()}
        </Canvas>
      </div>
    </div>
  );
}

export default Game;
