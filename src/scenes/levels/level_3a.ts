import { Actor, Color, Engine, Resource, vec } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { Recipe, Recipes } from "../../util/config/recipes";
import { Resources } from "../../resources";
import { LevelBuildingHelper } from "../../util/helpers/levelBuildingHelper";
import { LevelBase } from "./levelBase";
import { Level3 } from "./level_3";

export class Level3a extends Level3 {
    public nextLevel: string = "level_1b";
    
    protected borderWidth: number = 13;
    protected borderHeight: number = 10;
    protected availableMeals: Recipe[] = [Recipes.Hotdog, Recipes.Cheesedog, Recipes.Drumstick, Recipes.Taco];

    protected customerFrustratedTime = 50000; // ms
    protected customerAttackTime = 60000; // ms
    protected customerSpawnSpeed = 12000;

    public levelName = "level_3a";
    protected initialCustomersToServe: number = 10;

    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 1, "ToiletPaper" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 2, "Meat" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 3, "Bread" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 2, 4, "Cheese" );
        
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 1, "Stick" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 2, "GreenLeaf" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 12, 3, "Meat" );
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 11, 4, "Cheese" );
    }
}
