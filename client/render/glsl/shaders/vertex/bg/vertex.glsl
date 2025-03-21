precision mediump float;

attribute vec2 position;
attribute vec2 texCoord;

varying vec2 v_texCoord;
varying vec2 v_position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    v_texCoord = texCoord;
    v_position = position;
}