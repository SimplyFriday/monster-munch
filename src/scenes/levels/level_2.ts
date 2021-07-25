import { Actor, Engine } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Resources } from "../../resources";
import { LevelBase } from "./levelBase";

export class Level2 extends LevelBase {
    public nextLevel: string = "level_2a";

    protected borderWidth: number = 0;
    protected borderHeight: number = 0;
    protected suppressBorder:boolean = true;

    protected availableMeals: Recipe[] = [Recipes.Cookie, Recipes.CrunchyCake, Recipes.IceCream, Recipes.SpecialCrunchPie];
    public levelName = "level_2";
    protected customerFrustratedTime = 35000;
    protected customerAttackTime = 55000;
    protected customerSpawnSpeed = 15000;
    
    public initialCustomersToServe = 8;

    protected addSeatsAndDoors() {
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 3, 8));
        //this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 4, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 5, 8));
        //this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 6, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 7, 8));
        
        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Door.asSprite(), 5, 10.35));
    }
    protected addBackgroundTiles() {
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 1, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 2, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 3, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 4, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 5, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 6, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 7, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 8, 1);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 9, 1);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 1, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 2, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 3, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 4, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 6, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 7, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 8, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 9, 11);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 0, 11);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 10, 11);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_H_BottomLeftLeg, 3,8);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_H_BottomMidNoLeg, 4,8);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_H_BottomMidNoLeg, 5,8);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_H_BottomMidNoLeg, 6,8);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_H_BottomRightLeg, 7,8);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 3, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 4, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 5, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 6, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 7, 5);
    }
    protected addForegroundTiles() {
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_H_TopLeft, 3, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_H_TopMid, 4, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_H_TopMid, 5, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_H_TopMid, 6, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_H_TopRight, 7, 7);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerTopLeft, 0, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 1, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 2, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 3, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 4, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 5, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 6, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 7, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 8, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 9, 0);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerTopRight, 10, 0);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 0, 9);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 10, 9);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerBottomLeft, 0, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 1, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 2, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 3, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 4, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 5, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 6, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 7, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 8, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 9, 10);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCornerRight, 10, 10);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerTopLeft, 3, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 4, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 5, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterMiddleFull, 6, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerTopRight, 7, 4);

    }
    protected addAppliances() {
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 0, 3);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 0, 4);

        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 2, 0);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 3, 0);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 4, 0);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 5, 0);

        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Trashcan, 1, 9);
    }
    protected addPans(engine: Engine) {
        LevelBuildingHelper.createPanOnTile(this,engine, 0,1);
        LevelBuildingHelper.createPanOnTile(this,engine, 0,2);
        LevelBuildingHelper.createPanOnTile(this,engine, 0,5);
        LevelBuildingHelper.createPanOnTile(this,engine, 0,6);

    }
    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 2, "FlourBag" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 3, "FlourBag" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 4, "EggRaw" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 5, "EggRaw" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 6, "YellowPot" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 7, "WhiteGem" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 8, "PurpleGem" );
    }

    public onInitialize(engine:Engine) { 
        super.onInitialize(engine);
    }
}