import { Actor } from "excalibur";
import { Item } from "./item";
import { Meal } from "./meal";

export class Appliance extends Actor {
    public applianceType:ApplianceType;

    public get isOccupied ():boolean {
        let ret = false;

        this.scene.actors.forEach(a => {
            if (a instanceof Meal && this.body.collider.touching(a.body.collider)) {
                ret = true;
            }
        });

        return ret;
    }
}

export enum ApplianceType {
    Stove,
    ServingPlate,
    Trashcan
}