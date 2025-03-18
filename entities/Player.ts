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
    moveDir?: number | undefined;
    xVel: number;
    yVel: number;
    speed: number;

    spawn: (supporter: boolean, x?: number, y?: number) => void;
}

class Player implements PlayerType {
    public name: string;
    public id: number;
    public x: number;
    public y: number;
    public xl?: number | undefined;
    public yl?: number | undefined;
    public lastx: number;
    public lasty: number;
    public dx: number;
    public dy: number;
    public skin: number;
    public cape: number;
    public health: number;
    public alive = false;
    public moveDir: number | undefined = undefined;
    public speed = 45;
    public xVel = 0;
    public yVel = 0;

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

        this.lastx = this.x;
        this.lasty = this.y;
        this.xl = this.x;
        this.yl = this.y;
        this.dx = this.x;
        this.dy = this.y;
    }
}

export default Player;