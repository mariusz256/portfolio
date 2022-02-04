import { useBox } from "@react-three/cannon";
import React from "react";
import Lamp from "../Lamp";
import Text from "./Text";

function Draw({ position = [0, 0, 0], draw, ...props }) {
  const [ref] = useBox(() => ({
    mass: 20,
    position: position,
    ...props,
  }));

  return (
    <group {...props}>
      <group ref={ref}>
        <Text
          size={4}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        >
          DRAW
        </Text>

        <Text
          size={4}
          position={[5, 0, 5]}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        >
          TRY
        </Text>

        <Text
          size={4}
          position={[10, 0, 10]}
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        >
          AGAIN
        </Text>
      </group>
      <Lamp position={[-205, 80, -20]} angel={Math.PI} intensity={0.85} />
    </group>
  );
}

export default Draw;
