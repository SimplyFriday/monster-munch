import { Engine, Sprite, SpriteSheet, vec, Animation } from "excalibur";
import { LevelBuildingHelper } from "./levelBuildingHelper";

export abstract class AnimationHelper {
    public static getScaledAnimation (engine:Engine, spritesheet:SpriteSheet, startIndex:number, endIndex:number, scaleFactor:number = 1, speed:number = 100): Animation {
        let a:Animation = spritesheet.getAnimationBetween(engine, startIndex, endIndex, speed);
        
        let scaleX = LevelBuildingHelper.tileHeight / a.width * scaleFactor;
        let scaleY = LevelBuildingHelper.tileHeight / a.height * scaleFactor;
        a.scale = vec(scaleX, scaleY);

        return a;
    }

    public static getScaledSprite (sprite:Sprite, scaleFactor:number = 1): Sprite {
        let scaleX = LevelBuildingHelper.tileHeight / sprite.width * scaleFactor;
        let scaleY = LevelBuildingHelper.tileHeight / sprite.height * scaleFactor;
        sprite.scale = vec(scaleX, scaleY);

        return sprite;
    }
}