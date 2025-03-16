import type { PlayerType } from "../../../entities/Player";
import Player from "../../../entities/Player";

class playerManager {
    public players: Player[];
    public myPlayer: PlayerType;

    addPlayer(id: number, name: string, x: number, y: number) {
        const player = new Player(id, name);
        this.players.push(player);

        player.spawn(false, x, y);
    }

    getPlayerByID(id: number): Player | undefined {
        return this.players.find(player => player.id === id);
    }
}

export const PlayerManager = new playerManager;