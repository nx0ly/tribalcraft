import { BuildingManager } from "../../managers/buildingManager";
import { renderSprites } from "../renderutils/renderSprite";

const img = new Image();
img.crossOrigin = "anonymous";
img.src = "../../../assets/moomoorock.svg";
img.onload = () => {
    img.isloaded = true;
};

export default function renderBuildings(program: WebGLProgram, gl: WebGLRenderingContext, xOffset: number, yOffset: number, layer = 0) {
    if(!img.isloaded) return;

    if(layer === 0) {
        //for(const building of BuildingManager.buildings) {
            //console.log(building.x, building.y)
            renderSprites(program, gl, BuildingManager.buildings, true);
        //}
    }
}