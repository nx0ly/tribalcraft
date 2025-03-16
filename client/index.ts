import { canvas, draw, gl } from "./render/render";
import { ws } from "./websocket/init";

draw();

if (canvas) {
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
}

window.onresize = () => {
    if (canvas) {
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        
        if (gl) {
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }
}

const keys: { [key: string]: boolean } = {};
let rotation: number | undefined = undefined;

window.onkeydown = (event) => {
    keys[event.key.toLowerCase()] = true;
    updateRotation();
};

window.onkeyup = (event) => {
    keys[event.key.toLowerCase()] = false;
    updateRotation();
};

function updateRotation() {
    const left = keys.a || keys.arrowleft;
    const right = keys.d || keys.arrowright;
    const up = keys.w || keys.arrowup;
    const down = keys.s || keys.arrowdown;

    if (!left && !right && !up && !down) {
        rotation = undefined;
    } else {
        let dx = 0;
        let dy = 0;

        if (left) dx -= 1;
        if (right) dx += 1;
        if (up) dy += 1;
        if (down) dy -= 1;

        rotation = Math.atan2(dy, dx);
    }

    ws.wsSend(["look", rotation]);
}
