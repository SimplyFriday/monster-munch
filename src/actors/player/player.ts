import { Actor, CollisionType, Color, Engine, Input, vec, Shape, SpriteSheet } from 'excalibur';
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

    private sprites:SpriteSheet;
    private baseSpeed: number = 200;

    onInitialize() {
        this.body.collider.type = CollisionType.Active;
        this.body.collider.shape = Shape.Circle(levelBuildingHelper.tileHeight * 0.45);
        this.setZIndex(1000);

        let plSpriteWidth = 15;
        let plSpriteHeight = 21;
        
        this.sprites = new SpriteSheet({
            image: Resources.PlayerSprites,
            rows: 4,
            columns: 3,
            spWidth: plSpriteWidth,
            spHeight: plSpriteHeight
        });

        let scaleX = levelBuildingHelper.tileHeight / plSpriteWidth;
        let scaleY = levelBuildingHelper.tileHeight / plSpriteHeight;
        let spr = this.sprites.getSprite(0);
        spr.scale = vec(scaleX,scaleY);

        this.addDrawing(spr);
    }

    public onPreUpdate(engine: Engine, delta: number) {

        // now this feels right but uses math above a 3rd grade level
        // Adapted from: https://gamedev.stackexchange.com/questions/162045/how-do-you-program-diagonal-movement
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

        let vecMag = Math.sqrt(Math.abs(velX) + Math.abs(velY));

        let adjustedVelY = velY / vecMag * this.baseSpeed;
        let adjustedVelX = velX / vecMag * this.baseSpeed;

        if (vecMag > 0) {
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
