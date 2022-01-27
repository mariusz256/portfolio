import React, { forwardRef, useEffect } from "react";
import { useCompoundBody } from "@react-three/cannon";
import * as THREE from "three";

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

function Board({ updateBoard, reset, setReset, clearBoard, ...props }) {
  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    <group ref={boardRef} castShadow>
      <Block position={[0, 2, -9]} scale={[18.5, 5.5, 0.5]} />
      <Block position={[9, 2, -6]} scale={[0.5, 5.5, 5.5]} />
      <Block position={[9, 2, -0]} scale={[0.5, 5.5, 5.5]} />
      <Block position={[9, 2, 6]} scale={[0.5, 5.5, 5.5]} />
      <Block
        id={0}
        onClick={updateBoard}
        player=""
        position={[-6, 0, 6]}
        scale={[5.5, 1.5, 5.5]}
      />
      <Block
        id={1}
        onClick={updateBoard}
        player=""
        position={[0, 0, 6]}
        scale={[5.5, 1.5, 5.5]}
      />
      <Block
        id={2}
        onClick={updateBoard}
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
        onClick={updateBoard}
        player=""
        position={[-6, 0, 0]}
        scale={[5.5, 1.5, 5.5]}
      />
      <Block
        id={4}
        onClick={updateBoard}
        player=""
        position={[0, 0, 0]}
        scale={[5.5, 1.5, 5.5]}
      />
      <Block
        id={5}
        onClick={updateBoard}
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
        onClick={updateBoard}
        player=""
        position={[-6, 0, -6]}
        scale={[5.5, 1.5, 5.5]}
      />
      <Block
        id={7}
        onClick={updateBoard}
        player=""
        position={[0, 0, -6]}
        scale={[5.5, 1.5, 5.5]}
      />
      <Block
        id={8}
        onClick={updateBoard}
        player=""
        position={[6, 0, -6]}
        scale={[5.5, 1.5, 5.5]}
      />
      <Block position={[0, 2, 9]} scale={[18.5, 5.5, 0.5]} />
      <Block position={[-9, 2, -6]} scale={[0.5, 5.5, 5.5]} />
      <Block position={[-9, 2, -0]} scale={[0.5, 5.5, 5.5]} />
      <Block position={[-9, 2, 6]} scale={[0.5, 5.5, 5.5]} />
    </group>
  );
}

export default Board;
