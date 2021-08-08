import { Actor, Engine, SpriteSheet, Texture, vec, Vector } from "excalibur";
import { AnimationHelper } from "../../../../excalibur-bootstraps/src/helpers/animationHelper";
import { LevelBuildingHelper } from "../../util/helpers/levelBuildingHelper";

export abstract class Humanoid extends Actor {
    protected sprites: Texture;
    protected spriteScale:number = 0.9;
    protected facing:string;
    protected baseSpeed: number = 200;

    public onInitialize (engine:Engine) {
        let sprites = new SpriteSheet({
            image: this.sprites,
            rows: 4,
            columns: 3,
            spWidth: this.sprites.width / 3,
            spHeight: this.sprites.height / 4
        });

        this.setZIndex(1000);

        this.addDrawing("standDown", AnimationHelper.getScaledSprite(sprites.getSprite(1), this.spriteScale));
        this.addDrawing("standLeft", AnimationHelper.getScaledSprite(sprites.getSprite(4), this.spriteScale));
        this.addDrawing("standRight", AnimationHelper.getScaledSprite(sprites.getSprite(7), this.spriteScale));
        this.addDrawing("standUp", AnimationHelper.getScaledSprite(sprites.getSprite(10), this.spriteScale));

        this.addDrawing("walkDown", AnimationHelper.getScaledAnimation(engine, sprites, 0, 3, this.spriteScale));
        this.addDrawing("walkLeft", AnimationHelper.getScaledAnimation(engine, sprites, 3, 6, this.spriteScale));
        this.addDrawing("walkRight", AnimationHelper.getScaledAnimation(engine, sprites, 6, 9, this.spriteScale));
        this.addDrawing("walkUp", AnimationHelper.getScaledAnimation(engine, sprites, 9, 11, this.spriteScale));
    }

    public onPreUpdate (engine:Engine, delta:number) {
        /////////////////////////////////
        /////////// Animation ///////////
        /////////////////////////////////
        this.doFacing();
        
        if (this.vel.x === 0 && this.vel.y === 0) {
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
    }

    protected doFacing() {
        if (this.vel.y > 0) {
            this.facing = "d"
        } else if (this.vel.x < 0) {
            this.facing = "l";
        } else if (this.vel.x > 0) {
            this.facing = "r";
        } else if (this.vel.y < 0) {
            this.facing = "u";
        }
    }

    protected getFacingTargetPos(tilePercent: number): Vector {
        let xOffset = 0, yOffset = 0;

        switch (this.facing) {
            case "l":
                xOffset -= LevelBuildingHelper.tileWidth * tilePercent;
                break;
            case "r":
                xOffset += LevelBuildingHelper.tileWidth * tilePercent;
                break;
            case "u":
                yOffset -= LevelBuildingHelper.tileHeight * tilePercent;
                break;
            case "d":
                yOffset += LevelBuildingHelper.tileHeight * tilePercent;
                break;
        }

        return vec(this.pos.x + xOffset, this.pos.y + yOffset);
    }
}