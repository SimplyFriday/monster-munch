import { Sprite, SpriteSheet } from "excalibur";
import { Resources } from "../../resources";

export abstract class WorldTileSprites {
    private static sheet = new SpriteSheet({
        image: Resources.WorldTiles,
        rows: 16,
        columns: 16,
        spWidth: 16,
        spHeight: 16
    });

    public static get RoadTopOuterCornerLeft () {
        return this.sheet.getSprite(208);
    }

    public static get RoadTopOuterCornerRight () {
        return this.sheet.getSprite(210);
    }

    public static get RoadStraightHorizontal () {
        return this.sheet.getSprite(211);
    }

    public static get RoadStraightVertical () {
        return this.sheet.getSprite(212);
    }

    public static get RoadBottomOuterCornerRight () {
        return this.sheet.getSprite(242);
    }

    public static get RoadBottomOuterCornerLeft () {
        return this.sheet.getSprite(240);
    }
}