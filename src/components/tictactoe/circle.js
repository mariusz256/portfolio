import React from "react";
import { useSphere } from "@react-three/cannon";
function Circle({ mass = 1, ...props }) {
  const [x, y, z] = props.position;

  const [ref] = useSphere(() => ({
    args: [2.5, 64, 64],
    mass: mass,
    position: [x + 0.5 * Math.random(), y + 0.3 * Math.random(), z],
    // rotation: [0.2 * Math.random(), 0, 0.1 * Math.random()],
  }));
  return (
    <mesh castShadow ref={ref} {...props}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshPhongMaterial color="white" />
    </mesh>
  );
}

export default Circle;
