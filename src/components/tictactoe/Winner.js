import { useBox } from "@react-three/cannon";
import React from "react";
import Lamp from "./Lamp";
import Text from "./Text";

function Winner({ position = [0, 0, 0], player = "o", ...props }) {
  const [ref] = useBox(() => ({
    mass: 30,
    position: position,
    ...props,
  }));

  return (
    <group {...props}>
      <group ref={ref}>
        <Text
          size={4}
          position={[5, 0, 5]}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        >
          {player && player.toUpperCase()}
        </Text>

        <Text
          size={4}
          position={[10, 0, 10]}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        >
          WON
        </Text>
      </group>
      {player && (
        <Lamp position={[-205, 80, -20]} angel={Math.PI} intensity={0.85} />
      )}
    </group>
  );
}

export default Winner;
