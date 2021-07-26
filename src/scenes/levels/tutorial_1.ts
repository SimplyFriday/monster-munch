import { Color, Engine, Label } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { Recipe, Recipes } from "../../actors/objects/recipes";
import { UIHelper } from "../../actors/objects/uiHelper";
import { LevelBase } from "./levelBase";

export class Tutorial1 extends LevelBase {
    public nextLevel: string = "tutorial_2";
    protected borderWidth: number = 10;
    protected borderHeight: number = 10;

    protected availableMeals: Recipe[] = [Recipes.FriedEgg, Recipes.MonsterPie];
    public levelName: string = "tutorial_1";
    public isTutorial = true;

    protected initialCustomersToServe: number = 9001;

    public override onInitialize(engine:Engine) {
        super.onInitialize(engine);

        UIHelper.addTutorialButton(this, this.nextLevel);
    }

    protected addBackgroundTiles() {
        LevelBuildingHelper.createLabelAcrossTiles(this, "Use the space bar to", -3, 2, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "pick up or set down items.", -3, 2.5, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "Ingredients will respawn", -3, 4, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "if there is enough space.", -3, 4.5, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "Ingredients can be set", -3, 7, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "down into pans.", -3, 7.5, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "Pans placed on ranges", 13, 2.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "start to cook if they", 13, 3, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "have ingredients.", 13, 3.5, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "This is a serving board.", 13, 7.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "Swing a pan over it with E", 13, 8, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "when the pan turns golden", 13, 8.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "to create a cooked meal.", 13, 9, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "Set down an ingredient or swing", 4, 5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "a pan over the trash can ", 4, 5.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "to throw away the ingredient(s).", 4, 6, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "Click the continue button", 5, 12, 13, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "to continue the tutorial.", 5, 12.5, 4.5, Color.Magenta);
    }
    protected addForegroundTiles() {
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 9);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 1);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 2);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 3);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 4);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 1, 9);
    }
    protected addAppliances() {
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 9, 2);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 9, 3);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 9, 7);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Trashcan, 4, 4);
    }
    protected addPans(engine: Engine) {
        LevelBuildingHelper.createPanOnTile(this,engine, 1,8)
    }
    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 2, "Apple" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 3, "EggRaw" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 4, "Poison" )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 1, 5, "FlourBag" )
    }
    protected addSeatsAndDoors() {
        //throw new Error("Method not implemented.");
    }

}