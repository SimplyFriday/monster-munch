import { Actor, Color, Engine, Resource, vec } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideFloorWallSprites } from "../../actors/objects/insideFloorWallSprites";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Resources } from "../../resources";
import { LevelBase } from "./levelBase";
import { Level3 } from "./level_3";

export class Level3b extends Level3 {
    public nextLevel: string = null;
    
    protected borderWidth: number = 13;
    protected borderHeight: number = 10;
    protected availableMeals: Recipe[] = [Recipes.Pizza, Recipes.PepperoniPizza, Recipes.Burger, Recipes.Taco, Recipes.IceCream, Recipes.Cheesedog];

    protected customerFrustratedTime = 50000; // ms
    protected customerAttackTime = 60000; // ms
    protected customerSpawnSpeed = 10000;

    public levelName = "level_3b";
    protected initialCustomersToServe: number = 0;

    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 1, "FlourBag" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 2, "RedPot" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 3, "Cheese" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 2, 4, "Meat" );
        
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 1, "Bread" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 2, "GreenLeaf" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 3, "EggRaw" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 11, 4, "Meat" );
    }
}
