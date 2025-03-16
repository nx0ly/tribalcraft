attribute vec4 position;
attribute vec2 spritePosition;
attribute vec2 texCoord;

uniform float u_border_radius;
uniform vec4 u_border_color;
uniform vec2 spriteSize;
uniform bool isSprite;

varying vec2 v_position;
varying vec2 v_texCoord;
varying float v_border_radius;
varying vec4 v_border_color;

void main() {
    if (isSprite) {
        gl_Position = vec4(spritePosition, 0.0, 1.0);
        gl_PointSize = max(spriteSize.x, spriteSize.y) * 512.0;
        v_position = spritePosition;
    } else {
        gl_Position = position;
        v_position = position.xy;
    }
    
    v_texCoord = texCoord;
    v_border_radius = u_border_radius;
    v_border_color = u_border_color;
}