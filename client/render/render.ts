import getDirection from "../../util/getDirection";
import getDistance from "../../util/getDistance";
import { initGL } from "./initGL";
import { PlayerManager } from "./managers/playerManager";
import clearCanvas from "./renderutils/clearCanvas";
import { renderRectangle } from "./renderutils/renderRectangle";
import hexToRGB from "../../util/hexToRGB";

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

export function draw() {
    requestAnimationFrame(draw);
    if (!program) return;

    const me = PlayerManager?.myPlayer;
    
    xOffset = camera.x - ge / 2;
    yOffset = camera.x - ye / 2;

    if (PlayerManager?.myPlayer?.alive) {
        const distance = getDistance([camera.x, camera.y], [me.x, me.y]);
        const direction = getDirection([me.x, me.y], [camera.x, camera.y]);
        const deltaDistance = Math.min(distance * 0.004 * 1, distance);

        if (distance > 5) {
            camera.x += deltaDistance * Math.cos(direction);
            camera.y += deltaDistance * Math.sin(direction);
        } else {
            camera.x = me.xl ?? me.x;
            camera.y = me.yl ?? me.y;
        }
    } else {
        camera.x = 16800;
        camera.y = 16800;
    }

    /*
    // update player positions
    for (let i = 0; i < PlayerManager.players.length; i++) {
        const tmpObj = PlayerManager.players[i];

        if (tmpObj.alive) {

        }
    }
        */

    clearCanvas([0.0, 0.0, 0.0, 1.0]);

    if (snowBiomeTop - yOffset <= 0 && 16800 - snowBiomeTop - yOffset >= ye) {
        console.log("rendering grassland", grassland);

        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: 2.0
        }, [grassland[0] / 255, grassland[1] / 255, grassland[2] / 255, 1]);
    } else if (16800 - snowBiomeTop - yOffset <= 0) {
        console.log('rendering desert')
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: 2.0
        }, [desert[0] / 255, desert[1] / 255, desert[2] / 255, 1]);
    } else if (snowBiomeTop - yOffset >= ye) {
        console.log("rendering snow")
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: 2.0
        }, [snow[0] / 255, snow[1] / 255, snow[2] / 255, 1]);
    } else if (snowBiomeTop - yOffset >= 0) {
        console.log("rendering snow")
        
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: (snowBiomeTop - yOffset) / ye * 2.0
        }, [snow[0] / 255, snow[1] / 255, snow[2] / 255, 1]);

        console.log("rendering grasslandsnow")
        renderRectangle(program, gl, {
            x: -1.0,
            y: (snowBiomeTop - yOffset) / ye * 2.0 - 1.0,
            width: 2.0,
            height: 2.0 - (snowBiomeTop - yOffset) / ye * 2.0
        }, [grassland[0] / 255, grassland[1] / 255, grassland[2] / 255, 1]);
    } else {
        console.log("rendering gralnd")
        renderRectangle(program, gl, {
            x: -1.0,
            y: -1.0,
            width: 2.0,
            height: (16800 - snowBiomeTop - yOffset) / ye * 2.0
        }, [grassland[0] / 255, grassland[1] / 255, grassland[2] / 255, 1]);

        console.log("rendering desert")
        renderRectangle(program, gl, {
            x: -1.0,
            y: (16800 - snowBiomeTop - yOffset) / ye * 2.0 - 1.0,
            width: 2.0,
            height: 2.0 - (16800 - snowBiomeTop - yOffset) / ye * 2.0
        }, [desert[0] / 255, desert[1] / 255, desert[2] / 255, 1]);
    }



    /*
    const color = hexToRGB("#778E5A");
    renderRectangle(program, gl, {
        x: -1,
        y: -1,
        width: 2.0,
        height: 2.0,
    }, [color[0] / 255, color[1] / 255, color[2] / 255, 1.0]);
    */
}
