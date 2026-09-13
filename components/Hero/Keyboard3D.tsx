"use client";

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Float,
  ContactShadows,
  Text,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Color, ExtrudeGeometry, Shape } from "three";
import { useIntro } from "@/contexts/IntroContext";
import { useTheme, getAccentHex } from "@/contexts/ThemeContext";

const LABEL_COLOR_IDLE = "#94a3b8";
const KEY_BODY_IDLE = "#1e293b";
const KEY_BODY_HOVER = "#334155";
const KEY_HEIGHT = 0.62;
// Absolute top-face inset so wide keys (spacebar) keep the same wall angle as 1u caps.
const KEY_TAPER_INSET = 0.12;

const geomCache = new Map<string, ExtrudeGeometry>();

function roundedRectShape(width: number, height: number, radius: number) {
  const eps = 0.00001;
  const r = Math.max(eps, radius - eps);
  const shape = new Shape();
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - r * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(width - r * 2, height - r * 2, eps, Math.PI / 2, 0, true);
  shape.absarc(width - r * 2, eps, eps, 0, -Math.PI / 2, true);
  return shape;
}

function getKeycapGeometry(width: number, depth: number) {
  const cacheKey = `${width}:${depth}:inset`;
  const cached = geomCache.get(cacheKey);
  if (cached) return cached;

  const radius = Math.min(0.12, width * 0.12, depth * 0.12);
  const shape = roundedRectShape(width, KEY_HEIGHT, radius);
  const geo = new ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelThickness: radius,
    bevelSize: radius - 0.00001,
    bevelSegments: 4,
    curveSegments: 6,
    steps: 1,
  });
  geo.center();

  const pos = geo.attributes.position;
  let minY = Infinity;
  let maxY = -Infinity;
  let maxX = 0;
  let maxZ = 0;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    maxX = Math.max(maxX, Math.abs(x));
    maxZ = Math.max(maxZ, Math.abs(z));
  }
  const span = maxY - minY || 1;
  const taperX = Math.min(0.35, KEY_TAPER_INSET / (maxX || 1));
  const taperZ = Math.min(0.35, KEY_TAPER_INSET / (maxZ || 1));
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - minY) / span;
    const k = Math.max(0, (t - 0.18) / 0.82);
    pos.setX(i, pos.getX(i) * (1 - k * taperX));
    pos.setZ(i, pos.getZ(i) * (1 - k * taperZ));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geomCache.set(cacheKey, geo);
  return geo;
}

