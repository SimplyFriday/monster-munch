import { Actor, Color, Engine, Sprite, Timer } from "excalibur";
import { Ingredient } from "./ingredient";
import { Item } from "./item";
import { LevelBuildingHelper } from "./levelBuildingHelper";

export class IngredientSpawner extends Actor {
    private newItemTimer:IngredientTimer;

    private _ingredientName:string;
    private _ingredientSprite:Sprite;

    public setupSpawner(ingredientName:string, ingredientSprite:Sprite) {
        this._ingredientName = ingredientName;
        this._ingredientSprite = ingredientSprite;
        
        this.spawnIngredient();
        
        this.body.collider.on("collisionend", (e) => {
            let otherActor = e.other.body.actor;

            if (otherActor instanceof Item) {
                if (! this.newItemTimer) {
                    this.newItemTimer = new IngredientTimer({
                        interval: 5000, // ms
                        repeats: false,
                        fcn: this.spawnIngredient
                    });
                    this.newItemTimer.spawner = this;

                    this.scene.add(this.newItemTimer);
                }

                this.newItemTimer.reset();
            }
        });
    }

    public spawnIngredient () {
        
        if (this instanceof IngredientTimer) {
            let spawner = this.spawner;
            let obstructions = spawner.scene.actors.filter(x => x.contains(spawner.pos.x, spawner.pos.y) && x instanceof Item);

            if (obstructions.length === 0) {
                LevelBuildingHelper.createIngredientAtPosition(this.spawner.scene, 
                                                           this.spawner._ingredientSprite.clone(), 
                                                           this.spawner._ingredientName, 
                                                           this.spawner.pos.x, 
                                                           this.spawner.pos.y)
            }
        } else {
            LevelBuildingHelper.createIngredientAtPosition(this.scene, 
                                                           this._ingredientSprite.clone(), 
                                                           this._ingredientName, 
                                                           this.pos.x, 
                                                           this.pos.y)
        }
    }
}

export class IngredientTimer extends Timer {
    public spawner:IngredientSpawner;
}