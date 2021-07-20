import { Color, Engine } from "excalibur";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { levelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { LevelBase } from "./levelBase";

export class LevelTest extends LevelBase {
    public onInitialize(engine:Engine) { 
        super.onInitialize(engine);

        let wallColor = new Color(200, 200, 200);

        levelBuildingHelper.createWallTile(this, wallColor, 1, 1);
        levelBuildingHelper.createWallTile(this, wallColor, 1, 3);

        levelBuildingHelper.createWallTile(this, wallColor, 2, 2);
        levelBuildingHelper.createWallTile(this, wallColor, 2, 4);

        wallColor = new Color(150, 75, 0);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 5);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 6);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 7);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerBottomLeft, 5, 8);

        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 5);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 6);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 7);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCornerRight, 9, 8);

        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 6, 8);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 7, 8);
        levelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 8, 8);

        levelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 5, 9);
        levelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 6, 9);
        levelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 7, 9);
        levelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 8, 9);
        levelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 9, 9);

        levelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Banana, "banana", 5,5);
        levelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Mayo, "mayo", 5,6);
        levelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Skull, "skull", 5,7);
        levelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Posion, "poison", 9,6);
        levelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.PiePurple, "piePurple", 8,8);

        levelBuildingHelper.createPanOnTile(this,engine, 7,8)
        //levelBuildingHelper.createBackgroundTile(this, wallColor, 8,5);
    }
}
