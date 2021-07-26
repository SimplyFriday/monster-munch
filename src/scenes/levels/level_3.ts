import { Actor, Color, Engine, Resource, vec } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideFloorWallSprites } from "../../actors/objects/insideFloorWallSprites";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Resources } from "../../resources";
import { LevelBase } from "./levelBase";

export class Level3 extends LevelBase {
    public nextLevel: string = "level_1a";
    
    protected borderWidth: number = 13;
    protected borderHeight: number = 10;
    protected availableMeals: Recipe[] = [Recipes.MonsterPie, Recipes.FlipPhone, Recipes.CowboyBoots];

    protected customerFrustratedTime = 50000; // ms
    protected customerAttackTime = 65000; // ms
    protected customerSpawnSpeed = 16000;

    public levelName = "level_3";
    protected initialCustomersToServe: number = 10;

    public onInitialize(engine:Engine) { 
        super.onInitialize(engine);
    }

    protected addBackgroundTiles() {
        // Left counter area
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 1, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 2, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 3, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 4, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 5, 5);
        
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceStandalone, 5, 2);

        // Right counter area
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 8, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 9, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 10, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 11, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 12, 5);
        
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceStandalone, 8, 2);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 6, 8);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 8, 8);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 10, 8);
    }

    protected addForegroundTiles() {
        // Left counter area
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerBottomLeft, 1, 4);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerTopRight, 5, 4);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 2, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 3, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 4, 4);

        // Right counter area
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 12, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 12, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 12, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCornerRight, 12, 4);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 8, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerTopLeft, 8, 4);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 9, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 10, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 11, 4);

        // Table Area
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 6, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 8, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 10, 7);
        
    };
    protected addAppliances() {
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 5, 1);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 8, 1);

        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 4, 4);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 5, 4);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 8, 4);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 9, 4);


        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Trashcan, 7, 1);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Trashcan, 6, 1);
    };
    protected addPans(engine:Engine) {
        LevelBuildingHelper.createPanOnTile(this,engine, 3,4)
        LevelBuildingHelper.createPanOnTile(this,engine, 10,4)
    };

    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 1, "Poison" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 2, "FlourBag" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 3, "Apple" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 2, 4, "FloppyDisk" );
        
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 1, "StormCloud" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 2, "SyringeGreen" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 3, "Meat" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 11, 4, "Poison" );
    }

    protected addSeatsAndDoors() {
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "u", 8, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "l", 11, 7.5));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "r", 5, 7.5));

        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Door.asSprite(), 3, 10));
    }
}
