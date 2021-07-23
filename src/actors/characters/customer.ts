import { ActionContext, Actor, Engine, Sprite, Timer, Vector } from "excalibur";
import { Resources } from "../../resources";
import { LevelBase } from "../../scenes/levels/levelBase";
import { AnimationHelper } from "../objects/animationHelper";
import { BalloonIconSprites } from "../objects/balloonIconSprites";
import { Meal } from "../objects/meal";
import { Recipe } from "../objects/recipes";
import { Seat } from "../objects/seat";
import { Humanoid } from "./humanoid";

export class Customer extends Humanoid {
    private speed: number = 200;
    private actionTimer:CustomerTimer;
    private mealCheckPos:Vector;
    private initialPosition:Vector;
    private wantsBalloon:Sprite;
    private wantsSprite:Sprite;

    public wantsMeal: Recipe;
    public frustratedTime: number;
    public attackTime: number;
    public seat:Seat;

    public onInitialize(engine: Engine) {
        this.sprites = Resources.Customer1;
        super.onInitialize(engine);

        this.initialPosition = this.pos.clone();
        this.wantsBalloon = AnimationHelper.getScaledSprite(BalloonIconSprites.EmptyBalloon, 0.8);
        this.wantsSprite = AnimationHelper.getScaledSprite(this.wantsMeal.resultSprite, 0.70)
    }

    public onPreDraw(ctx: CanvasRenderingContext2D, _delta: number) {
        this.wantsBalloon.draw(ctx, 0, -50);
        this.wantsMeal.resultSprite.draw(ctx, 0, -50);
    }

    public walkToSeat() {
        let p = this.actions.moveTo(this.seat.pos.x, this.seat.pos.y, this.speed).asPromise();
        
        p.then( () =>{
            console.log("customer arrived at seat")
            this.facing = this.seat.facing;
            this.mealCheckPos = this.getFacingTargetPos(0.5);

            this.actionTimer = new CustomerTimer ({
                interval:50,
                fcn:this.routine,
                 repeats:true
            });
    
            this.actionTimer.customer = this;
            this.scene.add(this.actionTimer);   
        }) ;
    }

    public leaveHappy() {
        let p = this.actions.moveTo(this.initialPosition.x, this.initialPosition.y, this.speed).asPromise();
        
        p.then( () =>{
            this.kill();
        }) ;
    }

    private routine () {
        let a = this as unknown as CustomerTimer;

        if (a) {
            let m = a.customer.scene.actors.filter (x => x instanceof Meal &&
                                                         x.name === a.customer.wantsMeal.resultName &&
                                                         !x.isHeld &&
                                                         x.contains(a.customer.mealCheckPos.x, a.customer.mealCheckPos.y))
            if (m.length > 0) {
                // TODO eat animation or something
                m[0].kill();
                (a.scene as LevelBase).removeCustomer(a.customer);
                a.customer.leaveHappy();
            }
        }
    }
}

export class CustomerTimer extends Timer {
    public customer:Customer;
}