import { Color, Engine } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideFloorWallSprites } from "../../actors/objects/insideFloorWallSprites";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { LevelBase } from "./levelBase";

export class LevelTest extends LevelBase {
    public onInitialize(engine:Engine) { 
        this.baseTile = InsideFloorWallSprites.BlueTilePattern;
        super.onInitialize(engine);

        // TODO something less shithouse
        alert("Controls:\nWASD - Movement\nSpace - Pick up/put down\nE - Swing pan\nQ - Examine");
    }

    protected override addBackgroundTiles() {
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 5, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 6, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 7, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 8, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 9, 9);
    };
    protected override addForegroundTiles() {
        let wallColor = new Color(200, 200, 200);

        LevelBuildingHelper.createWallTile(this, wallColor, 1, 1);
        LevelBuildingHelper.createWallTile(this, wallColor, 1, 3);

        LevelBuildingHelper.createWallTile(this, wallColor, 2, 2);
        LevelBuildingHelper.createWallTile(this, wallColor, 2, 4);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerBottomLeft, 5, 8);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCornerRight, 9, 8);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 6, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 7, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 8, 8);
    };
    protected override addAppliances() {
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 9, 7);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 9, 5);
    };
    protected override addPans(engine:Engine) {
        LevelBuildingHelper.createPanOnTile(this,engine, 7,8)
        LevelBuildingHelper.createPanOnTile(this,engine, 2,4)
    };

    protected override addItems() {
        LevelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.FlourBag, "flour", 5,5);
        LevelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Mayo, "mayo", 5,6);
        LevelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Skull, "skull", 5,7);
        LevelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Posion, "poison", 9,6);
        LevelBuildingHelper.createIngredientOnTile(this, ItemIconSprites.Apple, "apple", 8,8);
    }
}
