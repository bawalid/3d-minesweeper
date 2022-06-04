import React, { useRef } from 'react';
import { useThree, useFrame } from "@react-three/fiber";
import {
    OrbitControls
} from "@react-three/drei";

const Controls = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree();

    // Ref to the controls, so that we can update them on every frame using useFrame
    const orbitRef = useRef();
    useFrame(() => orbitRef.current.update());
    return (
        <OrbitControls
            ref={orbitRef}
            args={[camera, domElement]}
            minPolarAngle={0}
            maxPolarAngle={(Math.PI / 180) * 25}
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            enableZoom={false}
            target={[10, 0, 10]}
        />
    );
}

export default Controls;
