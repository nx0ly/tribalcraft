import { gl } from "../render";

let vertexBuffer = gl?.createBuffer();
let texCoordBuffer = gl?.createBuffer();

export function renderSprite(
    program: WebGLProgram,
    gl: WebGLRenderingContext,
    image: HTMLImageElement | ImageBitmap,
    x: number,
    y: number,
    width: number,
    height: number
) {
    const x1 = x - width / 2;
    const x2 = x + width / 2;
    const y1 = y - height / 2;
    const y2 = y + height / 2;

    const vertices = new Float32Array([
        x1, y1,
        x1, y2,
        x2, y2,
        x1, y1,
        x2, y2,
        x2, y1
    ]);

    const texCoords = new Float32Array([
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ]);

    if(!vertexBuffer) {
        vertexBuffer = gl.createBuffer();
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    if(!texCoordBuffer) {
        texCoordBuffer = gl.createBuffer();
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    
    const texCoordLoc = gl.getAttribLocation(program, "texCoord");
    gl.enableVertexAttribArray(texCoordLoc);
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    const isSpriteLoc = gl.getUniformLocation(program, "u_isSprite");
    gl.uniform1f(isSpriteLoc, 1.0);
    
    const textureLoc = gl.getUniformLocation(program, "u_texture");
    gl.uniform1i(textureLoc, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.deleteTexture(texture);
    gl.disableVertexAttribArray(positionLoc);
    gl.disableVertexAttribArray(texCoordLoc);
    gl.uniform1f(isSpriteLoc, 0.0);
}