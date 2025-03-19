import { renderRectangle } from "../renderutils/renderRectangle";

export default function ageBar(program: WebGLProgram, gl: WebGLRenderingContext) {
    renderRectangle(program, gl, {
        x: (innerWidth / 2 - 150) / innerWidth * 2 - 1,
        y: -((innerHeight - 80) / innerHeight * 2 - 1),
        width: (300 / innerWidth) * 2,
        height: (20 / innerHeight) * 2
    }, [0.0, 0.0, 0.0, 0.25], false);
}