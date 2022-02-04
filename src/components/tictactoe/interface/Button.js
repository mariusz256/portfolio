import React from "react";
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
  size = 4,
  lightRef,
  onClick,
  mass,
  won,
  draw,
  show,
  ...props
}) {
  const [ref] = useBox(() => ({
    args: [15, 5, 1],
    mass: 100,
    position: position,
    rotation: [-Math.PI / 2, 0, 0],
  }));

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

  // const textMesh = useRef();

  // const texture = useLoader(TextureLoader, "white-wood.jpg");

  // useLayoutEffect(() => {
  //   const sizeText = new THREE.Vector3();
  //   textMesh.current.geometry.computeBoundingBox();
  //   textMesh.current.geometry.boundingBox.getSize(sizeText);
  //   textMesh.current.position.y = -sizeText.y / 2;
  //   textMesh.current.position.x = -sizeText.x / 2;
  // }, []);

  return (
    <mesh ref={ref} onClick={onClick} args={[20, 4, 1]}>
      <textGeometry args={[children, config]} />
      <meshStandardMaterial />
    </mesh>
  );
}

export default Button;
