import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

function FlyingPoint({ position, player, color = 0xfff1ef }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.getElapsedTime()) + 3.5;
  });

  return (
    <group ref={ref} position={position}>
      {player === "circle" ? (
        <Sphere color={color} />
      ) : (
        <Cube color={"#08050D"} />
      )}
      {/* <pointLight intensity={0.1} /> */}
    </group>
  );
}

export default FlyingPoint;

const Sphere = ({ color }) => {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 30, 30]} attach="geometry" />
      <meshBasicMaterial
        color={color}
        attach="material"
        transparent
        opacity={1}
      />
    </mesh>
  );
};

const Cube = ({ color }) => {
  return (
    <mesh>
      <boxBufferGeometry args={[2, 2, 2]} attach="geometry" />
      <meshBasicMaterial
        color={color}
        attach="material"
        transparent
        opacity={1}
      />
    </mesh>
  );
};
