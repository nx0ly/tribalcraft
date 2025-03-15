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