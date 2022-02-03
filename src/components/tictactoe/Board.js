import React, { forwardRef, memo, useEffect, useState } from "react";
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
      <group castShadow receiveShadow>
        <Block position={[0, 0, -9]} scale={[18.5, 4, 0.5]} />
        <Block position={[9, 0, -6]} scale={[0.5, 4, 5.5]} />
        <Block position={[9, 0, -0]} scale={[0.5, 4, 5.5]} />
        <Block position={[9, 0, 6]} scale={[0.5, 4, 5.5]} />
        <Block userData={0} position={[-6, 0, 6]} scale={[5.5, 0.5, 5.5]} />
        <Block userData={1} position={[0, 0, 6]} scale={[5.5, 0.5, 5.5]} />
        <Block userData={2} position={[6, 0, 6]} scale={[5.5, 0.5, 5.5]} />
        <Block position={[0, 0, -3]} scale={[18.5, 4, 0.5]} />
        <Block position={[3, 0, -6]} scale={[0.5, 4, 5.5]} />
        <Block position={[3, 0, -0]} scale={[0.5, 4, 5.5]} />
        <Block position={[3, 0, 6]} scale={[0.5, 4, 5.5]} />

        <Block userData={3} position={[-6, 0, 0]} scale={[5.5, 0.5, 5.5]} />
        <Block userData={4} position={[0, 0, 0]} scale={[5.5, 0.5, 5.5]} />
        <Block userData={5} position={[6, 0, 0]} scale={[5.5, 0.5, 5.5]} />
        <Block position={[0, 0, 3]} scale={[18.5, 4, 0.5]} />
        <Block position={[-3, 0, -6]} scale={[0.5, 4, 5.5]} />
        <Block position={[-3, 0, -0]} scale={[0.5, 4, 5.5]} />
        <Block position={[-3, 0, 6]} scale={[0.5, 4, 5.5]} />

        <Block userData={6} position={[-6, 0, -6]} scale={[5.5, 0.5, 5.5]} />
        <Block userData={7} position={[0, 0, -6]} scale={[5.5, 0.5, 5.5]} />
        <Block userData={8} position={[6, 0, -6]} scale={[5.5, 0.5, 5.5]} />
        <Block position={[0, 0, 9]} scale={[18.5, 4, 0.5]} />
        <Block position={[-9, 0, -6]} scale={[0.5, 4, 5.5]} />
        <Block position={[-9, 0, -0]} scale={[0.5, 4, 5.5]} />
        <Block position={[-9, 0, 6]} scale={[0.5, 4, 5.5]} />
      </group>
    </>
  );
}

export const MemoizedBoard = memo(Board);
