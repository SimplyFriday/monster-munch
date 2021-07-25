import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { Level1 } from "./level_1";

export class Level1b extends Level1 {
    public levelName = "level_1b";
    protected availableMeals: Recipe[] = [Recipes.Taco, Recipes.Pizza, Recipes.PepperoniPizza ];
    protected customerSpawnSpeed = 10000;
    public nextLevel:string = "level_2";

    public initialCustomersToServe = 10;

    protected addItems () {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 2, 4, "FlourBag" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 3, 4, "Meat" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 4, 4, "GreenLeaf" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 4, "Cheese")
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 6, 3, "RedPot")
    }
}