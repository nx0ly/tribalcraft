import getDirection from "../../util/getDirection";
import getDistance from "../../util/getDistance";
import { initGL } from "./initGL";
import { PlayerManager } from "../managers/playerManager";
import clearCanvas from "./renderutils/clearCanvas";
import { renderRectangle } from "./renderutils/renderRectangle";
import hexToRGB from "../../util/hexToRGB";
import { smooth } from "../../util/smoothDiff";

export const canvas: HTMLCanvasElement | null = document.querySelector("#gameCanvas");
if (!canvas) throw new Error("Cannot find canvas element on the DOM.");

export const gl: WebGLRenderingContext | null = canvas.getContext("webgl", {
    alpha: false
});

if (!gl) throw new Error("Unable to initialize WebGL.");

export let program: WebGLProgram | null = null;

(async () => {
    program = await initGL();
})();

let xOffset = 0;
let yOffset = 0;
const camera = {
    x: 0,
    y: 0,
}

const grassland = hexToRGB("#b6db66");
const snow = hexToRGB("#ffffff");
const river = hexToRGB("#91b2db");
const desert = hexToRGB("#dbc666");
const snowBiomeTop = 4000;
const ge = 1920;
const ye = 1080;

let lastFrameTime = Date.now();
let delta = 0;

const fpsDisplay = document.getElementById("fpsDisplay");

export async function draw() {
    if (!program) {
        setTimeout(() => {
            draw();
        }, 500);

        return;
    }

    // enable webgl features (should be in init function move later)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const current = Date.now();
    delta = current - lastFrameTime;
    lastFrameTime = current;

    if (fpsDisplay) {
        const fps = Math.round(1000 / delta);
        fpsDisplay.textContent = `FPS: ${fps}`;
    }

    const me = PlayerManager?.myPlayer;

    xOffset = camera.x - ge / 2;
    yOffset = camera.y - ye / 2;

    if (PlayerManager?.myPlayer?.alive && me) {
        const distance = getDistance([camera.x, camera.y], [me.x, me.y]);
        const direction = getDirection([me.x, me.y], [camera.x, camera.y]) - Math.PI;
        const deltaDistance = Math.min(distance * 0.005 * delta, distance);

        if (distance > 0.05) {
            camera.x += deltaDistance * Math.cos(direction);
            camera.y += deltaDistance * Math.sin(direction);
        } else {
            camera.x = me.x;
            camera.y = me.y;
        }
    } else {
        camera.x = 16800 / 2;
        camera.y = 16800 / 2;
    }

    clearCanvas([0.2, 0.2, 0.2, 1.0]);

    // snow
    renderRectangle(program, gl, {
        x: (-xOffset / ge) * 2.0 - 1.0,
        y: (-yOffset / ye) * 2.0 - 1.0,
        width: (16800 / ge) * 2.0,
        height: (16800 / ye) * 2.0
    }, [snow[0] / 255, snow[1] / 255, snow[2] / 255, 1]);

    // grassland
    renderRectangle(program, gl, {
        x: (-xOffset / ge) * 2.0 - 1.0,
        y: (-yOffset / ye) * 2.0 - 1.0,
        width: (16800 / ge) * 2.0,
        height: (12800 / ye) * 2.0
    }, [grassland[0] / 255, grassland[1] / 255, grassland[2] / 255, 1]);

    // desert
    renderRectangle(program, gl, {
        x: (-xOffset / ge) * 2.0 - 1.0,
        y: (-yOffset / ye) * 2.0 - 1.0,
        width: (16800 / ge) * 2.0,
        height: (4000 / ye) * 2.0
    }, [desert[0] / 255, desert[1] / 255, desert[2] / 255, 1]);
    
    renderRectangle(program, gl, {
        x: (-xOffset / ge) * 2.0 - 1.0,
        y: (-yOffset / ye) * 2.0 - 1.0,
        width: (16800 / ge) * 2.0,
        height: (16800 / ye) * 2.0
    }, [0.0, 0.0, 50.0 / 255.0, 0.25], true);

    // grid
    const gridSize = 80;
    const lineWidth = 6;
    const maxDimension = 16800;
    
    const startX = Math.max(0, ~~(xOffset / gridSize) * gridSize);
    const endX = Math.min(startX + ge + gridSize, maxDimension);
    const startY = Math.max(0, ~~(yOffset / gridSize) * gridSize);
    const endY = Math.min(startY + ye + gridSize, maxDimension);
    
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.useProgram(program);
    gl.uniform4f(gl.getUniformLocation(program, "u_color"), 0.0, 0.0, 0.0, 0.06);
    
    const vertices = new Float32Array(8);
    const lineWNorm = (lineWidth / ge) * 2;
    const lineHNorm = (lineWidth / ye) * 2;
    
    for (let x = startX; x < endX; x += gridSize) {
        const xPos = ((x - xOffset) / ge) * 2 - 1;
        const yBottom = (-yOffset / ye) * 2 - 1;
        const yTop = ((maxDimension - yOffset) / ye) * 2 - 1;
        
        vertices.set([
            xPos, yBottom,
            xPos + lineWNorm, yBottom,
            xPos, yTop,
            xPos + lineWNorm, yTop
        ]);
        
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    
    for (let y = startY; y < endY; y += gridSize) {
        const yPos = ((y - yOffset) / ye) * 2 - 1;
        const xLeft = (-xOffset / ge) * 2 - 1;
        const xRight = ((maxDimension - xOffset) / ge) * 2 - 1;
        
        vertices.set([
            xLeft, yPos,
            xRight, yPos,
            xLeft, yPos + lineHNorm,
            xRight, yPos + lineHNorm
        ]);
        
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    
    gl.disable(gl.BLEND);
    
    for(const player of PlayerManager.players) {
        //this.render.dx, 0.005 * delay

        player.lastx = player.xl;
        player.lasty = player.yl;

        if(player.xl) player.xl += smooth(player.dx, 0.01 * delta);
        if(player.yl) player.yl += smooth(player.dy, 0.01 * delta);

        renderRectangle(program, gl, {
            x: ((player.xl - xOffset) / ge) * 2 - 1,
            y: ((player.yl - yOffset) / ye) * 2 - 1,
            width: 50 / ge * 2,
            height: 50 / ye * 2
        }, [1, 0, 0, 0.6]);
    }

    gl?.flush();
    requestAnimationFrame(draw);
}
