import React, { forwardRef, useRef, useState } from "react";
import { useBox, useCompoundBody, usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Block = forwardRef(
  (
    {
      children,
      transparent = false,
      opacity = 1,
      color = "white",
      args = [1, 1, 1],
      // onClick,
      // name,
      // player,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <mesh
        ref={ref}
        // rotation={rotation}
        receiveShadow
        // onClick={onClick}
        // name={name}
        // player={player}
        boardID={id}
        {...props}
      >
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);

function Board({ onClick, reset, setReset, clearBoard, ...props }) {
  const [rotation, setRotation] = useState(0);
  // const [position, setPosition] = useState(0);
  const [boardRef, api] = useCompoundBody(() => {
    return {
      // type: "Box",
      shapes: [
        { type: "Box", position: [0, 2, -9], args: [19, 5, 1] },
        { type: "Box", position: [9, 2, -6], args: [1, 5, 5] },
        { type: "Box", position: [9, 2, 0], args: [1, 5, 5] },
        { type: "Box", position: [9, 2, 6], args: [1, 5, 5] },
        {
          type: "Box",
          position: [-6, 0, 6],
          args: [5, 1, 5],
        },
        {
          type: "Box",
          position: [0, 0, 6],
          args: [5, 1, 5],
        },
        {
          type: "Box",
          position: [6, 0, 6],
          args: [5, 1, 5],
        },
        { type: "Box", position: [0, 2, -3], args: [19, 5, 1] },
        { type: "Box", position: [3, 2, -6], args: [1, 5, 5] },
        { type: "Box", position: [3, 2, 0], args: [1, 5, 5] },
        { type: "Box", position: [3, 2, 6], args: [1, 5, 5] },

        {
          type: "Box",
          position: [-6, 0, 0],
          args: [5, 1, 5],
        },
        {
          type: "Box",
          position: [0, 0, 0],
          args: [5, 1, 5],
        },
        {
          type: "Box",
          position: [6, 0, 0],
          args: [5, 1, 5],
        },

        { type: "Box", position: [0, 2, 3], args: [19, 5, 1] },
        { type: "Box", position: [-3, 2, -6], args: [1, 5, 5] },
        { type: "Box", position: [-3, 2, 0], args: [1, 5, 5] },
        { type: "Box", position: [-3, 2, 6], args: [1, 5, 5] },

        {
          type: "Box",
          position: [-6, 0, -6],
          args: [5, 1, 5],
        },
        {
          type: "Box",
          position: [0, 0, -6],
          args: [5, 1, 5],
        },
        {
          type: "Box",
          position: [6, 0, -6],
          args: [5, 1, 5],
        },

        { type: "Box", position: [0, 2, 9], args: [19, 5, 1] },
        { type: "Box", position: [-9, 2, -6], args: [1, 5, 5] },
        { type: "Box", position: [-9, 2, 0], args: [1, 5, 5] },
        { type: "Box", position: [-9, 2, 6], args: [1, 5, 5] },
      ],
      ...props,
    };
  });

  useFrame(() => {
    if (reset && rotation <= Math.PI) {
      setRotation((prev) => (prev += 0.113));
      api.rotation.set(0, 0, rotation);
    }
    if (rotation >= Math.PI && reset) {
      setReset(false);
    } else if (!reset && rotation > 0) {
      api.rotation.set(0, 0, rotation);
      setRotation((prev) => (prev -= 0.06));
    } else if (!reset && rotation !== 0) {
      api.rotation.set(0, 0, 0);
    }
  });

  console.log(boardRef.current);

  return (
    <group ref={boardRef}>
      <Block position={[0, 2, -9]} scale={[19, 5, 1]} />
      <Block position={[9, 2, -6]} scale={[1, 5, 5]} />
      <Block position={[9, 2, -0]} scale={[1, 5, 5]} />
      <Block position={[9, 2, 6]} scale={[1, 5, 5]} />
      <Block
        id={0}
        onClick={onClick}
        player=""
        position={[-6, 0, 6]}
        scale={[5, 1, 5]}
      />
      <Block
        id={1}
        onClick={onClick}
        player=""
        position={[0, 0, 6]}
        scale={[5, 1, 5]}
      />
      <Block
        id={2}
        onClick={onClick}
        player=""
        position={[6, 0, 6]}
        scale={[5, 1, 5]}
      />
      <Block position={[0, 2, -3]} scale={[19, 5, 1]} />
      <Block position={[3, 2, -6]} scale={[1, 5, 5]} />
      <Block position={[3, 2, -0]} scale={[1, 5, 5]} />
      <Block position={[3, 2, 6]} scale={[1, 5, 5]} />

      <Block
        id={3}
        onClick={onClick}
        player=""
        position={[-6, 0, 0]}
        scale={[5, 1, 5]}
      />
      <Block
        id={4}
        onClick={onClick}
        player=""
        position={[0, 0, 0]}
        scale={[5, 1, 5]}
      />
      <Block
        id={5}
        onClick={onClick}
        player=""
        position={[6, 0, 0]}
        scale={[5, 1, 5]}
      />
      <Block position={[0, 2, 3]} scale={[19, 5, 1]} />
      <Block position={[-3, 2, -6]} scale={[1, 5, 5]} />
      <Block position={[-3, 2, -0]} scale={[1, 5, 5]} />
      <Block position={[-3, 2, 6]} scale={[1, 5, 5]} />

      <Block
        id={6}
        onClick={onClick}
        player=""
        position={[-6, 0, -6]}
        scale={[5, 1, 5]}
      />
      <Block
        id={7}
        onClick={onClick}
        player=""
        position={[0, 0, -6]}
        scale={[5, 1, 5]}
      />
      <Block
        id={8}
        onClick={onClick}
        player=""
        position={[6, 0, -6]}
        scale={[5, 1, 5]}
      />
      <Block position={[0, 2, 9]} scale={[19, 5, 1]} />
      <Block position={[-9, 2, -6]} scale={[1, 5, 5]} />
      <Block position={[-9, 2, -0]} scale={[1, 5, 5]} />
      <Block position={[-9, 2, 6]} scale={[1, 5, 5]} />
    </group>
  );
}

export default Board;
