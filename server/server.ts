import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type { CowWS } from "./server.d";
import type { PlayerType } from "../entities/Player";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(__dirname, "../.env")
});

const IPs: number[] = [];
export const connectedClients: CowWS[] = [];
export let connectedPlayers: PlayerType[] = [];

export default function InitServer() {
    const wsPort = process.env.WSPORT || 8080;
    const server = new WebSocketServer({ port: Number(wsPort) });
    const decoder = new TextDecoder();

    server.on("connection", (socket: CowWS, request) => {
        connectedClients.push(socket);
        connectedPlayers = connectedClients.map((ws: CowWS) => ws.player);
        
        socket.on("message", (buffer: Buffer) => {
            const data = JSON.parse(decoder.decode(buffer));

            const type = data[0];
            const args = data.slice(1);

            console.log(args);
        });
    });

    console.log(`WebServer listening on PORT ${wsPort}`);
}