import { gl } from "../render";

let spriteVertexBuffer = gl?.createBuffer();
let spriteTexCoordBuffer = gl?.createBuffer();

const img = new Image();
img.src = "../../../assets/moomoorock.svg";
let texture = null;
export function initSpriteTexture(gl, image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}

export function renderSprites(program, gl, sprites, newbuffer) {
    if(newbuffer) {
         spriteVertexBuffer = gl?.createBuffer();
 spriteTexCoordBuffer = gl?.createBuffer();

    }
    const vertices = [];
    const texCoords = [];

    sprites.forEach((sprite) => {
        const { x, y, width, height } = sprite;
        const x1 = x - width / 2;
        const x2 = x + width / 2;
        const y1 = y - height / 2;
        const y2 = y + height / 2;

        vertices.push(x1, y1, x1, y2, x2, y2, x1, y1, x2, y2, x2, y1);
        texCoords.push(0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0);
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, spriteVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, spriteTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const texCoordLoc = gl.getAttribLocation(program, "texCoord");
    gl.enableVertexAttribArray(texCoordLoc);
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

    const textureLoc = gl.getUniformLocation(program, "u_texture");
    gl.uniform1i(textureLoc, 0);

    const isSpriteLoc = gl.getUniformLocation(program, "u_isSprite");
    gl.uniform1f(isSpriteLoc, 1.0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

    gl.disableVertexAttribArray(positionLoc);
    gl.disableVertexAttribArray(texCoordLoc);
}
