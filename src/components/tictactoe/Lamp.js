import React from "react";
import { SpotLight } from "@react-three/drei";

function Lamp(props) {
  return (
    <SpotLight
      castShadow
      penumbra={0.5}
      radiusTop={1}
      radiusBottom={200}
      distance={1000}
      angle={0.95}
      attenuation={10}
      anglePower={20}
      intensity={0.55}
      opacity={0.9}
      {...props}
    />
  );
}

export default Lamp;
