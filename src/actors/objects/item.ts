import { Actor, Engine } from "excalibur";

export abstract class Item extends Actor {
    public isHeld: boolean = false;
}
