import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import vaseUrl from "../assets/vase10.glb";
import * as THREE from "three";

function VaseModel({ amplitude = 2, damping = 0.1 }) {
  const vase = useGLTF(vaseUrl);
  const ref = useRef();
  const targetRotation = useRef(0);
  const fade = useRef(0);

  useEffect(() => {
    vase.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = 0;
      }
    });
  }, [vase]);

  useFrame(() => {
    const scroll = window.scrollY * 0.005;
    targetRotation.current = scroll * amplitude;

    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        targetRotation.current,
        damping
      );
    }

    if (fade.current < 1) {
      fade.current += 0.001;

      vase.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.opacity = THREE.MathUtils.lerp(
            child.material.opacity,
            1,
            0.03
          );
        }
      });
    }
  });

  return (
    <primitive
      ref={ref}
      object={vase.scene}
      scale={0.9}
      position={[0, -1, 0]}
    />
  );
}

useGLTF.preload(vaseUrl);

export default function Vase3D() {
  return (
    <div className="vase-container">
      <Canvas camera={{ position: [3, -0.2, 4], fov: 40 }} shadows>

        {/* Hemisphere (blue/pink) */}
        <hemisphereLight
          skyColor="#57d8ffff"     // blue
          groundColor="#c5789fff"  // pink-magenta
          intensity={0}
        />

        {/* Key Light (magenta) */}
        <directionalLight
          position={[0, 5, 5]}
          intensity={5}
          color="#6fb7e5ff"  // deep pink
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
        />

        {/* Fill Light (white) */}
        <directionalLight
          position={[0, -8, 2]}
          intensity={15}
          color="#e3e4ff"
        />

        {/* Rim Light (purple/pink) */}
        <directionalLight
          position={[0, 3, -4]}
          intensity={15}
          color="#ffdca8" 
        />

        <VaseModel amplitude={2} damping={0.05} />

      </Canvas>

      {/* Gradient background via CSS */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
          zIndex: -1,
        }}
      />
    </div>
  );
}
