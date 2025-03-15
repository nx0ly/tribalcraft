import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(__dirname, "../.env")
});

const IPs: number[] = [];
export default function InitServer() {
    const wsPort = process.env.WSPORT || 8080;
    const server = new WebSocketServer({ port: Number(wsPort) });
    const decoder = new TextDecoder();

    server.on("connection", (socket, request) => {
        socket.on("message", (data) => {
            const dat = JSON.parse(decoder.decode(data));
            
            console.log(dat)
        });
    });

    console.log(`WebServer listening on PORT ${wsPort}`);
}