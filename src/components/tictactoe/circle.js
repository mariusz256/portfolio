import React from "react";

function Circle(props) {
  return (
    <mesh {...props}>
      <torusGeometry args={[1.5, 0.35, 32, 300]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export default Circle;
