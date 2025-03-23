export interface BuildingType {
    x: number;
    y: number;
    id: number;
    size: number;
    name: string;
}

export class Building implements BuildingType {
    public x: number;
    public y: number;
    public id: number;
    public size: number;
    public name: string;
    public owner: number;
    public _: string;
    public __: number;
    public lolz: number;

    public width: number;
    public height: number;
    
    constructor(lolz, id, x, _, y, __, owner) {
        this.id = id;
        this.x = x;
        this._ = _;
        this.y = y;
        this.__ = __;
        this.owner = owner;
        this.lolz = lolz;

        this.width = 80;
        this.height = 80;
    }
}