import React, { useRef } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "../../assets/fonts/bold.blob";
import { extend, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

extend({ TextGeometry });
export default function Text({ children, size = 3, ...props }) {
  const ref = useRef();

  const texture = useLoader(TextureLoader, "white-wood.jpg");

  const font = useLoader(FontLoader, boldUrl);
  const config = {
    font,
    size: size,
    height: 1,
    curveSegments: 25,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 15,
  };

  return (
    <mesh ref={ref} {...props}>
      <textGeometry args={[children, config]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
