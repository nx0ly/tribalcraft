attribute vec4 position;

uniform float u_border_radius;
uniform vec4 u_border_color;

varying vec2 v_position;
varying float v_border_radius;
varying vec4 v_border_color;

void main() {
    gl_Position = position;

    v_position = position.xy;
    v_border_radius = u_border_radius;
    v_border_color = u_border_color;
}