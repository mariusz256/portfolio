import React from "react";
import { SpotLight } from "@react-three/drei";

function Lamp(props) {
  return (
    <SpotLight
      castShadow
      penumbra={1}
      radiusTop={1}
      radiusBottom={110}
      distance={1000}
      angle={0.85}
      attenuation={140}
      anglePower={10}
      intensity={0.55}
      opacity={0.8}
      {...props}
    />
  );
}

export default Lamp;
