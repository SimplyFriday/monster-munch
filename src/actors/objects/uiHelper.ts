import { Scene, ScreenElement, Texture, vec, Sprite } from "excalibur";
import { Resources } from "../../resources";
import { ItemIconSprites } from "./itemIconSprites";

export class UIHelper {
    private static iconWidth:number = 50;
    private static iconHeight:number = 50;

    private static createUIIcon(texture: Texture|Sprite, xPos: number, yPos: number) {
        let se = new ScreenElement({
            width:this.iconWidth,
            height: this.iconHeight,
            pos: vec(xPos,yPos)
        });
        
        let s:Sprite;

        if (typeof(texture) === typeof(Texture)) {
            s = (texture as Texture).asSprite();
        } else{
            s = texture as Sprite;
        }
    
        s.scale = vec(3,3);
        se.addDrawing(s);

        return se;
    }

    public static addLevelUI (scene:Scene) {
        let hp1 = this.createUIIcon(ItemIconSprites.Heart, 900, 50);
        let hp2 = this.createUIIcon(ItemIconSprites.Heart, 930, 50);
        let hp3 = this.createUIIcon(ItemIconSprites.Heart, 960, 50);
        
        scene.add (hp1);
        scene.add (hp2);
        scene.add (hp3);
    }
}