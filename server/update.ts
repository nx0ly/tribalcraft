import { config } from "dotenv";
import { dirname, resolve } from "path";
import { connectedClients, connectedPlayers } from "./server";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(__dirname, "../.env")
});

function update() {
    for(const player of connectedPlayers) {
        if(!player.alive) continue;

        
    }
}

function sendToAll(data) {
    const json = JSON.stringify(data);

    for(const ws of connectedClients) {
        ws.send(json);
    }
}

export default function initUpdateLoop() {
    console.log(Number(process.env.UPDATELOOP) || 100);

    setInterval(() => {
        update();
    }, (Number(process.env.UPDATELOOP) || 100))
}