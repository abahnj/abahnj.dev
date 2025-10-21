import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import portraitImage from '../assets/portrait.jpg';

// Very subtle floating particles
function SubtleParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        sizeAttenuation
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Minimal glowing orb
function MinimalOrb({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <Sphere args={[0.12, 16, 16]} position={position}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </Float>
  );
}

// Main scene
function MinimalScene() {
  return (
    <>
      <Stars radius={100} depth={50} count={1500} factor={2} saturation={0} fade speed={0.3} />
      <SubtleParticles />
      
      {/* Very few orbs */}
      <MinimalOrb position={[-4, 1, -4]} />
      <MinimalOrb position={[4, -1, -5]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#60a5fa" />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Portrait positioned in upper center like Arik's portfolio */}
      <div className="absolute inset-0 flex items-start justify-center pt-0">
        <div
          className="relative w-full h-[60vh] md:h-[80vh] lg:h-[85vh] max-w-[1800px]"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 100%)',
          }}
        >
          <img
            src={portraitImage.src || '/portrait.jpg'}
            alt="Portrait"
            className="w-full h-full object-contain md:object-cover object-center"
            loading="eager"
            style={{
              filter: 'grayscale(100%) contrast(1.1)',
              objectPosition: 'center 20%',
            }}
          />
        </div>
      </div>

      {/* Subtle dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 100%)',
        }}
      />

      {/* Very subtle blue glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
        }}
      />

      {/* 3D Canvas - very minimal */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <MinimalScene />
        </Canvas>
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
