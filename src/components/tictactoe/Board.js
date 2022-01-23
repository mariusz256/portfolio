import React from "react";
import { useBox, usePlane } from "@react-three/cannon";

function Field({ onClick, position, name, player, id }) {
  const [x, y, z] = position;

  const [ref] = useBox(() => ({
    args: [5, 5, 1],
    position: position,
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh
      receiveShadow
      ref={ref}
      onClick={onClick}
      // position={position}
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

  const [ref] = useBox(() => ({
    args: args,
    position: position,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function SmallWall({ position }) {
  const args = [1, 5, 5];

  const [ref] = useBox(() => ({
    args: args,
    position: position,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function Board({ onClick }) {
  return (
    <group>
      <Wall position={[0, 2, -9]} />
      <SmallWall position={[9, 2, -6]} />
      <SmallWall position={[9, 2, -0]} />
      <SmallWall position={[9, 2, 6]} />
      <Field id={0} onClick={onClick} player="" position={[-6, 0, 6]} />
      <Field id={1} onClick={onClick} player="" position={[0, 0, 6]} />
      <Field id={2} onClick={onClick} player="" position={[6, 0, 6]} />
      <Wall position={[0, 2, -3]} />
      <SmallWall position={[3, 2, -6]} />
      <SmallWall position={[3, 2, -0]} />
      <SmallWall position={[3, 2, 6]} />

      <Field id={3} onClick={onClick} player="" position={[-6, 0, 0]} />
      <Field id={4} onClick={onClick} player="" position={[0, 0, 0]} />
      <Field id={5} onClick={onClick} player="" position={[6, 0, 0]} />
      <Wall position={[0, 2, 3]} />
      <SmallWall position={[-3, 2, -6]} />
      <SmallWall position={[-3, 2, -0]} />
      <SmallWall position={[-3, 2, 6]} />

      <Field id={6} onClick={onClick} player="" position={[-6, 0, -6]} />
      <Field id={7} onClick={onClick} player="" position={[0, 0, -6]} />
      <Field id={8} onClick={onClick} player="" position={[6, 0, -6]} />
      <Wall position={[0, 2, 9]} />
      <SmallWall position={[-9, 2, -6]} />
      <SmallWall position={[-9, 2, -0]} />
      <SmallWall position={[-9, 2, 6]} />
    </group>
  );
}

export default Board;
