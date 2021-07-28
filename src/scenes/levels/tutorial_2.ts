import { Color, Engine, Label } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { Recipe, Recipes } from "../../util/config/recipes";
import { UIHelper } from "../../util/helpers/uiHelper";
import { Resources } from "../../resources";
import { LevelBase } from "./levelBase";
import { LevelBuildingHelper } from "../../util/helpers/levelBuildingHelper";
import { InsideTileSprites } from "../../util/spritesheet_wrappers/insideTileSprites";

export class Tutorial2 extends LevelBase {
    public nextLevel: string = "level_1";
    protected borderWidth: number = 10;
    protected borderHeight: number = 10;
    
    protected customerAttackTime:number = 120000;
    protected customerFrustratedTime:number = 20000;

    protected availableMeals: Recipe[] = [Recipes.FriedEgg, Recipes.MonsterPie];
    public levelName: string = "tutorial_2";
    public isTutorial = true;

    protected initialCustomersToServe: number = 1;
    
    public onInitialize(engine:Engine) {
        super.onInitialize(engine);

        UIHelper.addTutorialButton(this, this.nextLevel);
    }

    protected addBackgroundTiles() {
        LevelBuildingHelper.createLabelAcrossTiles(this, "Customers will want a", -3, 2, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "specific meal. Make that", -3, 2.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "meal and place it on the", -3, 3, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "table in front of the customer.", -3, 3.5, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "Customers who have waited for", -3, 4.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "a while will get frustrated,", -3, 5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "indicated by their thought ", -3, 5.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "bubble starting to flash.", -3, 6, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "If you wait too long to feed", -3, 7, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "them, customers will try to eat", -3, 7.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "you! Swing your pans at them (E)", -3, 8, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "to fend off angry customers!", -3, 8.5, 4.5, Color.Magenta);

        LevelBuildingHelper.createLabelAcrossTiles(this, "Recipe cards are show on the", 5, 2, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "top left of your UI, HP and", 5, 2.5, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "remaining customers in this", 5, 3, 4.5, Color.Magenta);
        LevelBuildingHelper.createLabelAcrossTiles(this, "stage are in the top right.", 5, 3.5, 4.5, Color.Magenta);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 4, 8);
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

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 4, 7);
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
        this.customerSeats.push(LevelBuildingHelper.createSeat(this, InsideTileSprites.RedStool, "r", 3, 7.5));

        this.doors.push(LevelBuildingHelper.createWallTile (this, Resources.Door.asSprite(), 8, 10));
    }

}
