import { Scene, ScreenElement, Texture, vec, Sprite, Timer } from "excalibur";
import { Resources } from "../../resources";
import { LevelBase } from "../../scenes/levels/levelBase";
import { BalloonIconSprites } from "./balloonIconSprites";
import { ItemIconSprites } from "./itemIconSprites";
import { Recipe } from "./recipes";

export abstract class UIHelper {
    private static iconWidth:number = 50;
    private static iconHeight:number = 50;

    private static createUIIcon(texture: Texture|Sprite, xPos: number, yPos: number): ViewportLockedUIElement {
        let se = new ViewportLockedUIElement({
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

    private static createUIToggleButton (spriteOn:Sprite, spriteOff:Sprite, xPos:number, yPos:number): ViewportLockedUIElement {
        let se = new ViewportLockedUIElement({
            width:this.iconWidth,
            height: this.iconHeight,
            pos: vec(xPos,yPos)
        });
        
        se.addDrawing("on", this.scaleSprite(spriteOn));
        se.addDrawing("off", this.scaleSprite(spriteOff));

        return se;
    }

    public static addLevelUI (scene:LevelBase) {
        let musicToggle = this.createUIToggleButton(BalloonIconSprites.MusicBalloon, BalloonIconSprites.MusicBalloonOff, window.innerWidth - 220, 50);
        musicToggle.xRelativeTo = "right";
        musicToggle.x = -220;
        musicToggle.y = 50;
        
        musicToggle.on ('pointerup', (event) =>{
            scene.toggleMusic();

            if (scene.muteMusic) {
                musicToggle.setDrawing("off");
            } else {
                musicToggle.setDrawing("on");
            }
        });

        scene.add(musicToggle);

        let hp1 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 120, 50);
        hp1.xRelativeTo = "right";
        hp1.x = -120;
        hp1.y = 50;

        let hp2 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 90, 50);
        hp2.xRelativeTo = "right";
        hp2.x = -90;
        hp2.y = 50;

        let hp3 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 60, 50);
        hp3.xRelativeTo = "right";
        hp3.x = -60;
        hp3.y = 50;

        scene.add (hp1);
        scene.add (hp2);
        scene.add (hp3);

        let timer = new UITimer(50);
        timer.uiElements.push(musicToggle);
        timer.uiElements.push(hp1);
        timer.uiElements.push(hp2);
        timer.uiElements.push(hp3);
        
        scene.add(timer);
        timer.reset();
    }
}

export class ViewportLockedUIElement extends ScreenElement {
    public x:number;
    public y:number;
    public xRelativeTo:string;
    public yRelativeTo:string;
}
export class UITimer extends Timer {
    public uiElements:ViewportLockedUIElement[] = [];

    constructor (interval:number) {
        super({
            interval:interval,
            repeats: true
        })

        console.log("added ui timer");
        this.on(this.updateUILocations);
    }
    private updateUILocations () {
        this.uiElements.forEach(element => {
            let xPos:number, yPos:number;

            if (element.xRelativeTo) {
                switch(element.xRelativeTo) {
                    case "right":
                        xPos = window.innerWidth + element.x;
                        break;
                    case "left":
                        xPos = element.x;
                        break;
                }
            } else {
                xPos = element.x;
            }

            if (element.yRelativeTo) {
                switch(element.yRelativeTo) {
                    case "bottom":
                        xPos = window.innerHeight + element.y;
                        break;
                    case "top":
                        xPos = element.y;
                        break;
                }
            } else {
                yPos = element.y
            }

            element.pos = vec(xPos, yPos);
        });
    }
}