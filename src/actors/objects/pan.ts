import { Collider, CollisionStartEvent, CollisionType, Engine, Shape } from "excalibur";
import { Ingredient } from "./ingredient";
import { Item } from "./item";
import { LevelBuildingHelper } from "./levelBuildingHelper";

export class Pan extends Item {
    public ingredients:string [] = [];

    public onInitialize(engine:Engine) {
        super.onInitialize(engine);

        this.body.collider.type = CollisionType.Passive;
        this.body.collider.shape = Shape.Box(LevelBuildingHelper.tileHeight, LevelBuildingHelper.tileHeight);

        this.body.collider.on("precollision", (e:CollisionStartEvent<Collider>) => {
            if (e.other.body.actor instanceof Ingredient){
                if (!e.other.body.actor.isHeld && !this.isHeld) 
                {
                    this.ingredients.push(e.other.body.actor.Name); // slice because byref strings are sadness
                    e.other.body.actor.kill();

                    alert("pan contains: " + JSON.stringify(this.ingredients));
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
