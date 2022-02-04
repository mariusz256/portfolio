import { usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

function Plane({ ...props }) {
  // eslint-disable-next-line no-unused-vars
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  //return useFrame to make plane invisible
  return useFrame(() => {});
}

export default Plane;
