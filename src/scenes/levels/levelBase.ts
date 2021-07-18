import { Actor, Engine, Scene, TileMap } from "excalibur";
import { UIHelper } from "../../actors/objects/uiHelper";
import { Player } from "../../actors/player/player";

export class LevelBase extends Scene {
    protected grid: Actor[][] = [];
    protected player:Actor;

    constructor(engine: Engine) {
        super(engine);
    }

    public onInitialize () {
        UIHelper.addLevelUI(this);
        
        this.player = new Player;
        this.add(this.player);

        this.camera.strategy.lockToActor(this.player);
    }
}