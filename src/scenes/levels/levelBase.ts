import { Actor, Engine, Scene, Sound, Sprite, TileMap } from "excalibur";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { UIHelper } from "../../actors/objects/uiHelper";
import { Player } from "../../actors/player/player";
import { Resources } from "../../resources";

export abstract class LevelBase extends Scene {
    protected grid: Actor[][] = [];
    protected player: Actor;
    protected musicTrack: Sound;
    public muteMusic: boolean = false;
    protected baseTile?: Sprite;

    constructor(engine: Engine) {
        super(engine);
    }

    public onInitialize(engine: Engine) {
        UIHelper.addLevelUI(this);

        this.player = new Player;
        this.add(this.player);

        this.camera.strategy.lockToActor(this.player);
        this.musicTrack = Resources.LevelLoop1;
        this.musicTrack.loop = true;
        this.musicTrack.play();

        // if (this.baseTile) {
        //     for (let r = 0; r < 20; r++) {
        //         for (let c = 0; c < 20; c++) {
        //             // TODO background tiles as actors seems to nuke performance...
        //             //LevelBuildingHelper.createBackgroundTile(this, this.baseTile, r, c);
        //         }
        //     }
        // }

        this.addBackgroundTiles();
        this.addForegroundTiles();
        this.addAppliances();
        this.addPans(engine);
        this.addItems();
    }

    protected abstract addBackgroundTiles();
    protected abstract addForegroundTiles();
    protected abstract addAppliances();
    protected abstract addPans(engine:Engine);
    protected abstract addItems();

    public toggleMusic() {
        this.muteMusic = !this.muteMusic;
        if (this.muteMusic) {
            this.musicTrack.stop();
        } else {
            this.musicTrack.play();
        }
    }
}