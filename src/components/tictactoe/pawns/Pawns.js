import React from "react";
import Circle from "./circle";
import Cross from "./cross";

export default function Pawns({ onContact }) {
  return (
    <>
      <Circle onContact={onContact} position={[1, 2, 12]} />
      <Circle onContact={onContact} position={[3, 5, 12]} />
      <Circle onContact={onContact} position={[5, 8, 12]} />
      <Circle onContact={onContact} position={[7, 11, 12]} />
      <Circle onContact={onContact} position={[10, 14, 12]} />

      <Cross onContact={onContact} position={[-14, 2, -8]} />
      <Cross onContact={onContact} position={[-14, 6, -4]} />
      <Cross onContact={onContact} position={[-14, 10, 0]} />
      <Cross onContact={onContact} position={[-14, 14, 4]} />
      <Cross onContact={onContact} position={[-14, 18, 8]} />
    </>
  );
}
