import getDirection from "../../util/getDirection";
import getDistance from "../../util/getDistance";
import { initGL } from "./initGL";
import { PlayerManager } from "../managers/playerManager";
import clearCanvas from "./renderutils/clearCanvas";
import { renderRectangle } from "./renderutils/renderRectangle";
import hexToRGB from "../../util/hexToRGB";
import { SVGRenderer } from "./renderutils/renderSVG";
import { distMulti } from "../../util/distMulti";
import { smooth } from "../../util/smoothDiff";

export const canvas: HTMLCanvasElement | null = document.querySelector("#gameCanvas");
if (!canvas) throw new Error("Cannot find canvas element on the DOM.");

export const gl: WebGLRenderingContext | null = canvas.getContext("webgl");
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
        }, 500)
    }

    const current = Date.now();
    delta = current - lastFrameTime;
    lastFrameTime = current;

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

    clearCanvas([0.0, 0.0, 0.0, 1.0]);

    if (snowBiomeTop - yOffset <= 0 && 16800 - snowBiomeTop - yOffset >= ye) {
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: 2.0
        }, [grassland[0] / 255, grassland[1] / 255, grassland[2] / 255, 1]);
    } else if (16800 - snowBiomeTop - yOffset <= 0) {
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: 2.0
        }, [snow[0] / 255, snow[1] / 255, snow[2] / 255, 1]);
    } else if (snowBiomeTop - yOffset >= ye) {
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: 2.0
        }, [desert[0] / 255, desert[1] / 255, desert[2] / 255, 1]);
    } else if (snowBiomeTop - yOffset >= 0) {
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: (snowBiomeTop - yOffset) / ye * 2.0
        }, [desert[0] / 255, desert[1] / 255, desert[2] / 255, 1]);

        renderRectangle(program, gl, {
            x: -1.0,
            y: (snowBiomeTop - yOffset) / ye * 2.0 - 1.0,
            width: 2.0,
            height: 2.0 - (snowBiomeTop - yOffset) / ye * 2.0
        }, [grassland[0] / 255, grassland[1] / 255, grassland[2] / 255, 1]);
    } else {
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: (16800 - snowBiomeTop - yOffset) / ye * 2.0
        }, [grassland[0] / 255, grassland[1] / 255, grassland[2] / 255, 1]);

        renderRectangle(program, gl, {
            x: -1.0,
            y: (16800 - snowBiomeTop - yOffset) / ye * 2.0 - 1.0,
            width: 2.0,
            height: 2.0 - (16800 - snowBiomeTop - yOffset) / ye * 2.0
        }, [snow[0] / 255, snow[1] / 255, snow[2] / 255, 1]);
    }

    // borders
    if (xOffset <= 0) {
        renderRectangle(program, gl, {
            x: -1,
            y: -1,
            width: (-xOffset / ge) * 2,
            height: 2.0
        }, [0.0, 0.0, 0.0, 1.0]);
    }

    // right border
    if (16800 - xOffset <= ge) {
        const size = Math.max(0, -yOffset) / ye * 2 - 1;
        renderRectangle(program, gl, {
            x: ((16800 - xOffset) / ge) * 2 - 1,
            y: size,
            width: (ge - (16800 - xOffset)) / ge * 2,
            height: 2.0 - size
        }, [0, 0, 0, 1]);
    }

    // top border
    if (yOffset <= 0) {
        renderRectangle(program, gl, {
            x: (-xOffset / ge) * 2 - 1,
            y: -1,
            width: (ge + xOffset) / ge * 2,
            height: (-yOffset / ye) * 2
        }, [0, 0, 0, 1]);
    }

    // bottom border
    if (16800 - yOffset <= ye) {
        const size = Math.max(0, -xOffset) / ge * 2 - 1;
        const a = (16800 - xOffset <= ge) ? (ge - (16800 - xOffset)) / ge * 2 : 0;
        renderRectangle(program, gl, {
            x: size,
            y: ((16800 - yOffset) / ye) * 2 - 1,
            width: 2.0 - size - a,
            height: (ye - (16800 - yOffset)) / ye * 2
        }, [0, 0, 0, 1]);
    }

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
        }, [1, 0, 0, 1]);
    }

    requestAnimationFrame(draw);
}
