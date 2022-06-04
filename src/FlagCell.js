import React from "react";

export default function FlagCell({refFlag, flag}) {
  return (
    <group ref={refFlag} dispose={null} rotation={[0, 120, 0]}>
      <mesh
        scale={[0.1, 2, 0.1]}
        position={[0, 2, 0]}
        castShadow
        receiveShadow
        geometry={flag.nodes.Cylinder.geometry}
        material={flag.materials["materialCylinder"]}
      />
      <mesh
        scale={[0.7, 1, 0.6]}
        position={[-0.5, 3.3, 0]}
        rotation={[89.55, 0, 0]}
        castShadow
        receiveShadow
        geometry={flag.nodes.Plane.geometry}
        material={flag.materials["materialFlag"]}
      />
    </group>
  );
}
