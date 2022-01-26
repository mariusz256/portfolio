import React, { forwardRef, useRef, useState } from "react";
import { useCompoundBody } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { usePhaseAnimation } from "../../hooks/usePhaseAnimation";

const Block = forwardRef(
  (
    {
      children,
      transparent = false,
      opacity = 1,
      color = "white",
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

function Board({ onClick, reset, setReset, clearBoard, ...props }) {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);

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
    if (reset && animationPhase === 0) {
      setRotation((prev) => (prev += 0.113));
      api.rotation.set(0, 0, rotation);
      if (rotation >= Math.PI - 0.1) {
        setAnimationPhase(1);
      }
    } else if (reset && animationPhase === 1) {
      api.position.set(0, position, 0);
      setPosition((prev) => (prev += 0.15));

      if (position >= 7) {
        setAnimationPhase(2);
      }
    } else if (reset && animationPhase === 2) {
      api.position.set(0, position, 0);
      setPosition((prev) => (prev -= 0.2));

      if (position <= 0) {
        setAnimationPhase(3);
      }
    } else if (reset && animationPhase === 3) {
      api.position.set(0, position, 0);
      setPosition((prev) => (prev += 0.2));

      if (position >= 5) {
        setAnimationPhase(4);
      }
    } else if (reset && animationPhase === 4) {
      api.position.set(0, position, 0);
      setPosition((prev) => (prev -= 0.25));

      if (position <= 0) {
        setAnimationPhase(5);
      }
    } else if (reset && animationPhase === 5) {
      api.rotation.set(0, 0, rotation);
      setRotation((prev) => (prev -= 0.1));
      if (rotation <= 0) {
        api.rotation.set(0, 0, 0);
        setReset(false);
        setAnimationPhase(0);
        clearBoard();
      }
    }
  });

  return (
    <group ref={boardRef} castShadow>
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
