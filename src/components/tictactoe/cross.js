import React from "react";

function Cross(props) {
  return (
    <mesh {...props}>
      <torusGeometry args={[1.5, 0.35, 32, 300]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

export default Cross;
