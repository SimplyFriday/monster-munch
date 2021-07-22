import { ActionContext, Engine, Timer, Vector } from "excalibur";
import { Resources } from "../../resources";
import { Meal } from "../objects/meal";
import { Humanoid } from "./humanoid";

export class Customer extends Humanoid {
    private speed: number = 200;
    private actionTimer:CustomerTimer;
    private mealCheckPos:Vector;
    private initialPosition:Vector;

    public wantsMeal: string;
    public frustratedTime: number;
    public attackTime: number;
    
    public onInitialize(engine: Engine) {
        this.sprites = Resources.Customer1;
        super.onInitialize(engine);

        this.initialPosition = this.pos.clone();
    }

    public walkToSeat(seatPos: Vector, finalFacing:string) {
        let p = this.actions.moveTo(seatPos.x, seatPos.y, this.speed).asPromise();
        
        p.then( () =>{
            console.log("customer arrived at seat")
            this.facing = finalFacing;
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
                                                         x.name === a.customer.wantsMeal &&
                                                         x.contains(a.customer.mealCheckPos.x, a.customer.mealCheckPos.y))
            if (m.length > 0) {
                // TODO eat animation or something
                m[0].kill();
                a.customer.leaveHappy();
            }
        }
    }
}

export class CustomerTimer extends Timer {
    public customer:Customer;
}