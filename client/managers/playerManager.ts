import type { PlayerType } from "../../entities/Player";
import Player from "../../entities/Player";

class playerManager {
    public players: Player[] = [];
    public myPlayer: PlayerType | undefined = undefined;

    addPlayer(id: number, name: string, x: number, y: number, isMe: boolean) {
        const player = new Player(id, name);
        this.players.push(player);

        player.spawn(false, x, y);

        if(isMe) this.myPlayer = player;
    }

    getPlayerByID(id: number): Player | undefined {
        return this.players.find(player => player.id === id);
    }
}

export const PlayerManager = new playerManager;