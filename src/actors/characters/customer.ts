import { ActionContext, Engine, Vector } from "excalibur";
import { Resources } from "../../resources";
import { Humanoid } from "./humanoid";

export class Customer extends Humanoid {
    private speed: number = 200;

    public wantsMeal: string;
    public frustratedTime: number;
    public attackTime: number;

    public onInitialize(engine: Engine) {
        this.sprites = Resources.Customer1;
        super.onInitialize(engine);
    }

    public walkToTile(target: Vector): ActionContext {
        return this.actions.moveTo(target.x, target.y, this.speed);        
    }
}