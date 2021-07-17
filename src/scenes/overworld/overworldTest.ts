import { Color, TileSprite } from "excalibur";
import { levelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Resources } from "../../resources";
import { OverworldBase } from "./overworldBase";

export class OverworldTest extends OverworldBase {
    public onInitialize() {
        let wallColor = new Color(200, 200, 200);

        this.add(levelBuildingHelper.createWallTile(wallColor, 1, 1));
        this.add(levelBuildingHelper.createWallTile(wallColor, 1, 3));

        this.add(levelBuildingHelper.createWallTile(wallColor, 2, 2));
        this.add(levelBuildingHelper.createWallTile(wallColor, 2, 4));


        wallColor = new Color(150, 75, 0);
        this.add(levelBuildingHelper.createWallTile(wallColor, 5, 5));
        this.add(levelBuildingHelper.createWallTile(wallColor, 5, 6));
        this.add(levelBuildingHelper.createWallTile(wallColor, 5, 7));
        this.add(levelBuildingHelper.createWallTile(wallColor, 5, 8));

        this.add(levelBuildingHelper.createWallTile(wallColor, 9, 5));
        this.add(levelBuildingHelper.createWallTile(wallColor, 9, 6));
        this.add(levelBuildingHelper.createWallTile(wallColor, 9, 7));
        this.add(levelBuildingHelper.createWallTile(wallColor, 9, 8));

        this.add(levelBuildingHelper.createWallTile(wallColor, 6, 8));
        this.add(levelBuildingHelper.createWallTile(wallColor, 7, 8));
        this.add(levelBuildingHelper.createWallTile(wallColor, 8, 8));

        this.add(levelBuildingHelper.createWallTile(wallColor, 6, 5));
        this.add(levelBuildingHelper.createWallTile(wallColor, 8, 5));

    }
}