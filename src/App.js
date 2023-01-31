import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, useGLTF } from "@react-three/drei";
// import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

// Scene
import BananaScene from "./image/banana-v1-transformed.glb";

import Overlay from "./layout/Overlay";

// Banana
const Banana = ({ z }) => {
  const bananaRef = useRef();
  const { nodes, materials } = useGLTF(BananaScene);

  const { viewport, camera } = useThree();
  const { height, width } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // -1 to 1
    y: THREE.MathUtils.randFloatSpread(height), // -1 to 1
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    bananaRef.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    );
    bananaRef.current.position.set(data.x * width, (data.y += 0.025), z);
    if (data.y > height) data.y = -height;
  });
  return (
    <mesh
      ref={bananaRef}
      geometry={nodes.banana.geometry}
      material={materials.skin}
      rotation={[-Math.PI / 2, 0, 0]}
      material-emissive="orange"
    />
  );
};

function App({ count = 100, depth = 80 }) {
  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
        <color attach="background" args={["#ffbf40"]} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          {Array.from({ length: count }, (_, idx) => (
            <Banana key={idx} z={-(idx / count) * depth - 20} />
          ))}

          {/* <EffectComposer>
    
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            bokehScale={11}
            height={700}
          />
        </EffectComposer> */}
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
