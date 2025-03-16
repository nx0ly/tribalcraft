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
        if(!player?.alive) continue;

        let cosineMovement = (player.moveDir !== null ? Math.cos(player.moveDir) : 0);
        let sineMovement = (player.moveDir !== null ? Math.sin(player.moveDir) : 0);
        const distance = Math.sqrt(cosineMovement * cosineMovement + sineMovement * sineMovement);

        console.log(player.moveDir, player.moveDir !== null, (player.moveDir !== undefined ? Math.cos(player.moveDir) : 0), sineMovement)

        if(distance !== 0) {
            cosineMovement /= distance * 1.75;
            sineMovement /= distance * 1.75;
        }

        player.xVel += cosineMovement;
        player.yVel += sineMovement;

        if (Math.abs(player.xVel) > 0.01) {
            player.xVel *= 0.993 ** 100;
        } else {
            player.xVel = 0;
        }

        if (Math.abs(player.yVel) > 0.01) {
            player.yVel *= 0.993 ** 100;
        } else {
            player.yVel = 0;
        }

        player.x += player.xVel * 100;
        player.y += player.yVel * 100;
    }

    sendToAll(["updateppl", connectedPlayers.map(player => ({
        id: player.id,
        x: player.x,
        y: player.y
    }))]);
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