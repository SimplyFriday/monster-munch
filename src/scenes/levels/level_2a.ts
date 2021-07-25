import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Resources } from "../../resources";
import { Level2 } from "./level_2";

export class Level2a extends Level2 {
    public nextLevel: string = "level_2b";

    protected borderWidth: number = 0;
    protected borderHeight: number = 0;
    protected suppressBorder:boolean = true;

    protected availableMeals: Recipe[] = [Recipes.Bone, Recipes.FlipPhone, Recipes.Hotdog, Recipes.EnergyDrink];
    public levelName = "level_2a";
    protected customerFrustratedTime = 35000;
    protected customerAttackTime = 55000;
    protected customerSpawnSpeed = 13000;
    public customersToServe = 12;

    protected addSeatsAndDoors() {
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 3, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 4, 8));
        //this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 5, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 6, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 7, 8));
        
        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Door.asSprite(), 5, 10.35));
    }

    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 2, "Poison" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 3, "Skull" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 4, "Drumstick" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 5, "StormCloud" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 6, "FloppyDisk" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 7, "ToiletPaper" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 8, "Meat" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 9, "Bread" );
    }
}