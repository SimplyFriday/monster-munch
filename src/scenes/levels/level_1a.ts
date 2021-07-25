import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Level1 } from "./level_1";

export class Level1a extends Level1 {
    public levelName = "level_1a";
    protected availableMeals: Recipe[] = [Recipes.BananaPie, Recipes.BananaCandy, Recipes.Cookie ];
    protected customerSpawnSpeed = 10000;
    public nextLevel:string = "level_1b";
    
    public customersToServe = 10;

    protected addItems () {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 2, 4, "FlourBag" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 3, 4, "Banana" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 4, 4, "EggRaw" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 4, "SyringeYellow")
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 6, 3, "WhiteGem")
    }
}