import { Engine } from "excalibur";
import { Item } from "./item";

export class Ingredient extends Item {
    public name:string;
    
    public onInitialize(engine:Engine) {
        this.canBeTrashed = true;
        super.onInitialize(engine);
    }
}