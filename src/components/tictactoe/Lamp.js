import React from "react";
import { SpotLight } from "@react-three/drei";

function Lamp(props) {
  return (
    <SpotLight
      castShadow
      penumbra={1}
      radiusTop={1}
      radiusBottom={110}
      distance={120}
      angle={0.75}
      attenuation={40}
      anglePower={10}
      intensity={0.85}
      opacity={0.8}
      {...props}
    />
  );
}

export default Lamp;
