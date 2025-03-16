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

        let cosineMovement = (player.moveDir !== undefined ? Math.cos(player.moveDir) : 0);
        let sineMovement = (player.moveDir !== undefined ? Math.sin(player.moveDir) : 0);
        const distance = Math.sqrt(cosineMovement * cosineMovement + sineMovement * sineMovement);

        if(distance !== 0) {
            cosineMovement /= distance;
            sineMovement /= distance;
        }

        player.xVel += cosineMovement * (player.speed) / 100;
        player.yVel += sineMovement * (player.speed) / 100;

        if (Math.abs(player.xVel) > 0.01) {
            player.xVel *= 0.993 ** 111;
        } else {
            player.xVel = 0;
        }

        if (Math.abs(player.yVel) > 0.01) {
            player.yVel *= 0.993 ** 111;
        } else {
            player.yVel = 0;
        }

        player.x += player.xVel * 111;
        player.y += player.yVel * 111;
    }

    sendToAll(connectedPlayers.map(player => ({
        id: player.id,
        x: player.x,
        y: player.y
    })));
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