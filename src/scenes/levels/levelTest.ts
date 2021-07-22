import { Actor, Color, Engine, vec } from "excalibur";
import { ApplianceType } from "../../actors/objects/appliance";
import { InsideFloorWallSprites } from "../../actors/objects/insideFloorWallSprites";
import { InsideTileSprites } from "../../actors/objects/insideTileSprites";
import { ItemIconSprites } from "../../actors/objects/itemIconSprites";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { LevelBase } from "./levelBase";

export class LevelTest extends LevelBase {
    public onInitialize(engine:Engine) { 
        this.baseTile = InsideFloorWallSprites.BlueTilePattern;
        super.onInitialize(engine);

        // TODO something less shithouse
        alert("Controls:\nWASD - Movement\nSpace - Pick up/put down\nE - Swing pan\nQ - Examine");
    }

    protected addBackgroundTiles() {
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceLeft, 5, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 6, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 7, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceCenter, 8, 9);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.CounterFaceRight, 9, 9);

        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 6, 12);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 8, 12);
        LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.Table_V_BottomLeg, 10, 12);
    }

    protected addForegroundTiles() {
        let wallColor = new Color(200, 200, 200);

        LevelBuildingHelper.createWallTile(this, wallColor, 1, 1);
        LevelBuildingHelper.createWallTile(this, wallColor, 1, 3);

        LevelBuildingHelper.createWallTile(this, wallColor, 2, 2);
        LevelBuildingHelper.createWallTile(this, wallColor, 2, 4);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 5, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterCornerBottomLeft, 5, 8);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 5);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 6);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterVerticalFull, 9, 7);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCornerRight, 9, 8);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 6, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 7, 8);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.CounterBottomCentral, 8, 8);

        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 6, 11);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 8, 11);
        LevelBuildingHelper.createWallTile(this, InsideTileSprites.Table_V_TopLarge, 10, 11);
        
    };
    protected addAppliances() {
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Stove, 9, 7);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.ServingPlate, 9, 5);
        LevelBuildingHelper.createApplianceOnTile(this, ApplianceType.Trashcan, 7, 4);
    };
    protected addPans(engine:Engine) {
        LevelBuildingHelper.createPanOnTile(this,engine, 7,8)
        LevelBuildingHelper.createPanOnTile(this,engine, 2,4)
    };

    protected addItems() {
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 8, 8, "apple", ItemIconSprites.Apple )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 5, "flour", ItemIconSprites.FlourBag )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 6, "mayo", ItemIconSprites.Mayo )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 5, 7, "poison", ItemIconSprites.Posion )
        LevelBuildingHelper.createIngrediantSpawnerOnTile(this, 9, 6, "skull", ItemIconSprites.Skull )
    }

    protected addSeats(): Actor[] {
        let seats:Actor[] = [];
        
        seats.push(LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.RedStool, 10, 12));
        seats.push(LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.RedStool, 8, 12));
        seats.push(LevelBuildingHelper.createBackgroundTile(this, InsideTileSprites.RedStool, 5, 11.5));

        let c = LevelBuildingHelper.createCustomer(this, vec(500,500) );
        c.walkToSeat(seats[0].pos, "u");
        c.wantsMeal="monsterPie";

        c = LevelBuildingHelper.createCustomer(this, vec(400,600) );
        c.walkToSeat(seats[2].pos, "r");
        c.wantsMeal="monsterPie";

        return seats;
    }
}