const Key = ({
  position,
  label,
  width = 1,
  depth = 1,
  color = KEY_BODY_IDLE,
  forceActive = false,
  accent = "#1df5ea",
}: any) => {
  const press = useRef<any>(null);
  const bodyMat = useRef<any>(null);
  const textRef = useRef<any>(null);
  const textColor = useRef(new Color(LABEL_COLOR_IDLE));
  const textColorTarget = useRef(new Color(LABEL_COLOR_IDLE));
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const geometry = useMemo(
    () => getKeycapGeometry(width, depth),
    [width, depth],
  );

  const isPressed = active || forceActive;
  const isLit = hovered || isPressed;

  useFrame(() => {
    if (press.current) {
      const targetY = isPressed ? -0.12 : 0;
      press.current.position.y += (targetY - press.current.position.y) * 0.3;
    }

    if (bodyMat.current) {
      bodyMat.current.color.lerp(new Color(isLit ? KEY_BODY_HOVER : color), 0.15);
      bodyMat.current.emissive.lerp(
        new Color(isLit ? accent : "#000000"),
        0.1,
      );
    }

    if (textRef.current) {
      textColorTarget.current.set(isLit ? accent : LABEL_COLOR_IDLE);
      textColor.current.lerp(textColorTarget.current, 0.15);
      textRef.current.color = `#${textColor.current.getHexString()}`;
    }
  });

  return (
    <group position={position}>
      <group ref={press}>
        <mesh
          geometry={geometry}
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
        >
          <meshPhysicalMaterial
            ref={bodyMat}
            color={color}
            emissiveIntensity={0.22}
            metalness={0}
            roughness={0.52}
            clearcoat={0.22}
            clearcoatRoughness={0.5}
          />
        </mesh>
        {label ? (
          <Text
            ref={textRef}
            position={[0, KEY_HEIGHT / 2 + 0.02, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.32}
            fontWeight={700}
            color={LABEL_COLOR_IDLE}
            anchorX="center"
            anchorY="middle"
            depthOffset={-1}
            toneMapped={false}
            raycast={() => {}}
          >
            {label}
          </Text>
        ) : null}
      </group>
    </group>
  );
};

const KeyboardModel = ({ accent }: { accent: string }) => {
  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { setTypingDone } = useIntro();

  useEffect(() => {
    const text = "YU FENG";
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex >= text.length) {
        setTypingDone(true);
        return;
      }

      const char = text[currentIndex];
      setActiveKey(char);

      setTimeout(() => {
        setActiveKey(null);
      }, 150);

      currentIndex++;
      const nextDelay = Math.random() * 200 + 100;
      setTimeout(typeNextChar, nextDelay);
    };

    const startTimeout = setTimeout(typeNextChar, 1500);

    return () => clearTimeout(startTimeout);
  }, [setTypingDone]);

  return (
    <group rotation={[0.42, -0.18, 0]} position={[-0.5, 0, 0]}>
      {row1.map((char, i) => (
        <Key
          key={`r1-${i}`}
          label={char}
          position={[(i - 4.5) * 1.2, 0, -1.8]}
          forceActive={activeKey === char}
          accent={accent}
        />
      ))}
      {row2.map((char, i) => (
        <Key
          key={`r2-${i}`}
          label={char}
          position={[(i - 4) * 1.2 - 0.2, 0, -0.6]}
          forceActive={activeKey === char}
          accent={accent}
        />
      ))}
      {row3.map((char, i) => (
        <Key
          key={`r3-${i}`}
          label={char}
          position={[(i - 3) * 1.2 - 0.4, 0, 0.6]}
          forceActive={activeKey === char}
          accent={accent}
        />
      ))}
      <Key
        position={[0, 0, 1.8]}
        width={6}
        label=""
        forceActive={activeKey === " "}
        accent={accent}
      />
      <RoundedBox
        args={[13.15, 0.6, 5.4]}
        radius={0.16}
        smoothness={4}
        position={[0, -0.82, 0]}
        receiveShadow
        castShadow
      >
        <meshPhysicalMaterial
          color="#10151d"
          metalness={0.22}
          roughness={0.62}
          clearcoat={0.08}
          clearcoatRoughness={0.6}
        />
      </RoundedBox>
    </group>
  );
};

function StudioLights({ accent }: { accent: string }) {
  return (
    <>
      <hemisphereLight args={["#e8eef6", "#2a3344", 0.5]} />
      <ambientLight intensity={0.24} />
      {/* Key light from above-behind: bright tops, darker front faces */}
      <directionalLight
        position={[3, 12, -5]}
        intensity={1.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
        color="#fff6ee"
      />
      <directionalLight position={[-6, 6, 2]} intensity={0.22} color="#d7e6ff" />
      <pointLight position={[0, 3, 8]} intensity={0.12} color="#ffffff" distance={20} />
      <pointLight position={[6, 2, -5]} intensity={0.28} color={accent} distance={18} />
      <Environment frames={1} resolution={128} environmentIntensity={0.28}>
        <Lightformer
          form="rect"
          intensity={1.1}
          position={[0, 8, -5]}
          scale={[8, 1.4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.35}
          position={[-6, 3, 2]}
          scale={[4, 5, 1]}
          color="#d6e4f5"
        />
        <Lightformer
          form="rect"
          intensity={0.25}
          position={[4, 2, -4]}
          scale={[5, 3, 1]}
          color={accent}
        />
      </Environment>
    </>
  );
}

export default function Keyboard3D() {
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const [accent, setAccent] = useState("#1df5ea");

  useLayoutEffect(() => {
    setAccent(getAccentHex());
  }, [theme]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ toneMappingExposure: 1.05 }}
        camera={{
          position: [0, isMobile ? 10 : 8, isMobile ? 12 : 10],
          fov: 45,
        }}
        style={{ width: "100%", height: "100%" }}
        resize={{ scroll: false, debounce: 0 }}
      >
        <StudioLights accent={accent} />

        <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.22}>
          <KeyboardModel accent={accent} />
        </Float>

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.28}
          scale={26}
          blur={2.6}
          far={4.5}
          color={accent}
        />
      </Canvas>
    </div>
  );
}
