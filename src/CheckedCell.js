import React from "react";


export default function CheckedCell({ refChecked, position, value, content }) {

  return (
    <group ref={refChecked} dispose={null}>
      <mesh
        geometry={content.geo}
        scale={value !== "bomb" ? [2, 2, 2] : [0.6, 0.6, 0.6]}
        position={
          value !== "bomb"
            ? [position[0] - 0.5, 0, position[2] + 0.5]
            : position
        }
        material-color={content.color}
        dispose={null}
        receiveShadow
        castShadow>
        <meshPhysicalMaterial
          metalness={0.6}
          roughness={0.6}
          color={content.color}
          clearcoat={0}
          clearcoatRoughness={0.8}
          sheen={0.3}
        />
      </mesh>
    </group>
  );
}
