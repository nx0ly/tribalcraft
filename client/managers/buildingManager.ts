import { Building, type BuildingType } from "../../entities/Building";

class buildingManager {
    public buildings: BuildingType[];

    constructor() {
        this.buildings = [];
    }

    setInitialBuilds(buildings) {
        for (const building of buildings) {
            const build = new Building(building.lolz[0], building.lolz[0], building.lolz[2], building.lolz[3], building.lolz[4] ?? 0, building.__, building.owner);
            this.buildings.push(build);
            console.warn(building.lolz, build)
        }
    }
}

export const BuildingManager = new buildingManager();
