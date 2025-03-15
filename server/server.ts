import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(__dirname, "../.env")
});

export default function InitServer() {
    const wsPort = process.env.WSPORT || 8080;
    const server = new WebSocketServer({ port: Number(wsPort) });

    server.on("connection", (socket) => {

        socket.on("message", (data) => {
        });
    });

    console.log(`WebServer listening on PORT ${wsPort}`);
}