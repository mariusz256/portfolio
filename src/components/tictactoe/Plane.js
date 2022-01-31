import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import React from "react";

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[10000, 10000]} />
      <MeshReflectorMaterial
        color="#828390"
        blur={[400, 400]}
        resolution={1024}
        mixBlur={0}
        mixStrength={1}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={0}
        opacity={1}
      />
    </mesh>
  );
}

export default Plane;
