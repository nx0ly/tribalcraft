precision mediump float;

uniform float u_isSprite;
uniform vec4 u_color;
uniform sampler2D u_texture;

varying vec2 v_texCoord;

void main() {
    if (u_isSprite > 0.0) {
        vec4 texColor = texture2D(u_texture, v_texCoord);
        //if (texColor.a < 0.1) discard;
        gl_FragColor = texColor;
    } else {
        gl_FragColor = u_color;
    }
}