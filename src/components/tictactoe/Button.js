import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import { extend, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "../../assets/fonts/bold.blob";
import {
  EffectComposer,
  Bloom,
  SelectiveBloom,
} from "@react-three/postprocessing";
import { useBox } from "@react-three/cannon";

extend({ TextGeometry });

function Button({
  children,
  position,
  color = "#ba8c63",
  size = 1.5,
  lightRef,
  onClick,
  won,
  draw,
  ...props
}) {
  // const [hovered, setHover] = useState(false);

  const [ref] = useBox(() => ({
    args: [5, 2, 0.5],

    mass: 6,
    position: position,
    rotation: [0.3 * Math.random() - Math.PI / 2, 0, 0.1 * Math.random()],
  }));

  const font = useLoader(FontLoader, boldUrl);
  const config = {
    font,
    size: size,
    height: 0.1,
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
    <group
      ref={ref}
      // onPointerOver={() => setHover(true)}
      // onPointerOut={() => setHover(false)}
      onClick={onClick}
    >
      <mesh ref={textMesh}>
        <textGeometry args={[children, config]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={boxMesh}>
        <boxGeometry args={[5, 2, 1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

export default Button;
