import React from "react";
import { useSphere } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { cursor, useDrag } from "./helpers/Drag";

function Circle({ mass = 10, ...props }) {
  const [ref] = useSphere(() => ({
    args: [1.5, 64, 64],
    mass: mass,
    // linearDamping: 0.95,
    angularDamping: 0.9,
    onCollide: (e) => console.log(e.body.userData),
    ...props,
  }));
  const texture = useLoader(TextureLoader, "white-wood.jpg");
  const bind = useDrag(ref);

  return (
    <mesh castShadow ref={ref} {...props} {...bind}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={texture} color="white" />
    </mesh>
  );
}

export default Circle;
