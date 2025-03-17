import { PlayerManager } from "../managers/playerManager";

interface customWS extends WebSocket {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    wsSend: ((arg: any[]) => void);
}
export default function initWs() {
    const ws = new WebSocket("ws://localhost:8080") as customWS;

    ws.wsSend = (arg) => {
        ws.send(JSON.stringify(arg));
    }

    ws.onopen = () => {
        ws.wsSend(["sp"])
    }

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        const type = data[0];
        const args = data.slice(1);

        switch (type) {
            case "setid": {
                //PlayerManager.addPlayer(args[0], "allah", args[1], args[2], args[3]);
                //PlayerManager.addPlayer()

                break;
            }

            case "addplayer": {
                PlayerManager.addPlayer(args[0], "allah", args[1], args[2], args[3]);

                break;
            }

            case "updateppl": {
                const data = args[0];

                for(const datas in data) {
                    const playerData = data[datas];
                    const player = PlayerManager.getPlayerByID(playerData.id);

                    if(!player) continue;

                    player.dx = player.x - player.lastx;
                    player.dy = player.y - player.lasty;

                    player.x = playerData.x;
                    player.y = playerData.y;
                    console.error(player.x, player.y);
                }
            }
        }
    }

    return ws;
}

const ws = initWs();
export { ws };