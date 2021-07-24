import { Actor, Color, Engine, Resource, vec } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideFloorWallSprites } from "../../actors/objects/insideFloorWallSprites";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Resources } from "../../resources";
import { LevelBase } from "./levelBase";

export class LevelTest extends LevelBase {
    protected borderWidth: number = 15;
    protected borderHeight: number = 20;
    protected availableMeals: Recipe[] = [Recipes.FriedEgg];

    protected customerFrustratedTime = 1000; // ms
    protected customerAttackTime = 20000; // ms
    protected customerSpawnSpeed = 1;

    public levelName = "level_test";

    public onInitialize(engine:Engine) { 
        super.onInitialize(engine);

        // TODO something less shithouse
        alert("Controls:\nWASD - Movement\nSpace - Pick up/put down\nE - Swing pan\nQ - Examine\n\nSwing a pan with cooked food (yellow) or burned food (red/grey) onto the brown serving tray to create a meal. Serve meals to customers.");
    }

    protected addBackgroundTiles() {
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 5, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 6, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 7, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 8, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 9, 9);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 6, 12);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 8, 12);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 10, 12);
    }

    protected addForegroundTiles() {
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

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 6, 11);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 8, 11);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 10, 11);
        
    };
    protected addAppliances() {
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 9, 7);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 9, 5);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Trashcan, 7, 4);
    };
    protected addPans(engine:Engine) {
        LevelBuildingHelper.createPanOnTile(this,engine, 7,8)
        LevelBuildingHelper.createPanOnTile(this,engine, 2,4)
    };

    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 8, 8, "Apple" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 5, "FlourBag")
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 6, "Banana")
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 7, "Poison")
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 9, 6, "EggRaw")
    }

    protected addSeatsAndDoors() {
        //this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "u", 10, 12));
        //this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "u", 8, 12));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "r", 5, 11.5));

        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Bag.asSprite(), 3, 12));
        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Bag.asSprite(), 14, 14));
    }
}
