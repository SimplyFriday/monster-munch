import { Scene, ScreenElement, Texture, vec, Sprite } from "excalibur";
import { Resources } from "../../resources";
import { LevelBase } from "../../scenes/levels/levelBase";
import { BalloonIconSprites } from "./balloonIconSprites";
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
        
        se.addDrawing(this.scaleSprite(texture));

        return se;
    }

    private static scaleSprite (texture: Texture|Sprite) : Sprite{
        let s:Sprite;

        if (typeof(texture) === typeof(Texture)) {
            s = (texture as Texture).asSprite();
        } else{
            s = texture as Sprite;
        }
    
        s.scale = vec(3,3);

        return s;
    }

    private static createUIToggleButton (spriteOn:Sprite, spriteOff:Sprite, xPos:number, yPos:number): ScreenElement {
        let se = new ScreenElement({
            width:this.iconWidth,
            height: this.iconHeight,
            pos: vec(xPos,yPos)
        });
        
        se.addDrawing("on", this.scaleSprite(spriteOn));
        se.addDrawing("off", this.scaleSprite(spriteOff));

        return se;
    }

    public static addLevelUI (scene:LevelBase) {
        let musicToggle = this.createUIToggleButton(BalloonIconSprites.MusicBalloon, BalloonIconSprites.MusicBalloonOff, 800, 50);
        
        musicToggle.on ('pointerup', (event) =>{
            scene.toggleMusic();

            if (scene.muteMusic) {
                musicToggle.setDrawing("off");
            } else {
                musicToggle.setDrawing("on");
            }
        });

        scene.add(musicToggle);

        let hp1 = this.createUIIcon(ItemIconSprites.Heart, 900, 50);
        let hp2 = this.createUIIcon(ItemIconSprites.Heart, 930, 50);
        let hp3 = this.createUIIcon(ItemIconSprites.Heart, 960, 50);
        
        scene.add (hp1);
        scene.add (hp2);
        scene.add (hp3);

    }
}