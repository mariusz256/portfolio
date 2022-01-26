import { usePlane } from "@react-three/cannon";
import React from "react";

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 3, 0, 0],
    ...props,
  }));

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  );
}

export default Plane;
