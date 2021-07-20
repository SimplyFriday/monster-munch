import { Sprite, SpriteSheet } from "excalibur";
import { Resources } from "../../resources";

export abstract class InsideFloorWallSprites {
    private static sheet = new SpriteSheet({
        image: Resources.InsideFloorsWalls,
        rows: 16,
        columns: 8,
        spWidth: 16,
        spHeight: 16
    });

    public static get BlueTilePattern () {
        return this.sheet.getSprite(21);
    }
}