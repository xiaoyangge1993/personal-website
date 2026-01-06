'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Box, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ClockModel = () => {
  const hourHand = useRef<THREE.Group>(null);
  const minuteHand = useRef<THREE.Group>(null);
  const secondHand = useRef<THREE.Group>(null);

  useFrame(() => {
    const date = new Date();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ms = date.getMilliseconds();

    // Smooth rotation
    if (secondHand.current) {
      secondHand.current.rotation.z = -((seconds + ms / 1000) / 60) * Math.PI * 2;
    }
    if (minuteHand.current) {
      minuteHand.current.rotation.z = -((minutes + seconds / 60) / 60) * Math.PI * 2;
    }
    if (hourHand.current) {
      hourHand.current.rotation.z = -((hours + minutes / 60) / 12) * Math.PI * 2;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      {/* Clock Face */}
      <Cylinder args={[4, 4, 0.5, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.1} />
      </Cylinder>
      
      {/* Rim */}
      <Cylinder args={[4.2, 4.2, 0.6, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.2} />
      </Cylinder>

      {/* Markers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={i}
          args={[0.2, 0.6, 0.1]}
          position={[
            Math.sin((i * Math.PI) / 6) * 3.2,
            Math.cos((i * Math.PI) / 6) * 3.2,
            0.3
          ]}
          rotation={[0, 0, -(i * Math.PI) / 6]}
        >
          <meshStandardMaterial color="#cbd5e1" />
        </Box>
      ))}

      {/* Hour Hand */}
      <group ref={hourHand} position={[0, 0, 0.4]}>
        <Box args={[0.3, 2.5, 0.1]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#334155" />
        </Box>
      </group>

      {/* Minute Hand */}
      <group ref={minuteHand} position={[0, 0, 0.5]}>
        <Box args={[0.2, 3.5, 0.1]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#fb923c" />
        </Box>
      </group>
      
      {/* Second Hand */}
      <group ref={secondHand} position={[0, 0, 0.6]}>
        <Box args={[0.05, 3.8, 0.05]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#ef4444" />
        </Box>
      </group>

      {/* Center Pin */}
      <Cylinder args={[0.2, 0.2, 0.8, 16]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.4]}>
        <meshStandardMaterial color="#334155" />
      </Cylinder>
    </group>
  );
};

export default function Clock3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight
          position={[0, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#ffffff"
        />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <ClockModel />
        </Float>
        {/* <Environment preset="studio" /> */}
      </Canvas>
    </div>
  );
}
