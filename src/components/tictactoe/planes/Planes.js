import React from "react";
import Floor from "./Floor";
import Plane from "./Plane";

export default function Planes() {
  return (
    <>
      <Plane rotation={[0, 0, 0]} position={[0, 0, -29]} />
      <Plane rotation={[0, -Math.PI / 4, 0]} position={[31, 0, -20]} />
      <Plane rotation={[0, -Math.PI / 2, 0]} position={[33, 0, -20]} />
      <Plane rotation={[0, -Math.PI / 1.2, 0]} position={[43, 0, 5]} />
      <Plane rotation={[0, Math.PI, 0]} position={[-5, 0, 20]} />
      <Plane rotation={[0, Math.PI / 1.6, 0]} position={[-19, 0, 15]} />
      <Plane rotation={[0, Math.PI / 2.9, 0]} position={[-38, 0, 15]} />
      <Floor position={[-500, 0, -500]} />
    </>
  );
}
