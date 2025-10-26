import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const FloatingSphere = ({ position = [0, 0, 0], color = '#00D9FF' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.z = time * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

export default FloatingSphere;
