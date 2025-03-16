import hexToRGB from "../../util/hexToRGB";
import { initGL } from "./initGL";
import clearCanvas from "./renderutils/clearCanvas";
import { renderRectangle } from "./renderutils/renderRectangle";

export const canvas: HTMLCanvasElement | null = document.querySelector("#gameCanvas");
if(!canvas) throw new Error("Cannot find canvas element on the DOM.");

export const gl: WebGLRenderingContext | null = canvas.getContext("webgl");
if(!gl) throw new Error("Unable to initialize WebGL.");

export let program: WebGLProgram | null = null;

(async () => {
    program = await initGL();
})();

let xOffset = 0;
let yOffset = 0;

export function draw() {
    requestAnimationFrame(draw);
    if(!program) return;

    clearCanvas([0.0, 0.0, 0.0, 1.0]);

    const color = hexToRGB("#778E5A");
    renderRectangle(program, gl, {
        x: -1,
        y: -1,
        width: 2.0,
        height: 2.0,
    }, [color[0] / 255, color[1] / 255, color[2] / 255, 1.0]);
}
