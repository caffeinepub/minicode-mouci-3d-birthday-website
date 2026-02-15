import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GiftBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[position[0], position[1] + 0.6, position[2]]}>
        <boxGeometry args={[1.1, 0.2, 0.2]} />
        <meshStandardMaterial color="#FF6B9D" />
      </mesh>
      <mesh position={[position[0], position[1] + 0.6, position[2]]}>
        <boxGeometry args={[0.2, 0.2, 1.1]} />
        <meshStandardMaterial color="#FF6B9D" />
      </mesh>
    </Float>
  );
}

function Confetti() {
  const count = 100;
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorPalette = [
      [1, 0.84, 0], // Gold
      [1, 0.42, 0.61], // Pink
      [1, 0.65, 0.4], // Coral
    ];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.1} vertexColors />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD700" />
      
      <GiftBox position={[-3, 0, 0]} />
      <GiftBox position={[3, 0, 0]} />
      <GiftBox position={[0, 2, -2]} />
      
      <Confetti />
      
      <Sparkles count={50} scale={10} size={3} speed={0.3} color="#FFD700" />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function BirthdayScene3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
