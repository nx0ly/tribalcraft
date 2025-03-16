import { randomInteger } from "../util/random";

export interface PlayerType {
    name: string;
    id: number;
    x: number;
    y: number;
    xl?: number;
    yl?: number;
    health: number;
    alive: boolean;
}

class Player implements PlayerType {
    public name: string;
    public id: number;
    public x: number;
    public y: number;
    public xl?: number | undefined;
    public yl?: number | undefined;
    public skin: number;
    public cape: number;
    public health: number;
    public alive = false;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;

        this.health = 100;
    }

    spawn(supporter: boolean, x?: number, y?: number): void {
        this.alive = true;

        if(x) this.x = x;
        else this.x = randomInteger(0, 16800);
        if(y) this.y = y;
        else this.y = randomInteger(0, 16800);
    }
}

export default Player;