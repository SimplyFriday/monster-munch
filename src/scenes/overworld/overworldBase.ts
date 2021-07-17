import { Actor, Engine, Scene, TileMap } from "excalibur";

export class OverworldBase extends Scene {
    protected grid: Actor[][] = [];

    constructor(engine: Engine) {
        super(engine);
    }
}