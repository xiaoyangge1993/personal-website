"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, ContactShadows, Html } from "@react-three/drei";
import { Color } from "three";
import { useIntro } from "@/contexts/IntroContext";

const Key = ({
  position,
  label,
  width = 1,
  depth = 1,
  color = "#f8f9fa",
  forceActive = false,
}: any) => {
  const mesh = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Combine internal active state (mouse click) with external forceActive (typing animation)
  const isPressed = active || forceActive;

  useFrame((state) => {
    if (mesh.current) {
      // Smoothly animate position based on active state (press effect)
      const targetY = isPressed ? -0.15 : 0;
      mesh.current.position.y += (targetY - mesh.current.position.y) * 0.3;

      // Hover color transition - subtle warmth on hover or active
      const targetColor = new Color(hovered || isPressed ? "#fff7ed" : color);
      mesh.current.material.color.lerp(targetColor, 0.15);

      // Emissive glow on hover or active
      const targetEmissive = new Color(
        hovered || isPressed ? "#fb923c" : "#000000"
      );
      mesh.current.material.emissive.lerp(targetEmissive, 0.1);
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={mesh}
        args={[width, 0.5, depth]} // Width, Height, Depth
        radius={0.12} // Softer corners
        smoothness={8}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => setActive(true)}
        onPointerUp={() => setActive(false)}
      >
        <meshPhysicalMaterial
          color={color}
          emissiveIntensity={0.2}
          metalness={0.8} // High metalness for premium feel
          roughness={0.2} // Low roughness for gloss
          clearcoat={1} // Clearcoat for ceramic/glass look
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </RoundedBox>
      {/* Move Html outside RoundedBox to prevent event interference */}
      {label && (
        <Html
          position={[0, 0.26, 0]}
          transform
          rotation={[-Math.PI / 2, 0, 0]}
          occlude={false}
          zIndexRange={[0, 0]}
          className="pointer-events-none"
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div
            className={`text-xs font-bold transition-colors duration-200 ${
              hovered || isPressed ? "text-orange-500" : "text-slate-400"
            }`}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

const KeyboardModel = () => {
  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { setTypingDone } = useIntro();

  useEffect(() => {
    const text = "KEVIN XIAO";
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex >= text.length) {
        setTypingDone(true);
        return;
      }

      const char = text[currentIndex];
      setActiveKey(char);

      // Key press duration (how long it stays down)
      setTimeout(() => {
        setActiveKey(null);
      }, 150);

      // Delay before next key press
      currentIndex++;
      const nextDelay = Math.random() * 200 + 100; // Random delay between 100-300ms
      setTimeout(typeNextChar, nextDelay);
    };

    // Start typing after initial delay
    const startTimeout = setTimeout(typeNextChar, 1500);

    return () => clearTimeout(startTimeout);
  }, [setTypingDone]);

  return (
    <group rotation={[0.4, -0.2, 0]} position={[-0.5, 0, 0]}>
      {/* Keys Row 1 */}
      {row1.map((char, i) => (
        <Key
          key={`r1-${i}`}
          label={char}
          position={[(i - 4.5) * 1.2, 0, -1.8]}
          forceActive={activeKey === char}
        />
      ))}

      {/* Keys Row 2 */}
      {row2.map((char, i) => (
        <Key
          key={`r2-${i}`}
          label={char}
          position={[(i - 4) * 1.2 - 0.2, 0, -0.6]}
          forceActive={activeKey === char}
        />
      ))}

      {/* Keys Row 3 */}
      {row3.map((char, i) => (
        <Key
          key={`r3-${i}`}
          label={char}
          position={[(i - 3) * 1.2 - 0.4, 0, 0.6]}
          forceActive={activeKey === char}
        />
      ))}

      {/* Spacebar */}
      <Key
        position={[0, 0, 1.8]}
        width={6}
        label=""
        forceActive={activeKey === " "}
      />
    </group>
  );
};

export default function Keyboard3D() {
  return (
    <div className="w-full h-[200px] md:h-[300px] relative">
      <Canvas
        camera={{ position: [0, 10, 12], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        resize={{ scroll: false, debounce: 0 }}
      >
        <ambientLight intensity={1} />

        {/* Main Key Light */}
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          color="#ffffff"
        />

        {/* Warm Rim Light */}
        <pointLight
          position={[-10, 0, -5]}
          intensity={1}
          color="#fb923c"
          distance={20}
        />

        {/* Cool Fill Light */}
        <pointLight
          position={[10, 0, -5]}
          intensity={0.5}
          color="#38bdf8"
          distance={20}
        />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          <KeyboardModel />
        </Float>

        {/* Soft Shadow to ground it without a physical base */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={30}
          blur={3}
          far={4}
          color="#fb923c"
        />
      </Canvas>
    </div>
  );
}
