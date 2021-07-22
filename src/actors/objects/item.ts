import { Actor, CollisionType, Engine } from "excalibur";

export abstract class Item extends Actor {
    public isHeld: boolean = false;
    public canBeTrashed:boolean = false;

    public onPreUpdate(engine:Engine, delta:number) {
        if (this.isHeld) {
            this.body.collider.type = CollisionType.PreventCollision;
        } else {
            this.body.collider.type = CollisionType.Fixed;
        }
    }
}
