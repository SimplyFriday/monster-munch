import { Actor, Engine } from "excalibur";
import { Recipe } from "../../actors/objects/recipes";
import { LevelBase } from "./levelBase";

export class Level1 extends LevelBase {
    protected availableMeals: Recipe[];
    
    protected addSeatsAndDoors(): Actor[] {
        throw new Error("Method not implemented.");
    }
    protected addBackgroundTiles() {
        throw new Error("Method not implemented.");
    }
    protected addForegroundTiles() {
        throw new Error("Method not implemented.");
    }
    protected addAppliances() {
        throw new Error("Method not implemented.");
    }
    protected addPans(engine: Engine) {
        throw new Error("Method not implemented.");
    }
    protected addItems() {
        throw new Error("Method not implemented.");
    }

    public onInitialize(engine:Engine) { 
        super.onInitialize(engine);
    }
}