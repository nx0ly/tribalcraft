import { gl } from "../render";

export default function clearCanvas(color: [number, number, number, number]): void {
    gl?.clearColor(color[0], color[1], color[2], color[3]);
    gl?.clear(gl.COLOR_BUFFER_BIT);
}