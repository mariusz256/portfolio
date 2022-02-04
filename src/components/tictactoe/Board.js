import React, { memo } from "react";
import { useBox } from "@react-three/cannon";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";

const Block = ({
  children,
  transparent = false,
  opacity = 1,
  color = "#ba8c63",
  args = [1, 1, 1],
  id,
  ...props
}) => {
  const [ref] = useBox(() => ({ args: [...props.scale], ...props }));

  const woodTexture = useLoader(TextureLoader, "board.jpg");
  return (
    <mesh ref={ref} receiveShadow castShadow {...props}>
      <boxGeometry args={args} />
      <meshStandardMaterial map={woodTexture} color={color} />
    </mesh>
  );
};

function Board({ gameOver, ...props }) {
  console.log("render board");
  return (
    <>
      <group castShadow receiveShadow position={props.position}>
        <Block position={[0, 1.25, -9]} scale={[18.5, 3, 0.5]} />
        <Block position={[9, 1.25, -6]} scale={[0.5, 3, 5.5]} />
        <Block position={[9, 1.25, -0]} scale={[0.5, 3, 5.5]} />
        <Block position={[9, 1.25, 6]} scale={[0.5, 3, 5.5]} />
        <Block
          userData={{ id: 0 }}
          position={[-6, 0, 6]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block
          userData={{ id: 1 }}
          position={[0, 0, 6]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block
          userData={{ id: 2 }}
          position={[6, 0, 6]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block position={[0, 1.25, -3]} scale={[18.5, 3, 0.5]} />
        <Block position={[3, 1.25, -6]} scale={[0.5, 3, 5.5]} />
        <Block position={[3, 1.25, -0]} scale={[0.5, 3, 5.5]} />
        <Block position={[3, 1.25, 6]} scale={[0.5, 3, 5.5]} />

        <Block
          userData={{ id: 3 }}
          position={[-6, 0, 0]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block
          userData={{ id: 4 }}
          position={[0, 0, 0]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block
          userData={{ id: 5 }}
          position={[6, 0, 0]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block position={[0, 1.25, 3]} scale={[18.5, 3, 0.5]} />
        <Block position={[-3, 1.25, -6]} scale={[0.5, 3, 5.5]} />
        <Block position={[-3, 1.25, -0]} scale={[0.5, 3, 5.5]} />
        <Block position={[-3, 1.25, 6]} scale={[0.5, 3, 5.5]} />

        <Block
          userData={{ id: 6 }}
          position={[-6, 0, -6]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block
          userData={{ id: 7 }}
          position={[0, 0, -6]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block
          userData={{ id: 8 }}
          position={[6, 0, -6]}
          scale={[5.5, 0.5, 5.5]}
        />
        <Block position={[0, 1.25, 9]} scale={[18.5, 3, 0.5]} />
        <Block position={[-9, 1.25, -6]} scale={[0.5, 3, 5.5]} />
        <Block position={[-9, 1.25, -0]} scale={[0.5, 3, 5.5]} />
        <Block position={[-9, 1.25, 6]} scale={[0.5, 3, 5.5]} />
      </group>
    </>
  );
}

export const MemoizedBoard = memo(Board);
