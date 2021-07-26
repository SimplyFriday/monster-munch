import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Resources } from "../../resources";
import { Level2 } from "./level_2";

export class Level2b extends Level2 {
    public nextLevel: string = "level_3b";

    protected borderWidth: number = 0;
    protected borderHeight: number = 0;
    protected suppressBorder:boolean = true;

    protected availableMeals: Recipe[] = [Recipes.EnergyDrink, Recipes.MonsterPie, Recipes.Cookie, Recipes.FriedEgg, Recipes.BananaPie, Recipes.SpecialCrunchPie];
    public levelName = "level_2b";
    protected customerFrustratedTime = 42000;
    protected customerAttackTime = 50000;
    protected customerSpawnSpeed = 5000;
    public initialCustomersToServe = 15;

    protected addSeatsAndDoors() {
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 3, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 4, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 5, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 6, 8));
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.GreyStool, "u", 7, 8));
        
        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Door.asSprite(), 5, 10.35));
    }

    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 1, "PurpleGem" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 2, "Poison" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 3, "StormCloud" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 4, "FlourBag" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 5, "Apple" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 6, "Banana" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 7, "EggRaw" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 8, "YellowPot" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 10, 9, "WhiteGem" );
    }
}