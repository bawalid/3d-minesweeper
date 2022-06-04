import React, { useRef } from 'react'
import { useGLTF } from "@react-three/drei";
import UncheckedCell from './UncheckedCell';
import CheckedCell from './CheckedCell';


export default function Cell({ id, data, value, click, isFlag, toggleFlag, position, isChecked }) {
    const zero = useGLTF("/0.gltf");
    const one = useGLTF("/1.gltf");
    const two = useGLTF("/2.gltf");
    const three = useGLTF("/3.gltf");
    const four = useGLTF("/4.gltf");
    const five = useGLTF("/5.gltf");
    const six = useGLTF("/6.gltf");
    const seven = useGLTF("/7.gltf");
    const eight = useGLTF("/8.gltf");
    const bomb = useGLTF("/bomb.gltf");
    const flag = useGLTF("/flag.gltf");
    const ref = useRef()
    const handleClick = () => {
        click(id)
    }

    const handleRightClick = () => {
        toggleFlag(id)
    }

    const cellValue = () => {
        if (value !== "bomb") {
            switch (data) {
                case 1:
                    return { geo: one.nodes.one.geometry, color: "#35b5ff" };
                case 2:
                    return { geo: two.nodes.two.geometry, color: "#00ff3f" };
                case 3:
                    return { geo: three.nodes.three.geometry, color: "#ff479c" };
                case 4:
                    return { geo: four.nodes.four.geometry, color: "#fffb38" };
                case 5:
                    return { geo: five.nodes.five.geometry, color: "#f1184c" };
                case 6:
                    return { geo: six.nodes.six.geometry, color: "#a8216b" };
                case 7:
                    return { geo: seven.nodes.seven.geometry, color: "#730517" };
                case 8:
                    return { geo: eight.nodes.eight.geometry, color: "#262335" };
                default:
                    return { geo: zero.nodes.zero.geometry, color: "#ffffff" };
            }
        } else {
            return { geo: bomb.nodes.bomb.geometry, color: "#555555" };
        }
    };

    return (isChecked ?
        <CheckedCell refChecked={ref} position={position} value={value} data={data} content={cellValue()} /> : <UncheckedCell refUnchecked={ref} isFlag={isFlag} flag={flag} position={position} handleClick={handleClick} handleRightClick={handleRightClick} />
    );

};

useGLTF.preload("/0.gltf");
useGLTF.preload("/1.gltf");
useGLTF.preload("/2.gltf");
useGLTF.preload("/3.gltf");
useGLTF.preload("/4.gltf");
useGLTF.preload("/5.gltf");
useGLTF.preload("/6.gltf");
useGLTF.preload("/7.gltf");
useGLTF.preload("/8.gltf");
useGLTF.preload("/bomb.gltf");
useGLTF.preload("/flag.gltf");