import { Actor, CollisionType, Color, Engine, Input, vec, Shape } from 'excalibur';
import { Resources } from '../../resources';
import { levelBuildingHelper } from '../objects/levelBuildingHelper';

export class Player extends Actor {
    constructor() {
        super({
            pos: vec(150, 150),
            width: 25,
            height: 25,
            color: new Color(100, 255, 100)
        });
    }

    private baseSpeed: number = 200;

    onInitialize() {
        this.body.collider.type = CollisionType.Active;
        this.body.collider.shape = Shape.Circle(levelBuildingHelper.tileHeight * 0.45);
    }

    public onPreUpdate(engine: Engine, delta: number) {

        // TODO: verify this makes movement correct, feels wrong
        let velX: number = 0, velY: number = 0;

        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            velY -= 1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            velY += 1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            velX -= 1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            velX += 1;
        }

        let totalVel = Math.abs(velX) + Math.abs(velY);
        let adjustedVelY = velY / totalVel * this.baseSpeed;
        let adjustedVelX = velX / totalVel * this.baseSpeed;

        if (totalVel > 0) {
            this.vel = vec(adjustedVelX, adjustedVelY);
        } else {
            this.vel = vec(0, 0);
        }

        /////////////////////////////////
        ///////////// Facing ////////////
        /////////////////////////////////
        let facing: string = "d";

        if (velY < 0) {
            facing = "l";
        } else if (velY > 0) {
            facing = "r";
        } else if (velX < 0) {
            facing = "u";
        }

        /////////////////////////////////
        /////////// Animation ///////////
        /////////////////////////////////

        /////////////////////////////////
        /////// Object Interaction //////
        /////////////////////////////////
        
    }
}
