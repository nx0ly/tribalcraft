import { renderRectangle } from "../renderutils/renderRectangle";

const items = [1, 2, 3, 4, 5];
export default function renderToolBar(program: WebGLProgram, gl: WebGLRenderingContext) {
    const itemWidth = 60;
    const gap = 10;
    const totalWidth = (itemWidth + gap) * items.length - gap;
    const startX = (innerWidth - totalWidth) / 2;

    for (let i = 0; i < items.length; i++) {
        renderRectangle(program, gl, {
            x: ((startX + (itemWidth + gap) * i) / (innerWidth / 2)) - 1,
            y: -((innerHeight - 10) / (innerHeight / 2) - 1),
            width: itemWidth / (innerWidth / 2),
            height: itemWidth / (innerHeight / 2)
        }, [0.0, 0.0, 0.0, 0.25], i);
    }
}