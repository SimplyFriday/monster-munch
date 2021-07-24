import { Scene, ScreenElement, Texture, vec, Sprite, Timer, Engine, Label } from "excalibur";
import { Game } from "../..";
import { Resources } from "../../resources";
import { DeathScreen } from "../../scenes/levels/death";
import { LevelBase } from "../../scenes/levels/levelBase";
import { AnimationHelper } from "./animationHelper";
import { BalloonIconSprites } from "./balloonIconSprites";
import { ItemIconSprites } from "./itemIconSprites";
import { LevelBuildingHelper } from "./levelBuildingHelper";
import { Recipe } from "./recipes";

export abstract class UIHelper {
    private static iconWidth:number = 50;
    private static iconHeight:number = 50;

    private static createUIIcon(texture: Sprite, xPos: number, yPos: number): ViewportLockedUIElement {
        let se = new ViewportLockedUIElement({
            width:this.iconWidth,
            height: this.iconHeight,
            pos: vec(xPos,yPos)
        });
        
        se.addDrawing("default", AnimationHelper.getScaledSprite(texture, 0.65));

        return se;
    }

    private static createUILabel(text: string, xPos: number, yPos: number, maxWidth:number): ViewportLockedUIElement {
        let se = new ViewportLockedUIElement({
            width:this.iconWidth,
            height: this.iconHeight,
            pos: vec(xPos,yPos)
        });
        
        let label = new Label(text, 0, 0);
        label.fontSize = 30;
        label.maxWidth = maxWidth;
        se.add(label);
        
        return se;
    }

    private static createUIToggleButton (spriteOn:Sprite, spriteOff:Sprite, xPos:number, yPos:number): ViewportLockedUIElement {
        let se = new ViewportLockedUIElement({
            width:this.iconWidth,
            height: this.iconHeight,
            pos: vec(xPos,yPos)
        });
        
        se.addDrawing("on", AnimationHelper.getScaledSprite(spriteOn, 0.7));
        se.addDrawing("off", AnimationHelper.getScaledSprite(spriteOff, 0.7));

        return se;
    }

    public static addLevelUI (scene:LevelBase) {
        let musicToggle = this.createUIToggleButton(BalloonIconSprites.MusicBalloon, BalloonIconSprites.MusicBalloonOff, window.innerWidth - 220, 50);
        musicToggle.xRelativeTo = "right";
        musicToggle.x = -220;
        musicToggle.y = 50;
        
        musicToggle.on ('pointerup', (event) =>{
            scene.toggleMusic();
            console.log("music button clicked");
            if (Game.muteMusic) {
                musicToggle.setDrawing("off");
            } else {
                musicToggle.setDrawing("on");
            }
        });

        scene.add(musicToggle);

        if (Game.muteMusic) {
            musicToggle.setDrawing("off");
        }

        let hp1 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 120, 50);
        hp1.xRelativeTo = "right";
        hp1.x = -120;
        hp1.y = 50;
        hp1.name = "hp1";
        hp1.addDrawing("hurt", AnimationHelper.getScaledSprite(ItemIconSprites.BlackHeart, 0.65))

        let hp2 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 90, 50);
        hp2.xRelativeTo = "right";
        hp2.x = -90;
        hp2.y = 50;
        hp2.name = "hp2";
        hp2.addDrawing("hurt", AnimationHelper.getScaledSprite(ItemIconSprites.BlackHeart, 0.65))

        let hp3 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 60, 50);
        hp3.xRelativeTo = "right";
        hp3.x = -60;
        hp3.y = 50;
        hp3.name = "hp3";
        hp3.addDrawing("hurt", AnimationHelper.getScaledSprite(ItemIconSprites.BlackHeart, 0.65))

        scene.add (hp1);
        scene.add (hp2);
        scene.add (hp3);

        let feedLabel = this.createUILabel("Customers Left: ", 0, 0, 120);
        feedLabel.xRelativeTo = "right";
        feedLabel.x = -150;
        feedLabel.y = 130;
        feedLabel.name = "feedlabel";
        scene.add(feedLabel);

        let timer = new UITimer(50);
        timer.uiElements.push(musicToggle);
        timer.uiElements.push(hp1);
        timer.uiElements.push(hp2);
        timer.uiElements.push(hp3);
        timer.uiElements.push(feedLabel);

        scene.add(timer);
        timer.reset();
    }

    public static addTutorialButton (scene:LevelBase, nextLevel:string) {
        let tutorialButton = this.createUIIcon(Resources.TutorialButton.asSprite(), window.innerWidth / 2, window.innerHeight / 2);
        tutorialButton.xRelativeTo = "right";
        tutorialButton.yRelativeTo = "bottom";
        tutorialButton.y = -150;
        tutorialButton.x = -200;

        tutorialButton.scale = vec(3,2);

        scene.add(tutorialButton);
        
        let timer = new UITimer(50);
        timer.uiElements.push(tutorialButton);
        scene.add(timer);
        timer.reset();

        tutorialButton.on("pointerup", (e) => {
            if (tutorialButton.scene === Game.CurrentGame.currentScene) {
                Game.CurrentGame.goToScene(nextLevel);
                console.log("tutorial button clicked");
            }
        });
    }

    public static addDeathUI (scene:DeathScreen, engine:Engine) {
        let restartButton = this.createUIIcon(Resources.RestartButton.asSprite(), window.innerWidth / 2, window.innerHeight / 2);
        restartButton.xRelativeTo = "center";
        restartButton.yRelativeTo = "center";
        restartButton.y = 70;

        restartButton.scale = vec(5,5);

        scene.add(restartButton);
        let timer = new UITimer(50);
        timer.uiElements.push(restartButton);
        scene.add(timer);
        timer.reset();

        restartButton.on("pointerup", (e) => {
            if (Game.CurrentGame.currentScene instanceof DeathScreen) {
                scene.lastLevel.onInitialize(engine);
                engine.goToScene(scene.lastLevel.levelName)
                console.log("restart button clicked");
            }
        });
    }
}

export class ViewportLockedUIElement extends ScreenElement {
    public x:number = 0;
    public y:number = 0;
    public xRelativeTo:string;
    public yRelativeTo:string;
    public name:string
}
export class UITimer extends Timer {
    public uiElements:ViewportLockedUIElement[] = [];

    constructor (interval:number) {
        super({
            interval:interval,
            repeats: true
        })

        this.on(this.updateUI);
    }

    private updateUI () {
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
                    case "center":
                        xPos = (window.innerWidth / 2) - (element.width / 2) + element.x;
                        break;
                }
            } else {
                xPos = element.x;
            }

            if (element.yRelativeTo) {
                switch(element.yRelativeTo) {
                    case "bottom":
                        yPos = window.innerHeight + element.y;
                        break;
                    case "top":
                        yPos = element.y;
                        break;
                    case "center":
                        yPos = (window.innerHeight / 2) - (element.height / 2) + element.y;
                        break;
                }
            } else {
                yPos = element.y
            }

            element.pos = vec(xPos, yPos);

            if (element.name && element.name.startsWith("hp")) {
                let pHP = (element.scene as LevelBase).player.hp;

                if (element.name === "hp2" && pHP < 2) {
                    element.setDrawing("hurt");
                }  else if (element.name === "hp3" && pHP < 3) {
                    element.setDrawing("hurt");
                } else {
                    element.setDrawing("default");
                }
            }

            if (element.name === "feedlabel") {
                let l = element.children[0];

                if (l && l instanceof Label)
                { 
                    l.text = "Customers Left: " + (element.scene as LevelBase).customersToServe;
                }
            }
        });
    }
}