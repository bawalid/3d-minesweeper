import React, { useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import FlagCell from "./FlagCell";

export default function UncheckedCell({
  refUnchecked,
  isFlag,
  flag,
  position,
  handleClick,
  handleRightClick,
}) {
  const square = useGLTF("/square.gltf");
  const [isHover, setIsHover] = useState(null);
  useCursor(isHover);
  const animProps = useSpring({
    color: isHover ? "#E2626E" : "#ced2c5",
    rough: isHover ? 0.6 : 0.4,
  });
  return (
    <a.group
      ref={refUnchecked}
      position={position}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      receiveShadow
      castShadow>
      <a.mesh
        geometry={square.nodes.Cube.geometry}
        scale={[1, 0.1, 1]}
        material-color={animProps.color}
        dispose={null}
        receiveShadow
        castShadow>
        <a.meshPhysicalMaterial
          metalness={1}
          roughness={animProps.rough}
          color={animProps.color}
          clearcoat={1}
          clearcoatRoughness={0.03}
          sheen={0.5}
        />
      </a.mesh>
      {isFlag && <FlagCell flag={flag} refFlag={refUnchecked} />}
    </a.group>
  );
}
useGLTF.preload("/square.gltf");
