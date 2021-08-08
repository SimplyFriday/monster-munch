import { Actor, Animation, Engine, Sprite, SpriteSheet, Timer, vec, Vector } from "excalibur";
import { Resources } from "../../resources";
import { LevelBase } from "../../scenes/levels/levelBase";
import { LevelBuildingHelper } from "../../util/helpers/levelBuildingHelper";
import { BalloonIconSprites } from "../../util/spritesheet_wrappers/balloonIconSprites";
import { Meal } from "../objects/meal";
import { Recipe } from "../../util/config/recipes";
import { Seat } from "../objects/seat";
import { Humanoid } from "./humanoid";
import { AnimationHelper } from "excalibur-bootstraps";

export class Customer extends Humanoid {
    private speed: number = 160;
    private actionTimer: CustomerTimer;
    private mealCheckPos: Vector;
    private initialPosition: Vector;
    private wantsBalloon: Sprite;
    private wantsSprite: Sprite;
    private grumpyBubble: Sprite;
    private isHappy: boolean = false;

    public wantsMeal: Recipe;
    public frustratedTime: number;
    public attackTime: number;
    public seat: Seat;
    public timeElapsed: number;
    public tickSpeed:number = 100;
    
    public get isAttacking () {
        return this.timeElapsed >= this.attackTime
    }

    public onInitialize(engine: Engine) {
        this.sprites = Resources.Customer1;
        super.onInitialize(engine);

        this.initialPosition = this.pos.clone();
        this.wantsBalloon = AnimationHelper.getScaledSprite(BalloonIconSprites.EmptyBalloon, 0.8);
        this.wantsSprite = AnimationHelper.getScaledSprite(this.wantsMeal.resultSprite.clone(), 0.70)

        this.grumpyBubble = AnimationHelper.getScaledSprite(BalloonIconSprites.AngryBalloon, 0.8)
    }

    public onPreDraw(ctx: CanvasRenderingContext2D, _delta: number) {
        if (!this.isAttacking && !this.isHappy) {
            let drawGrumpy = false;

            if (this.timeElapsed >= this.frustratedTime) {
                drawGrumpy = this.timeElapsed % 1000 > 500;
            }

            if (drawGrumpy) {
                this.grumpyBubble.draw(ctx, 0, -50);
            } else {
                this.wantsBalloon.draw(ctx, 0, -50);
                this.wantsSprite.draw(ctx, 0, -50);
            }
        }

    }

    public walkToSeat() {
        let p = this.actions.moveTo(this.seat.pos.x, this.seat.pos.y, this.speed).asPromise();
        this.timeElapsed = 0;

        p.then(() => {
            console.log("customer arrived at seat")
            this.facing = this.seat.facing;
            
            this.mealCheckPos = this.getFacingTargetPos(0.5);

            this.actionTimer = new CustomerTimer({
                interval: this.tickSpeed,
                fcn: this.routine,
                repeats: true
            });

            this.actionTimer.customer = this;
            this.scene.add(this.actionTimer);
        });
    }

    public leaveHappy() {
        this.isHappy = true;
        let level = (this.scene as LevelBase);
        
        if (level.nextLevel) {
            level.customersToServe--;
        } else {
            level.customersToServe++;
        }

        Resources.CustomerBite.play().then(() => {
            Resources.CashRegister.play().then(() => {
                this.actions.moveTo(this.initialPosition.x, this.initialPosition.y, this.speed).asPromise().then(() => {
                    this.kill();
                });
            });
        });
    }

    private routine() {
        let a = this as unknown as CustomerTimer;

        if (a) {
            if (a.customer.isKilled()) {
                a.cancel();
                return;
            }

            if (!a.customer.isAttacking) {
                let m: Actor[] = [];
                
                let doneSearching = false;
                let nextSearchX = a.customer.mealCheckPos.x - LevelBuildingHelper.tileWidth / 2;
                let nextSearchY = a.customer.mealCheckPos.y - LevelBuildingHelper.tileHeight / 2;
                let step = 15;
                
                while (!doneSearching) {
                     console.log("customer at " + JSON.stringify(a.customer.pos) + "looking for meal at (" + nextSearchX + "," + nextSearchY + ")")
                    //console.log(JSON.stringify(a.customer.pos))
                    m = a.customer.scene.actors.filter(x => x instanceof Meal &&
                                x.name === a.customer.wantsMeal.resultName &&
                                !x.isHeld &&
                                x.contains(nextSearchX, nextSearchY))
                    
                    if (m.length > 0) {
                        doneSearching = true;
                    } else {
                        if (nextSearchX <= a.customer.mealCheckPos.x + LevelBuildingHelper.tileWidth / 2) {
                            nextSearchX += step;
                        } else if (nextSearchY <= a.customer.mealCheckPos.y + LevelBuildingHelper.tileHeight / 2) {
                            nextSearchX = a.customer.mealCheckPos.x - LevelBuildingHelper.tileWidth / 2;
                            nextSearchY += step;
                        } else {
                            doneSearching = true;
                        }
                    }
                }

                if (m.length > 0) {
                    // TODO eat animation or something
                    m[0].kill();
                    (a.scene as LevelBase).removeCustomer(a.customer);
                    a.customer.leaveHappy();
                } else {
                    a.customer.timeElapsed += a.customer.tickSpeed;
                }
            } else {
                let player = (a.customer.scene as LevelBase).player;
 
                if (a.customer.actionQueue.getActions().filter(x=>!x.isComplete).length === 0) {
                    a.customer.actions.moveTo (player.pos.x, player.pos.y, a.customer.speed);
                }

                if (a.customer.pos.distance(player.pos) <= 50 && a.customer.isAttacking) {
                    player.hurt();

                    if (!Resources.CustomerBite.isPlaying()) {
                        Resources.CustomerBite.play();
                    }
                }
            }
        }
    }
}

export class CustomerTimer extends Timer {
    public customer: Customer;
}