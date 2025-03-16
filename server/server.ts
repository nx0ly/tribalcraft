import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type { CowWS } from "./server.d";
import type { PlayerType } from "../entities/Player";
import Player from "../entities/Player";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(__dirname, "../.env")
});

const IPs: number[] = [];
export const connectedClients: CowWS[] = [];
export let connectedPlayers: PlayerType[] = [];
let id = 0;

export default function InitServer() {
    const wsPort = process.env.WSPORT || 8080;
    const server = new WebSocketServer({ port: Number(wsPort) });
    const decoder = new TextDecoder();

    server.on("connection", (socket: CowWS, request) => {
        connectedClients.push(socket);

        socket.wsSend = (arg) => {
            socket.send(JSON.stringify(arg));
        };

        socket.on("message", (buffer: Buffer) => {
            const data = JSON.parse(decoder.decode(buffer));

            const type = data[0];
            const args = data.slice(1);

            switch (type) {
                case "sp": {
                    socket.player = new Player(++id, "Allah");
                    socket.player.spawn(false);

                    socket.wsSend(["setid", id]);
                    socket.wsSend(["addplayer", id, socket.player.x, socket.player.y, true]);

                    for(const stream of connectedClients) {
                        if(!stream?.player?.id) continue;
                        if(stream.player.id !== id) stream.wsSend(["addplayer", id, socket.player.x, socket.player.y, false]);
                    }

                    for(const alreadyExistingPlayer of connectedClients.map((a) => a.player)) {
                        socket.wsSend(["addplayer", alreadyExistingPlayer.id, alreadyExistingPlayer.x, alreadyExistingPlayer.y, false]);
                    }

                    connectedPlayers = connectedClients.map((ws: CowWS) => ws.player);

                    break;
                }

                case "look": {
                    socket.player.moveDir = args[0];
                }
            }
        });
    });

    console.log(`WebServer listening on PORT ${wsPort}`);
}