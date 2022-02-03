import React from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useDrag } from "./helpers/Drag";

function Cross({ mass = 30, ...props }) {
  const [ref, api] = useBox(() => ({
    args: [3, 3, 3],
    castShadow: true,
    mass: mass,
    ...props,
    linearDamping: 0.95,
    angularDamping: 1.0,
  }));

  // useFrame(() => {
  //   api.rotation.set(0, 0, 0);
  // });

  const texture = useLoader(TextureLoader, "black-wood.jpg");
  const bind = useDrag(ref);

  return (
    <mesh {...bind} castShadow ref={ref} {...props}>
      <boxBufferGeometry args={[3, 3, 3]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Cross;
