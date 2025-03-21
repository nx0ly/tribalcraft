attribute vec2 pos;
varying vec2 texCoord;

void main() {
    texCoord = (pos + 1.0) / 2.0;

    // flip horizontally because of webgl stupidness
    texCoord.y = 1.0 - texCoord.y;

    gl_Position = vec4(pos, 0, 1.0);
}