import { Recipe, Recipes } from "../../util/config/recipes";
import { LevelBuildingHelper } from "../../util/helpers/levelBuildingHelper";
import { Level1 } from "./level_1";

export class Level1b extends Level1 {
    public levelName = "level_1b";
    protected availableMeals: Recipe[] = [Recipes.Taco, Recipes.Pizza, Recipes.PepperoniPizza ];
    protected customerSpawnSpeed = 10000;
    public nextLevel:string = "level_2b";
    protected customerFrustratedTime = 40000;
    protected customerAttackTime = 50000;
    public initialCustomersToServe = 12;

    protected addItems () {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 2, 4, "FlourBag" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 3, 4, "Meat" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 4, 4, "GreenLeaf" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 4, "Cheese")
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 6, 3, "RedPot")
    }
}