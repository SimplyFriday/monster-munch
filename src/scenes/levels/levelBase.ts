import { Actor, Color, Engine, Scene, Sound, Sprite, TileMap, Timer, vec } from "excalibur";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { RecipeCard, UIHelper, UITimer } from "../../actors/objects/uiHelper";
import { Player } from "../../actors/characters/player";
import { Resources } from "../../resources";
import { Customer } from "../../actors/characters/customer";
import { Seat } from "../../actors/objects/seat";
import { Recipe } from "../../actors/objects/recipes";
import { Game } from "../..";

export abstract class LevelBase extends Scene {
    private uiInitialized:boolean = false;
    private uiTimer:UITimer;

    protected suppressBorder:boolean = false;
    protected musicTrack: Sound;
    protected customerSeats:Seat[] = [];
    protected doors:Actor[] = [];
    public customers:Customer[] = [];
    protected customerSpawnSpeed:number = 8000; // average number of seconds before a new customer spawns
    protected customerFrustratedTime = 10000; // ms
    protected customerAttackTime = 25000; // ms

    protected abstract borderWidth:number;
    protected abstract borderHeight:number;
    
    protected abstract availableMeals:Recipe[];
    protected abstract nextLevel:string;

    public player: Player;
    public abstract levelName:string;
    public isTutorial:boolean = false;
    public customersToServe:number = 10;

    removeCustomer(customer: Customer) {
        this.customers = this.customers.filter( x => x != customer);
    }

    public onDeactivate (oldScene:Scene, newScene:Scene) {
        super.onDeactivate(oldScene, newScene);
        this.musicTrack.stop();
    }

    public onInitialize(engine: Engine) {
        this.actors.forEach(a => {
            a.kill();
            this.remove(a);
        });

        if (!this.uiInitialized) {
            this.uiTimer = UIHelper.addLevelUI(this);
            this.uiInitialized = true;
        }

        this.player = new Player;
        this.add(this.player);

        this.camera.strategy.lockToActor(this.player);
        this.musicTrack = Resources.LevelLoop1;
        this.musicTrack.loop = true;
        
        if (!Game.muteMusic) {
            this.musicTrack.play(0.3);
        }

        if (!this.suppressBorder) {
            this.createLevelBorder();
        }

        this.addBackgroundTiles();
        this.addForegroundTiles();
        this.addAppliances();
        this.addPans(engine);
        this.addItems();
        this.addSeatsAndDoors();

        for (let i = 0; i < this.availableMeals.length; i++) {
            console.log("adding card for " + this.availableMeals[i].resultName);

            let a = new RecipeCard ();
            a.x = 25 + i * -100;
            a.y = 50;
            a.xRelativeTo = "center"

            a.setRecipe(this.availableMeals[i]);
            this.uiTimer.uiElements.push(a);

            this.add(a);
        }

        engine.backgroundColor = new Color(245, 242, 254);
    }

    public onPreUpdate(engine:Engine, delta:number) {
        if (this.customers.length < this.customerSeats.length) {
            console.log("Found " + (this.customerSeats.length - this.customers.length) + " empty seats")

            let b = this.customerSpawnSpeed / 3;
            let v = this.customerSpawnSpeed * (4/3);
            let i = b + Math.random() * v;

            let di = Math.floor(Math.random() * this.doors.length);
            let door = this.doors[di];

            let customer = LevelBuildingHelper.createCustomer(this, door.pos);
            let nextFreeSeat = this.customerSeats.filter(x => !this.customers.some(c => c.seat === x))[0];
            customer.seat = nextFreeSeat;
            customer.visible = false;

            let mi = Math.floor(Math.random() * this.availableMeals.length);
            customer.wantsMeal = this.availableMeals[mi];
            customer.frustratedTime = this.customerFrustratedTime;
            customer.attackTime = this.customerAttackTime;

            this.customers.push(customer);

            let spawnTimer = new LevelTimer({
                interval:i,
                repeats:false,
                fcn:this.spawnCustomer
            });

            spawnTimer.level = this;
            spawnTimer.customer = customer;

            this.add(spawnTimer);

            if (this.customersToServe <= 0) {
                this.musicTrack.stop();

                Resources.LevelWin.play(1).then (() => {
                    engine.goToScene(this.nextLevel);
                });
            }
        }
    }

    protected abstract addBackgroundTiles();
    protected abstract addForegroundTiles();
    protected abstract addAppliances();
    protected abstract addPans(engine:Engine);
    protected abstract addItems();
    protected abstract addSeatsAndDoors();

    private createLevelBorder() {
        let border = Resources.WarningSquare.asSprite();

        for (let i = 0; i <= this.borderWidth; i++) {
            LevelBuildingHelper.createWallTile(this, border, i, 0);
            LevelBuildingHelper.createWallTile(this, border, i, this.borderHeight);
        }

        for (let i = 0; i < this.borderHeight; i++) {
            LevelBuildingHelper.createWallTile(this, border, 0, i);
            LevelBuildingHelper.createWallTile(this, border, this.borderWidth, i);
        }
    }

    public toggleMusic() {
        Game.muteMusic = !Game.muteMusic;
        
        if (Game.muteMusic) {
            this.musicTrack.stop();
        } else {
            this.musicTrack.play();
        }
    }

    protected spawnCustomer () {
        let timer = (this as unknown as LevelTimer);

        if (timer) {
            timer.level.add(timer.customer);
            timer.customer.walkToSeat();
            timer.customer.visible = true;
            Resources.NewCustomer.play();
        }
    }
}

export class LevelTimer extends Timer {
    public level:LevelBase;
    public customer:Customer;
}