export class SVGRenderer {
    private gl: WebGLRenderingContext;
    private texture: WebGLTexture | null = null;
    private program: WebGLProgram;

    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.gl = gl;
        this.program = program;
    }

    loadSVG(svgString: string, width: number, height: number): Promise<void> {
        return new Promise((res, rej) => {
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.width = width;
            img.height = height;

            img.onload = () => {
                this.createTextureFromImage(img);
                URL.revokeObjectURL(url);
                res();
            };

            img.onerror = rej;
            img.src = url;
        });
    }

    private createTextureFromImage(img: HTMLImageElement) {
        const gl = this.gl;
        
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    }

    render(x: number, y: number, width: number, height: number) {
        if (!this.texture) return;
    
        const gl = this.gl;
        const program = this.program;
        
        const vertices = new Float32Array([
            x,        y,         0.0, 0.0,
            x + width, y,         1.0, 0.0,
            x,        y + height, 0.0, 1.0,
            x + width, y + height, 1.0, 1.0,
        ]);
    
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        // attribs
        const positionLoc = gl.getAttribLocation(program, "position");
        const texCoordLoc = gl.getAttribLocation(program, "texCoord");
        
        gl.enableVertexAttribArray(positionLoc);
        gl.enableVertexAttribArray(texCoordLoc);
        
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);
        gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 16, 8);
    
        // uniforms
        gl.useProgram(program);
        gl.uniform1i(gl.getUniformLocation(program, "u_use_texture"), 1);
        gl.uniform1i(gl.getUniformLocation(program, "u_texture"), 0);
        gl.uniform1f(gl.getUniformLocation(program, "u_border_radius"), 0.0);
    
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.deleteBuffer(buffer);
    }
}
