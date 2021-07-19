import { Sprite, SpriteSheet } from "excalibur";
import { Resources } from "../../resources";

export class BalloonIconSprites {
    private static balloonSheet = new SpriteSheet({
        image: Resources.BalloonIconSheet,
        rows: 11,
        columns: 8,
        spWidth: 16,
        spHeight: 16
    });

    public static get MusicBalloon () {
        return this.balloonSheet.getSprite(18);
    }
    
    public static get MusicBalloonOff () {
        return this.balloonSheet.getSprite(17);
    }
}