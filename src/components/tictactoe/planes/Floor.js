import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import React from "react";

function Floor({ color = "#828390", ...props }) {
  const [ref] = usePlane(() => ({
    args: [2000, 2000],
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh receiveShadow ref={ref} position={props.position}>
      <planeGeometry args={[2000, 2000]} />
      <MeshReflectorMaterial
        color={color}
        blur={[400, 400]}
        resolution={1024}
        mixBlur={0}
        mixStrength={1}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0.2}
        roughness={0}
        opacity={1}
      />
    </mesh>
  );
}

export default Floor;
