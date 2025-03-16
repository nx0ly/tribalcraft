import { canvas, draw, gl } from "./render/render";

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
let rotation = 0;

window.onkeydown = (event) => {
    keys[event.key.toLowerCase()] = true;

    if (keys.a || keys.arrowleft) rotation = Math.PI;
    else if (keys.d || keys.arrowright) rotation = 0;
    else if (keys.w || keys.arrowup) rotation = -Math.PI / 2;
    else if (keys.s || keys.arrowdown) rotation = Math.PI / 2;
};

window.onkeyup = (event) => {
    keys[event.key.toLowerCase()] = false;
};
