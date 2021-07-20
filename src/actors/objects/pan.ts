import { Collider, CollisionStartEvent, CollisionType, Engine, Shape, Vector, Animation } from "excalibur";
import { Appliance, ApplianceType } from "./appliance";
import { Ingredient } from "./ingredient";
import { Item } from "./item";
import { LevelBuildingHelper } from "./levelBuildingHelper";

export class Pan extends Item {
    private cookTimeMultiplier: number = 1000;
    public ingredients: string[] = [];
    public attackAnimation: Animation;
    public isAttacking: boolean = false;

    private cookTime: number = 0;
    private isDone: boolean = false;
    private isBurned: boolean = false;

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
                this.ingredients.length > 0 &&
                this.isHeld === false) {

                this.cookTime++;

                if (!this.isDone &&
                    this.cookTime > this.ingredients.length * this.cookTimeMultiplier) {
                    this.isDone = true;
                }

                if (this.isDone && !this.isBurned &&
                    this.cookTime > this.ingredients.length * this.cookTimeMultiplier * 3) {
                    this.isBurned = true;
                }
            }
        });
    }

    public onPreUpdate(engine: Engine, delta: number) {
        // Render
        if (!this.isAttacking) {
            if (this.isBurned) {
                this.setDrawing("burned");
            } else if (this.isDone) {
                this.setDrawing("done");
            } else if (this.cookTime > 0) {
                this.setDrawing("cooking");
            } else if (this.ingredients.length > 0) {
                this.setDrawing("filled");
            } else {
                this.setDrawing("empty");
            }
        } else {
            if (this.attackAnimation.isDone()) {
                this.isAttacking = false;
            }
        }
    }

    public attack(pos: Vector, facing: string) {
        this.isAttacking = true;
        this.pos = pos;
        this.setDrawing("attack");

        switch (facing) {
            case "r":
                this.attackAnimation.flipHorizontal = true;
                break;
            default:
                this.attackAnimation.flipHorizontal = false;
        }
    }
}
