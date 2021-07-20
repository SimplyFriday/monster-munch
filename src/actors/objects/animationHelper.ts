import { Engine, Sprite, SpriteSheet, vec, Animation } from "excalibur";
import { LevelBuildingHelper } from "./levelBuildingHelper";

export abstract class animationHelper {
    public static getScaledAnimation (engine:Engine, spritesheet:SpriteSheet, startIndex:number, endIndex:number, scaleFactor:number = 1): Animation {
        let a:Animation = spritesheet.getAnimationBetween(engine, startIndex, endIndex, 100);
        
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