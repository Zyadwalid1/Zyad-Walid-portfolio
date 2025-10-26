import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const FloatingCube = ({ position = [0, 0, 0], color = '#0087FF' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

export default FloatingCube;
