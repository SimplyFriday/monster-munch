import { Collider, CollisionStartEvent, CollisionType, Engine, Shape } from "excalibur";
import { Appliance, ApplianceType } from "./appliance";
import { Ingredient } from "./ingredient";
import { Item } from "./item";
import { LevelBuildingHelper } from "./levelBuildingHelper";

export class Pan extends Item {
    private cookTimeMultiplier: number = 1000;
    public ingredients: string[] = [];
    private cookTime: number = 0;
    private isCooked:boolean = false;
    private isBurned:boolean = false;

    public onInitialize(engine: Engine) {
        super.onInitialize(engine);

        this.body.collider.type = CollisionType.Passive;
        this.body.collider.shape = Shape.Box(LevelBuildingHelper.tileHeight, LevelBuildingHelper.tileHeight);

        this.body.collider.on("precollision", (e: CollisionStartEvent<Collider>) => {
            if (this.cookTime === 0 && e.other.body.actor instanceof Ingredient) {
                if (!e.other.body.actor.isHeld && !this.isHeld) {
                    this.ingredients.push(e.other.body.actor.Name); // slice because byref strings are sadness
                    e.other.body.actor.kill();
                }
            }

            if (e.other.body.actor instanceof Appliance &&
                    e.other.body.actor.applianceType === ApplianceType.Stove &&
                    this.ingredients.length > 0) {

                this.cookTime++;

                if (!this.isCooked &&
                    this.cookTime > this.ingredients.length * this.cookTimeMultiplier) {
                    this.isCooked = true;
                }

                if (this.isCooked && !this.isBurned &&
                    this.cookTime > this.ingredients.length * this.cookTimeMultiplier &&
                    this.cookTime < this.ingredients.length * this.cookTimeMultiplier * 3) {
                    this.isBurned = true;
                }
            }
        });
    }

    public onPreUpdate(engine: Engine, delta: number) {
        if (this.ingredients.length > 0) {
            this.setDrawing("filled");
        }
    }
}
