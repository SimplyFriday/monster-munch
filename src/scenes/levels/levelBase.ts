import { Actor, Engine, Scene, Sound, Sprite, TileMap, Timer, vec } from "excalibur";
import { LevelBuildingHelper } from "../../actors/objects/levelBuildingHelper";
import { UIHelper } from "../../actors/objects/uiHelper";
import { Player } from "../../actors/characters/player";
import { Resources } from "../../resources";
import { Customer } from "../../actors/characters/customer";
import { Seat } from "../../actors/objects/seat";
import { Recipe, RecipeCard } from "../../actors/objects/recipes";

export abstract class LevelBase extends Scene {
    protected musicTrack: Sound;
    protected customerSeats:Seat[] = [];
    protected doors:Actor[] = [];
    public customers:Customer[] = [];
    protected customerSpawnSpeed:number = 8000; // average number of seconds before a new customer spawns
    protected customerFrustratedTime = 10000; // ms
    protected customerAttackTime = 25000; // ms

    protected abstract availableMeals:Recipe[];

    public muteMusic: boolean = false;
    public player: Player;

    removeCustomer(customer: Customer) {
        this.customers = this.customers.filter( x => x != customer);
    }

    public onInitialize(engine: Engine) {
        UIHelper.addLevelUI(this);

        this.player = new Player;
        this.add(this.player);

        this.camera.strategy.lockToActor(this.player);
        this.musicTrack = Resources.LevelLoop1;
        this.musicTrack.loop = true;
        this.musicTrack.play();

        this.addBackgroundTiles();
        this.addForegroundTiles();
        this.addAppliances();
        this.addPans(engine);
        this.addItems();
        this.addSeatsAndDoors();

        for (let i = 0; i < this.availableMeals.length; i++) {
            console.log("adding card for " + this.availableMeals[i].resultName);

            let a = new RecipeCard ({
                pos: vec(25 + i * 100, 50)
            });

            a.setRecipe(this.availableMeals[i]);
            this.add(a);
        }
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
        }
    }

    protected abstract addBackgroundTiles();
    protected abstract addForegroundTiles();
    protected abstract addAppliances();
    protected abstract addPans(engine:Engine);
    protected abstract addItems();
    protected abstract addSeatsAndDoors();

    public toggleMusic() {
        this.muteMusic = !this.muteMusic;
        if (this.muteMusic) {
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
        }
    }
}

export class LevelTimer extends Timer {
    public level:LevelBase;
    public customer:Customer;
}