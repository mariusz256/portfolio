import React from "react";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useDrag } from "../helpers/Drag";

function Cross({ mass = 30, position, onContact, ...props }) {
  const [ref] = useBox(() => ({
    args: [3, 3, 3],
    castShadow: true,
    mass: mass,
    position: position,
    ...props,
    linearDamping: 0.9,
    angularDamping: 0.99,
    rotation: [
      (Math.PI / 4) * Math.random() * 15,
      (Math.PI / 4) * Math.random() * 10,
      0,
    ],
    onCollide: (e) => {
      const boardID = e.body.userData.id;
      if (boardID || boardID === 0) ref.current.userData = { boardID: boardID };
      onContact(e, "cross");
    },
  }));

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
