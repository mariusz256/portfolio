import React, { useRef } from "react";
import * as THREE from "three";
import { extend, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "../../assets/fonts/bold.blob";

extend({ TextGeometry });

function Button({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 0.2,
  color = "#363535",
  ...props
}) {
  const font = useLoader(FontLoader, boldUrl);

  const config = {
    font,
    size: 50,
    height: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh>
        <textGeometry args={[children, config]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export default Button;
