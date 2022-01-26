import React from "react";
import { useBox } from "@react-three/cannon";

function Cross(props) {
  const [x, y, z] = props.position;

  const [ref] = useBox(() => ({
    args: [4, 4, 4],
    castShadow: true,
    mass: 1,
    position: [x, y, z],
    rotation: [0.3 * Math.random(), 0, 0.1 * Math.random()],
  }));
  return (
    <mesh castShadow ref={ref} {...props}>
      <boxBufferGeometry args={[4, 4, 4]} />
      <meshLambertMaterial color="green" />
    </mesh>
  );
}

export default Cross;
