precision mediump float;

uniform vec4 u_color;

varying vec2 v_position;
varying float v_border_radius;
varying vec4 v_border_color;

void main() {
    // calculate distance from edge and apply border color
    if(0.0 < v_border_radius) {
        vec2 coords = abs(v_position);
        float distance = length(max(coords - vec2(1.0 - v_border_radius), 0.0));

        if(distance <= v_border_radius) {
            gl_FragColor = mix(u_color, v_border_color, distance / v_border_radius);
        } else {
            gl_FragColor = u_color;
        }
    } else {
        gl_FragColor = u_color;
    }
}