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

extend({ TextGeometry });

function Button({
  children,
  position,
  color = "#ba8c63",
  size = 1.5,
  ...props
}) {
  const [hovered, setHover] = useState(false);

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
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh ref={textMesh}>
        <textGeometry args={[children, config]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={boxMesh}>
        <boxGeometry args={[5, 2, 1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      {hovered && (
        <EffectComposer multisampling={8}>
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            intensity={0.6}
          />
          {/* <Bloom
            kernelSize={1}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={0.5}
          /> */}
        </EffectComposer>
      )}
    </group>
  );
}

export default Button;
