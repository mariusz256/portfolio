import './App.scss';
import {useRef} from 'react';

import {Canvas, useFrame} from '@react-three/fiber';
import {softShadows, OrbitControls} from '@react-three/drei';

softShadows();

const SpinningMesh = () => {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh castShadow ref={mesh} position={[0, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="#E3540B" />
    </mesh>
  );
};

function App() {
  return (
    <div className="App">
      <Canvas shadows camera={{position: [-5, 2, 10], fov: 20}}>
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.0}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ambientLight intensity={0.4} />
        <pointLight position={[-10, 0, 0]} intensity={0.6} />
        <pointLight position={[0, -14, 0]} intensity={0.6} />

        <group>
          <mesh
            receiveShadow={true}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
        </group>

        <SpinningMesh />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
