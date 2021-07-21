import { Sprite, SpriteSheet } from "excalibur";
import { Resources } from "../../resources";

export abstract class InsideTileSprites {
    private static iconSheet = new SpriteSheet({
        image: Resources.InsideTilesB,
        rows: 16,
        columns: 16,
        spWidth: 16,
        spHeight: 16
    });

    public static get CounterVerticalFull () {
        return this.iconSheet.getSprite(16);
    }

    public static get CounterCornerBottomLeft () {
        return this.iconSheet.getSprite(17);
    }

    public static get CounterBottomCentral () {
        return this.iconSheet.getSprite(18);
    }
    
    public static get CounterBottomCornerRight () {
        return this.iconSheet.getSprite(19);
    }
 
    public static get CounterFaceLeft () {
        return this.iconSheet.getSprite(49);
    }

    public static get CounterFaceCenter () {
        return this.iconSheet.getSprite(50);
    }
    
    public static get CounterFaceRight () {
        return this.iconSheet.getSprite(51);
    }
     
    public static get RedStool () {
        return this.iconSheet.getSprite(152);
    }

    public static get Tray () {
        return this.iconSheet.getSprite(110);
    }
}