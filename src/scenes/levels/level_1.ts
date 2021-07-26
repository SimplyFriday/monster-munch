import { Actor, Engine } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Resources } from "../../resources";
import { LevelBase } from "./levelBase";

export class Level1 extends LevelBase {
    public nextLevel: string = "level_2";

    protected borderWidth: number = 10;
    protected borderHeight: number = 10;
    protected availableMeals: Recipe[] = [Recipes.FriedEgg, Recipes.Cookie, Recipes.MonsterPie];
    public levelName = "level_1";
    protected customerFrustratedTime = 45000;
    protected customerAttackTime = 65000;
    protected customerSpawnSpeed = 18000;
    
    public initialCustomersToServe = 5;

    protected addSeatsAndDoors() {
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "u", 4, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "u", 6, 8));

        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Door.asSprite(), 10, 9));
    }
    protected addBackgroundTiles() {
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 4, 8);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 6, 8);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 1, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 2, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 3, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 4, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 5, 5);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 6, 5);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceStandalone, 9, 7);
    }
    protected addForegroundTiles() {
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 4, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 6, 7);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerBottomLeft, 1, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 2, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 3, 4);        
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 4, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 5, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCornerRight, 6, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterStandalone, 6, 3);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterStandalone, 9, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 6);
        
    }
    protected addAppliances() {
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 9, 2.5);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 9, 3.3);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 9, 5);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 9, 6);
        
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Trashcan, 4, 1);
    }
    protected addPans(engine: Engine) {
        LevelBuildingHelper.createPanOnTile(this,engine, 1,1)
        LevelBuildingHelper.createPanOnTile(this,engine, 1,2)
        LevelBuildingHelper.createPanOnTile(this,engine, 1,3)
    }
    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 2, 4, "FlourBag" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 3, 4, "Apple" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 4, 4, "EggRaw" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 4, "Poison" )
    }

    public onInitialize(engine:Engine) { 
        super.onInitialize(engine);
    }
}