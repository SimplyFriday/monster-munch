import { Collider, CollisionStartEvent, CollisionType, Engine, Shape, Vector, Animation, isCollider, resetObsoleteCounter } from "excalibur";
import { Resources } from "../../resources";
import { LevelBase } from "../../scenes/levels/levelBase";
import { Customer } from "../characters/customer";
import { Appliance, ApplianceType } from "./appliance";
import { Ingredient } from "./ingredient";
import { Item } from "./item";
import { ItemIconSprites } from "./itemIconSprites";
import { LevelBuildingHelper } from "./levelBuildingHelper";
import { Recipe, Recipes } from "./recipes";

export class Pan extends Item {
    private cookTimeMultiplier: number = 500;
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

        // TODO refactor this to use onPreUpdate or something with a delta
        // Currently it takes longer to cook stuff on slower machines
        this.body.collider.on("precollision", (e: CollisionStartEvent<Collider>) => {
            let otherActor = e.other.body.actor;

            if (this.cookTime === 0 && otherActor instanceof Ingredient) {
                if (!otherActor.isHeld && !this.isHeld) {
                    this.ingredients.push(otherActor.name);
                    otherActor.kill();
                }
            }

            if (otherActor instanceof Appliance &&
                otherActor.applianceType === ApplianceType.Stove &&
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

            if (this.isAttacking) {
                /////////////////////////////////
                ////////// Plate Meal ///////////
                /////////////////////////////////
                if ( this.ingredients.length > 0 && 
                        otherActor instanceof Appliance && 
                        otherActor.applianceType === ApplianceType.ServingPlate &&
                        this.isDone ) {
                    let product:Recipe;

                    for (let r in Recipes) {
                        if (Recipes[r].ingredientsEqual(this.ingredients)) {
                            product = Recipes[r];
                        }
                    }

                    if (product && !this.isBurned) {
                        LevelBuildingHelper.createMeal(this.scene, product.resultSprite, product.resultName, otherActor.pos);
                    } else {
                        LevelBuildingHelper.createMeal(this.scene, ItemIconSprites.Trash, "inedible mush", otherActor.pos);
                    }

                    this.reset();
                }
            }
            /////////////////////////////////
            ///////// Hit Customer //////////
            /////////////////////////////////
            if (otherActor instanceof Customer && this.isAttacking) {
                (this.scene as LevelBase).removeCustomer(otherActor);
                Resources.Bonk1.play(1);
                otherActor.kill();
                this.reset();
            }
        });
    }
    
    private reset() {
        this.ingredients = [];
        this.isBurned = false;
        this.isDone = false;
        this.cookTime = 0;
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
