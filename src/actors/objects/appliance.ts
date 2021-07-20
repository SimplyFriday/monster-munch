import { Actor } from "excalibur";

export class Appliance extends Actor {
    public applianceType:ApplianceType;
}

export enum ApplianceType {
    Stove
}