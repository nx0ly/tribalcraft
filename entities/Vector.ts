export default class Vector {
    public x: number;
    public y: number;
    public speed: number;
    public vel: [number, number];
    public accel: [number, number];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}