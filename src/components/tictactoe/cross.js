import React from "react";
import { useBox } from "@react-three/cannon";

function Cross({ mass = 1, ...props }) {
  const [x, y, z] = props.position;

  const [ref] = useBox(() => ({
    args: [4, 4, 4],
    castShadow: true,
    mass: mass,
    position: [x, y, z],
    rotation: [0.3 * Math.random(), 0, 0.1 * Math.random()],
  }));

  return (
    <mesh onClick={() => console.log(ref)} castShadow ref={ref} {...props}>
      <boxBufferGeometry args={[4, 4, 4]} />
      <meshPhongMaterial color="black" />
    </mesh>
  );
}

export default Cross;
