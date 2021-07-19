import { Actor, CollisionType, Color, Engine, Input, vec, Shape, SpriteSheet, Animation } from 'excalibur';
import { Resources } from '../../resources';
import { animationHelper } from '../objects/animationHelper';
import { Item } from '../objects/item';
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

    private sprites: SpriteSheet;
    private baseSpeed: number = 200;
    private facing: string;
    private spriteScale: number = 0.9;
    private heldItem: Item;

    onInitialize(engine: Engine) {
        this.body.collider.type = CollisionType.Active;
        this.body.collider.shape = Shape.Box(levelBuildingHelper.tileHeight * this.spriteScale, levelBuildingHelper.tileHeight * this.spriteScale);
        this.setZIndex(1000);

        let plSpriteWidth = 16;
        let plSpriteHeight = 21;

        this.sprites = new SpriteSheet({
            image: Resources.PlayerSprites,
            rows: 4,
            columns: 3,
            spWidth: plSpriteWidth,
            spHeight: plSpriteHeight
        });

        this.addDrawing("standDown", animationHelper.getScaledSprite(this.sprites.getSprite(1), this.spriteScale));
        this.addDrawing("standLeft", animationHelper.getScaledSprite(this.sprites.getSprite(4), this.spriteScale));
        this.addDrawing("standRight", animationHelper.getScaledSprite(this.sprites.getSprite(7), this.spriteScale));
        this.addDrawing("standUp", animationHelper.getScaledSprite(this.sprites.getSprite(10), this.spriteScale));

        this.addDrawing("walkDown", animationHelper.getScaledAnimation(engine, this.sprites, 0, 3, this.spriteScale));
        this.addDrawing("walkLeft", animationHelper.getScaledAnimation(engine, this.sprites, 3, 6, this.spriteScale));
        this.addDrawing("walkRight", animationHelper.getScaledAnimation(engine, this.sprites, 6, 9, this.spriteScale));
        this.addDrawing("walkUp", animationHelper.getScaledAnimation(engine, this.sprites, 9, 11, this.spriteScale));
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

        if (velY > 0) {
            this.facing = "d"
        } else if (velX < 0) {
            this.facing = "l";
        } else if (velX > 0) {
            this.facing = "r";
        } else if (velY < 0) {
            this.facing = "u";
        }

        /////////////////////////////////
        /////////// Animation ///////////
        /////////////////////////////////
        if (velX === 0 && velY === 0) {
            switch (this.facing) {
                case "l":
                    this.setDrawing("standLeft");
                    break;
                case "r":
                    this.setDrawing("standRight");
                    break;
                case "u":
                    this.setDrawing("standUp");
                    break;
                case "d":
                    this.setDrawing("standDown");
                    break;
            }
        } else {
            switch (this.facing) {
                case "l":
                    this.setDrawing("walkLeft");
                    break;
                case "r":
                    this.setDrawing("walkRight");
                    break;
                case "u":
                    this.setDrawing("walkUp");
                    break;
                case "d":
                    this.setDrawing("walkDown");
                    break;
            }
        }

        /////////////////////////////////
        /////// Object Interaction //////
        /////////////////////////////////
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            if (!this.heldItem) {
                this.tryPickupItem();
            } else {
                this.trySetDownItem();
            }
        }

        if (this.heldItem) {
            this.heldItem.pos = vec(this.pos.x, this.pos.y - 40);
        }
    }

    private trySetDownItem() {
        let xOffset = 0, yOffset = 0;

        switch (this.facing) {
            case "l":
                xOffset -= levelBuildingHelper.tileWidth;
                break;
            case "r":
                xOffset += levelBuildingHelper.tileWidth;
                break;
            case "u":
                yOffset -= levelBuildingHelper.tileHeight;
                break;
            case "d":
                yOffset += levelBuildingHelper.tileHeight;
                break;
        }

        this.heldItem.pos = vec(this.pos.x + xOffset, this.pos.y + yOffset);
        this.heldItem = null;
    }

    private tryPickupItem() {
        let xOffset = 0, yOffset = 0;

        switch (this.facing) {
            case "l":
                xOffset -= levelBuildingHelper.tileWidth / 2;
                break;
            case "r":
                xOffset += levelBuildingHelper.tileWidth / 2;
                break;
            case "u":
                yOffset -= levelBuildingHelper.tileHeight / 2;
                break;
            case "d":
                yOffset += levelBuildingHelper.tileHeight / 2;
                break;
        }

        var targets = this.scene.actors.filter(x => x instanceof Item &&
            x.contains(this.pos.x + xOffset, this.pos.y + yOffset));

        if (targets.length > 0) {
            this.heldItem = targets[0] as Item;
            this.heldItem.isHeld = true;
        }
    }
}
