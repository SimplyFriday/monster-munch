import { Color } from "excalibur";
import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { levelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { LevelBase } from "./levelBase";

export class LevelTest extends LevelBase {
    public onInitialize() {
        super.onInitialize();

        let wallColor = new Color(200, 200, 200);

        levelBuildingHelper.createWallTile(this, wallColor, 1, 1);
        levelBuildingHelper.createWallTile(this, wallColor, 1, 3);

        levelBuildingHelper.createWallTile(this, wallColor, 2, 2);
        levelBuildingHelper.createWallTile(this, wallColor, 2, 4);


        wallColor = new Color(150, 75, 0);
        levelBuildingHelper.createWallTile(this, wallColor, 5, 5);
        levelBuildingHelper.createWallTile(this, wallColor, 5, 6);
        levelBuildingHelper.createWallTile(this, wallColor, 5, 7);
        levelBuildingHelper.createWallTile(this, wallColor, 5, 8);

        levelBuildingHelper.createWallTile(this, wallColor, 9, 5);
        levelBuildingHelper.createWallTile(this, wallColor, 9, 6);
        levelBuildingHelper.createWallTile(this, wallColor, 9, 7);
        levelBuildingHelper.createWallTile(this, wallColor, 9, 8);

        levelBuildingHelper.createWallTile(this, wallColor, 6, 8);
        levelBuildingHelper.createWallTile(this, wallColor, 7, 8);
        levelBuildingHelper.createWallTile(this, wallColor, 8, 8);

        wallColor = new Color(194,178,128);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 6,6);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 6,7);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 7,6);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 7,7);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 8,6);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 8,7);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 6, 5);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 7, 5);
        levelBuildingHelper.createBackgroundTile(this, wallColor, 8, 5);

        levelBuildingHelper.createItemOnTile(this, ItemIconSprites.Banana, 5,5);
        levelBuildingHelper.createItemOnTile(this, ItemIconSprites.Skull, 5,7);
        levelBuildingHelper.createItemOnTile(this, ItemIconSprites.Posion, 9,6);
        levelBuildingHelper.createItemOnTile(this, ItemIconSprites.Bread, 8,8);

        //levelBuildingHelper.createBackgroundTile(this, wallColor, 8,5);
    }
}