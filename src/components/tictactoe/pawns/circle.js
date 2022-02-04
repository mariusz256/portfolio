import React from "react";
import { useSphere } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useDrag } from "../helpers/Drag";

function Circle({ mass = 50, position, onContact, ...props }) {
  const [ref] = useSphere(() => ({
    args: [1.8, 64, 64],
    mass: mass,
    position: position,
    linearDamping: 0.95,
    angularDamping: 0.9,
    userData: 2,
    onCollide: (e) => {
      const boardID = e.body.userData.id;
      if (boardID || boardID === 0) ref.current.userData = { boardID: boardID };
      onContact(e, "circle");
    },
  }));
  const texture = useLoader(TextureLoader, "white-wood.jpg");
  const bind = useDrag(ref);

  return (
    <mesh
      castShadow
      ref={ref}
      {...props}
      {...bind}
      // userData={{ boardID: null }}
    >
      <sphereGeometry args={[1.8, 64, 64]} />
      <meshStandardMaterial map={texture} color="white" />
    </mesh>
  );
}

export default Circle;
