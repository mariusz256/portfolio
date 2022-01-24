import React from "react";
import { useBox } from "@react-three/cannon";

function Circle(props) {
  const [x, y, z] = props.position;

  const [ref] = useBox(() => ({
    args: [4, 4, 4],
    mass: 1,
    position: [x, y, z],
    rotation: [0.2 * Math.random(), 0, 0.1 * Math.random()],
  }));
  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry args={[4, 4, 4]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export default Circle;
