import { renderRectangle } from "../renderutils/renderRectangle";

export default function renderLeaderboard(program: WebGLProgram, gl: WebGLRenderingContext) {
    // expanded out so easier to modify in future

    const x = (innerWidth - 350) / innerWidth * 2 - 1;
    const y = -(310 / innerHeight * 2 - 1);
    const width = (340 / innerWidth) * 2;
    const height = (300 / innerHeight) * 2;

    renderRectangle(program, gl, {
        x,
        y,
        width,
        height
    }, [0.0, 0.0, 0.0, 0.25], false);
}