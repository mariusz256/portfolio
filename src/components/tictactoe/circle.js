import React from "react";
import { useSphere } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
function Circle({ mass = 30, ...props }) {
  const [x, y, z] = props.position;
  const [ref] = useSphere(() => ({
    args: [2.5, 64, 64],
    mass: mass,
    position: [x + 0.5, y, z],
    rotation: [(-Math.PI / 2) * Math.random() * 1000, 0, 0],
  }));

  const texture = useLoader(TextureLoader, "white-wood.jpg");

  return (
    <mesh castShadow ref={ref} {...props}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial map={texture} color="white" />
    </mesh>
  );
}

export default Circle;
