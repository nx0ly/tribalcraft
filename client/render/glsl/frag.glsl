precision highp float;

uniform vec4 u_color;
uniform sampler2D u_texture;
uniform bool u_use_texture;
uniform bool isSprite;  // Added to distinguish sprite rendering

varying vec2 v_position;
varying vec2 v_texCoord;
varying float v_border_radius;
varying vec4 v_border_color;

void main() {
    vec4 color;
    
    if (u_use_texture) {
        if (isSprite) {
            // Use gl_PointCoord for sprites instead of v_texCoord
            color = texture2D(u_texture, gl_PointCoord);
        } else {
            color = texture2D(u_texture, v_texCoord);
        }
    } else {
        color = u_color;
    }

    if (0.0 < v_border_radius && !isSprite) {  // Disable border for sprites if desired
        vec2 coords = abs(v_position);
        float distance = length(max(coords - vec2(1.0 - v_border_radius), 0.0));

        if (distance <= v_border_radius) {
            gl_FragColor = mix(color, v_border_color, distance / v_border_radius);
        } else {
            gl_FragColor = color;
        }
    } else {
        gl_FragColor = color;
    }

    // Optional: Discard pixels outside sprite circle
    if (isSprite) {
        if (length(gl_PointCoord - vec2(0.5)) > 0.5) {
            discard;
        }
    }
}