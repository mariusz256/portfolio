import React from "react";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Cross({ mass = 30, ...props }) {
  const [x, y, z] = props.position;

  const [ref] = useBox(() => ({
    args: [4, 4, 4],
    castShadow: true,
    mass: mass,
    position: [x, y, z],
    rotation: [0.3 * Math.random(), 0, 0.1 * Math.random()],
  }));

  const texture = useLoader(TextureLoader, "black-wood.jpg");

  return (
    <mesh onClick={() => console.log(ref)} castShadow ref={ref} {...props}>
      <boxBufferGeometry args={[4, 4, 4]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Cross;
