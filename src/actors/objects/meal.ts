import { Engine } from "excalibur";
import { Item } from "./item";

export class Meal extends Item {
    public name:string;
    
    public onInitialize(engine:Engine) {
        this.canBeTrashed = true;
        super.onInitialize(engine);
    }
}