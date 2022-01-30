import React, { forwardRef, useEffect, useState } from "react";
import { useCompoundBody } from "@react-three/cannon";
import * as THREE from "three";
import FlyingPoint from "./FlyingPoint";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Block = forwardRef(
  (
    {
      children,
      transparent = false,
      opacity = 1,
      color = "#ba8c63",
      args = [1, 1, 1],
      id,
      ...props
    },
    ref
  ) => {
    return (
      <mesh ref={ref} receiveShadow castShadow boardID={id} {...props}>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);

function Board({
  updateBoard,
  board,
  reset,
  setReset,
  clearBoard,
  player,
  ...props
}) {
  const [hover, setHover] = useState(false);

  // animation on reset
  useEffect(() => {
    if (reset) {
      api.rotation.subscribe((r) =>
        api.rotation.set(0, 0, THREE.MathUtils.lerp(r[2], Math.PI, 0.05))
      );

      api.position.subscribe((p) =>
        api.position.set(0, THREE.MathUtils.lerp(p[1], 15, 0.05), 0)
      );

      delay(2000)
        .then(() => setReset(false))
        .then(() => delay(1500))
        .then(clearBoard);
    } else {
      api.rotation.subscribe((r) =>
        api.rotation.set(0, 0, THREE.MathUtils.lerp(r[2], 0, 0.05))
      );

      api.position.subscribe((p) =>
        api.position.set(0, THREE.MathUtils.lerp(p[1], 0, 0.05), 0)
      );
    }
    return () => {};
  }, [reset]);

  // hover field in board
  const handleHover = (e) => {
    setHover(e.object);
  };

  const getHoverObjPos = (obj) => {
    const { x, y, z } = obj.position;
    return [x, y, z];
  };

  const [boardRef, api] = useCompoundBody(() => {
    return {
      // type: "Box",
      shapes: [
        { type: "Box", position: [0, 2, -9], args: [18.5, 5.5, 0.5] },
        { type: "Box", position: [9, 2, -6], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [9, 2, 0], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [9, 2, 6], args: [0.5, 5.5, 5.5] },
        {
          type: "Box",
          position: [-6, 0, 6],
          args: [5.5, 1.5, 5.5],
        },
        {
          type: "Box",
          position: [0, 0, 6],
          args: [5.5, 1.5, 5.5],
        },
        {
          type: "Box",
          position: [6, 0, 6],
          args: [5.5, 1.5, 5.5],
        },
        { type: "Box", position: [0, 2, -3], args: [18.5, 5.5, 0.5] },
        { type: "Box", position: [3, 2, -6], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [3, 2, 0], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [3, 2, 6], args: [0.5, 5.5, 5.5] },

        {
          type: "Box",
          position: [-6, 0, 0],
          args: [5.5, 1.5, 5.5],
        },
        {
          type: "Box",
          position: [0, 0, 0],
          args: [5.5, 1.5, 5.5],
        },
        {
          type: "Box",
          position: [6, 0, 0],
          args: [5.5, 1.5, 5.5],
        },

        { type: "Box", position: [0, 2, 3], args: [18.5, 5.5, 0.5] },
        { type: "Box", position: [-3, 2, -6], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [-3, 2, 0], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [-3, 2, 6], args: [0.5, 5.5, 5.5] },

        {
          type: "Box",
          position: [-6, 0, -6],
          args: [5.5, 1.5, 5.5],
        },
        {
          type: "Box",
          position: [0, 0, -6],
          args: [5.5, 1.5, 5.5],
        },
        {
          type: "Box",
          position: [6, 0, -6],
          args: [5.5, 1.5, 5.5],
        },

        { type: "Box", position: [0, 2, 9], args: [18.5, 5.5, 0.5] },
        { type: "Box", position: [-9, 2, -6], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [-9, 2, 0], args: [0.5, 5.5, 5.5] },
        { type: "Box", position: [-9, 2, 6], args: [0.5, 5.5, 5.5] },
      ],
      ...props,
    };
  });

  return (
    <>
      <group ref={boardRef} castShadow receiveShadow>
        <Block position={[0, 2, -9]} scale={[18.5, 5.5, 0.5]} />
        <Block position={[9, 2, -6]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[9, 2, -0]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[9, 2, 6]} scale={[0.5, 5.5, 5.5]} />
        <Block
          id={0}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[-6, 0, 6]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block
          id={1}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[0, 0, 6]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block
          id={2}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[6, 0, 6]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block position={[0, 2, -3]} scale={[18.5, 5.5, 0.5]} />
        <Block position={[3, 2, -6]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[3, 2, -0]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[3, 2, 6]} scale={[0.5, 5.5, 5.5]} />

        <Block
          id={3}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[-6, 0, 0]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block
          id={4}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[0, 0, 0]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block
          id={5}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[6, 0, 0]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block position={[0, 2, 3]} scale={[18.5, 5.5, 0.5]} />
        <Block position={[-3, 2, -6]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[-3, 2, -0]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[-3, 2, 6]} scale={[0.5, 5.5, 5.5]} />

        <Block
          id={6}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[-6, 0, -6]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block
          id={7}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[0, 0, -6]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block
          id={8}
          onPointerOver={handleHover}
          onClick={(e) => {
            updateBoard(e);
            setHover(false);
          }}
          // onPointerOut={(e) => setHover(false)}
          player=""
          position={[6, 0, -6]}
          scale={[5.5, 1.5, 5.5]}
        />
        <Block position={[0, 2, 9]} scale={[18.5, 5.5, 0.5]} />
        <Block position={[-9, 2, -6]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[-9, 2, -0]} scale={[0.5, 5.5, 5.5]} />
        <Block position={[-9, 2, 6]} scale={[0.5, 5.5, 5.5]} />
      </group>
      {hover && !board[hover?.boardID] && (
        <FlyingPoint player={player} position={getHoverObjPos(hover)} />
      )}
    </>
  );
}

export default Board;
