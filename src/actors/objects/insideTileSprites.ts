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

    public static get Table_V_TopSmall () {
        return this.iconSheet.getSprite(88);
    }

    public static get Table_H_TopLeft () {
        return this.iconSheet.getSprite(89);
    }
    
    public static get Table_H_TopMid () {
        return this.iconSheet.getSprite(90);
    }

    public static get Table_H_TopRight () {
        return this.iconSheet.getSprite(91);
    }

    public static get Table_V_TopLarge () {
        return this.iconSheet.getSprite(104);
    }

    public static get Table_H_BottomLeftLeg () {
        return this.iconSheet.getSprite(105);
    }

    public static get Table_H_BottomMidNoLeg () {
        return this.iconSheet.getSprite(106);
    }

    public static get Table_H_BottomRightLeg () {
        return this.iconSheet.getSprite(107);
    }

    public static get Table_V_Mid () {
        return this.iconSheet.getSprite(120);
    }

    public static get StoolTopRed () {
        return this.iconSheet.getSprite(121);
    }

    public static get Table_V_BottomLeg () {
        return this.iconSheet.getSprite(136);
    }

    public static get Table_H_MidLeg () {
        return this.iconSheet.getSprite(136);
    }

    public static get StoolBottomRed() {
        return this.iconSheet.getSprite(137);
    }
    public static get StoolTopGrey() {
        return this.iconSheet.getSprite(153);
    }
    public static get StoolBottomGrey() {
        return this.iconSheet.getSprite(169);
    }

    public static get RedStool () {
        return this.iconSheet.getSprite(152);
    }

    public static get GreyStool () {
        return this.iconSheet.getSprite(168);
    }

    public static get TrashCanTopLid () {
        return this.iconSheet.getSprite(172);
    }

    public static get TrashCanTopEmpty () {
        return this.iconSheet.getSprite(173);
    }

    public static get TrashCanTopTrash () {
        return this.iconSheet.getSprite(174);
    }

    public static get TrashCanTopBag () {
        return this.iconSheet.getSprite(175);
    }

    public static get TrashCanBottom () {
        return this.iconSheet.getSprite(188);
    }

    public static get Tray () {
        return this.iconSheet.getSprite(110);
    }
}