import React, { useRef, useState } from "react";
import { useBox, usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Field({ onClick, position, name, player, id }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      onClick={onClick}
      position={position}
      name={name}
      player={player}
      boardID={id}
    >
      <boxGeometry args={[5, 5, 1]} />
      <meshStandardMaterial color="#b20072" />
    </mesh>
  );
}

function Wall({ position }) {
  const args = [19, 5, 1];
  const [ref] = useBox(() => ({ args: args, position: position }));

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function SmallWall({ position }) {
  const args = [1, 5, 5];
  const [ref] = useBox(() => ({ args: args, position: position }));
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function Board({ onClick, reset, setReset, clearBoard }) {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState(0);
  const [boardRef, api] = useBox(() => {
    return {
      type: "Dynamic",
      args: [18, 1, 18],
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

    // if (reset && position <= 15) {
    //   setPosition((prev) => (prev += 1.513));
    //   api.position.set(0, position, 0);
    // }
    // if (position >= 15 && reset) {
    //   setReset(false);
    // } else if (!reset && position > 0) {
    //   api.position.set(0, position, 0);
    //   setPosition((prev) => (prev -= 0.26));
    // } else if (!reset && position !== 0) {
    //   api.position.set(0, 0, 0);
    // }
  });

  return (
    <group ref={boardRef}>
      {/* <Wall position={[0, 2, -9]} />
      <SmallWall position={[9, 2, -6]} />
      <SmallWall position={[9, 2, -0]} />
      <SmallWall position={[9, 2, 6]} /> */}
      <Field id={0} onClick={onClick} player="" position={[-6, 0, 6]} />
      <Field id={1} onClick={onClick} player="" position={[0, 0, 6]} />
      <Field id={2} onClick={onClick} player="" position={[6, 0, 6]} />
      {/* <Wall position={[0, 2, -3]} />
      <SmallWall position={[3, 2, -6]} />
      <SmallWall position={[3, 2, -0]} />
      <SmallWall position={[3, 2, 6]} /> */}

      <Field id={3} onClick={onClick} player="" position={[-6, 0, 0]} />
      <Field id={4} onClick={onClick} player="" position={[0, 0, 0]} />
      <Field id={5} onClick={onClick} player="" position={[6, 0, 0]} />
      {/* <Wall position={[0, 2, 3]} />
      <SmallWall position={[-3, 2, -6]} />
      <SmallWall position={[-3, 2, -0]} />
      <SmallWall position={[-3, 2, 6]} /> */}

      <Field id={6} onClick={onClick} player="" position={[-6, 0, -6]} />
      <Field id={7} onClick={onClick} player="" position={[0, 0, -6]} />
      <Field id={8} onClick={onClick} player="" position={[6, 0, -6]} />
      {/* <Wall position={[0, 2, 9]} />
      <SmallWall position={[-9, 2, -6]} />
      <SmallWall position={[-9, 2, -0]} />
      <SmallWall position={[-9, 2, 6]} /> */}
    </group>
  );
}

export default Board;
