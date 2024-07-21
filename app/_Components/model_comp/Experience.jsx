import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";

export const Experience = ({ speak }) => {
  const texture = useTexture('/bg.jpg');
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls enableZoom={true} />
      <Avatar speak={speak} position={[0, -2, 5]} scale={1.8} />
      <Environment preset="sunset" />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};
