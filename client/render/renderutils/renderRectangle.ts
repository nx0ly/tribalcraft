import { gl } from "../render";

interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

let buffer: WebGLBuffer | null = gl?.createBuffer() ?? null;

export function renderRectangle(
    program: WebGLProgram, 
    gl: WebGLRenderingContext | null, 
    { x, y, width, height }: Rectangle, 
    color: [number, number, number, number],
    useNewBuffer: boolean | number
): void {
    if(!gl) throw new Error("gl context is not defined");
    
    const vertices = new Float32Array([
        x, y,                  // bottom left
        x + width, y,          // bottom right
        x, y + height,         // top left
        x + width, y + height  // top right
    ]);

    if(useNewBuffer || !buffer) {
        buffer = gl.createBuffer();
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(colorLocation, color);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    /*
    if(useNewBuffer && buffer) {
        gl.deleteBuffer(buffer);
        buffer = null;
    }
    */
}
