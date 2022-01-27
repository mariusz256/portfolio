import React, { useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { extend, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "../../assets/fonts/bold.blob";

import { useBox } from "@react-three/cannon";

extend({ TextGeometry });

function Button({
  children,
  position,
  color = "#ba8c63",
  size = 2.5,
  onClick,
  ...props
}) {
  const [ref] = useBox(() => ({
    args: [10, 2, 1],
    mass: 16,
    position: position,
    rotation: [-Math.PI / 2, 0, 0],
  }));

  const font = useLoader(FontLoader, boldUrl);
  const config = {
    font,
    size: size,
    height: 0.3,
    curveSegments: 25,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 15,
  };

  const textMesh = useRef();
  const boxMesh = useRef();

  useLayoutEffect(() => {
    const sizeText = new THREE.Vector3();
    textMesh.current.geometry.computeBoundingBox();
    textMesh.current.geometry.boundingBox.getSize(sizeText);
    boxMesh.current.geometry.boundingBox = sizeText;
    textMesh.current.position.y = -sizeText.y / 2;
    textMesh.current.position.x = -sizeText.x / 2;
  }, []);

  return (
    <group ref={ref}>
      <mesh ref={textMesh} args={[10, 2, 1]}>
        <textGeometry args={[children, config]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={boxMesh} onClick={onClick}>
        <boxGeometry args={[10, 2, 1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

export default Button;
