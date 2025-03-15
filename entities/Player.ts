export interface PlayerType {
    name: string;
    id: number;
    x: number;
    y: number;
    xl?: number;
    yl?: number;
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

    constructor(id: number, name: string, x?: number, y?: number) {
        this.id = id;
        this.name = name;

        if(x) this.x = x;
        else this.x;
        if(y) this.y = y;
    }
}

export default Player;