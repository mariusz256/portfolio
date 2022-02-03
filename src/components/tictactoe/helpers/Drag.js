import { usePointToPointConstraint, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { createRef, useCallback, useEffect } from "react";

const cursor = createRef();

function useDrag(ref) {
  const [, , api] = usePointToPointConstraint(cursor, ref);

  useEffect(() => api.disable(), []);

  const onPointerUp = useCallback((e) => {
    document.body.style.cursor = "grab";
    e.target.releasePointerCapture(e.pointerId);
    api.disable();
  }, []);

  const onPointerDown = useCallback((e) => {
    document.body.style.cursor = "none";
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    api.enable();
  }, []);

  return { onPointerUp, onPointerDown };
}

function Cursor() {
  const [, api] = useSphere(
    () => ({
      collisionFilterMask: 0,
      mass: 0,
      args: [1],
    }),
    cursor
  );

  return useFrame((state) => {
    const y = 5;
    const x = state.mouse.x * 10 + state.mouse.y * 13;
    const z = -state.mouse.y * 17 + state.mouse.x * 13;
    api.position.set(x - 2, y, z + 2);
  });
}

export { useDrag, cursor, Cursor };
