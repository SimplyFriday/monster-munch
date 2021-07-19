import { Actor, Engine, Scene, Sound, TileMap } from "excalibur";
import { UIHelper } from "../../actors/objects/uiHelper";
import { Player } from "../../actors/player/player";
import { Resources } from "../../resources";

export class LevelBase extends Scene {
    protected grid: Actor[][] = [];
    protected player:Actor;
    protected musicTrack:Sound;
    public muteMusic:boolean = false;

    constructor(engine: Engine) {
        super(engine);
    }

    public onInitialize (engine:Engine) {
        UIHelper.addLevelUI(this);
        
        this.player = new Player;
        this.add(this.player);

        this.camera.strategy.lockToActor(this.player);
        this.musicTrack = Resources.LevelLoop1;
        this.musicTrack.loop = true;
        this.musicTrack.play();
    }

    public toggleMusic () {
        this.muteMusic = !this.muteMusic;
        if (this.muteMusic){
            this.musicTrack.stop();
        } else {
            this.musicTrack.play();
        }
    }
}