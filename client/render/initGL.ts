import { gl } from "./render";

function checkShaderCompilation(shader: WebGLShader, shaderType: string) {
    if (!gl?.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl?.getShaderInfoLog(shader);
        throw new Error(`error compiling ${shaderType} shader: ${info}`);
    }
}

export async function initGL(): Promise<WebGLProgram> {
    const vertexShaderSource = await fetch("client/render/glsl/shaders/vertex/bg/vertex.glsl").then(resp => resp.text());
    const fragmentShaderSource = await fetch("client/render/glsl/shaders/fragment/bg/frag.glsl").then(resp => resp.text());

    const vertexShader = gl?.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) throw new Error("failed to compile vertex shader.");
    gl?.shaderSource(vertexShader, vertexShaderSource);
    gl?.compileShader(vertexShader);
    checkShaderCompilation(vertexShader, "vertex");

    const fragmentShader = gl?.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) throw new Error("failed to compile frag shader");
    gl?.shaderSource(fragmentShader, fragmentShaderSource);
    gl?.compileShader(fragmentShader);
    checkShaderCompilation(fragmentShader, "fragment");

    const shaderProgram = gl?.createProgram();
    if (!shaderProgram) throw new Error("failed to create program");
    gl?.attachShader(shaderProgram, vertexShader);
    gl?.attachShader(shaderProgram, fragmentShader);
    gl?.linkProgram(shaderProgram);

    if (!gl?.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        const info = gl?.getProgramInfoLog(shaderProgram);
        throw new Error(`failed to link gl program: ${info}`);
    }

    gl.useProgram(shaderProgram);

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return shaderProgram;
}