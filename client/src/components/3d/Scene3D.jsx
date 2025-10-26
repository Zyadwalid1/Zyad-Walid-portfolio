import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import FloatingCube from './FloatingCube';
import FloatingSphere from './FloatingSphere';
import ParticleField from './ParticleField';

const Scene3D = ({ variant = 'hero' }) => {
  const variants = {
    hero: (
      <>
        <FloatingCube position={[-2, 0, 0]} color="#0087FF" />
        <FloatingSphere position={[2, 0, 0]} color="#00D9FF" />
        <ParticleField count={500} />
      </>
    ),
    about: (
      <>
        <FloatingSphere position={[0, 0, 0]} color="#0087FF" />
        <ParticleField count={300} />
      </>
    ),
    simple: (
      <>
        <FloatingCube position={[0, 0, 0]} color="#0087FF" />
      </>
    ),
  };

  return (
    <div className="w-full h-full">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00D9FF" />
          {variants[variant]}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
