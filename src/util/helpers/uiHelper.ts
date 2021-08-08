import { ScreenElement, Texture, vec, Sprite, Timer, Engine, Label } from "excalibur";
import { Game } from "../..";
import { Resources } from "../../resources";
import { DeathScreen } from "../../scenes/menu/death";
import { LevelBase } from "../../scenes/levels/levelBase";
import { Recipe } from "../config/recipes";
import { BalloonIconSprites } from "../spritesheet_wrappers/balloonIconSprites";
import { ItemIconSprites } from "../spritesheet_wrappers/itemIconSprites";
import { AnimationHelper, UITimer, ViewportLockedUIElement } from "excalibur-bootstraps";

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
        label.fontSize = 38;
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

    public static addLevelUI (scene:LevelBase): UITimer {
        let musicToggle = this.createUIToggleButton(BalloonIconSprites.MusicBalloon, BalloonIconSprites.MusicBalloonOff, window.innerWidth - 220, 50);
        musicToggle.xRelativeTo = "center";
        musicToggle.x = 220;
        musicToggle.y = 50;
        
        musicToggle.on ('pointerup', (event) =>{
            if (musicToggle.scene === Game.CurrentGame.currentScene) {
                scene.toggleMusic();
                
                if (Game.muteMusic) {
                    musicToggle.setDrawing("off");
                } else {
                    musicToggle.setDrawing("on");
                }
            }
        });

        scene.add(musicToggle);

        if (Game.muteMusic) {
            musicToggle.setDrawing("off");
        }

        let hp1 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 120, 50);
        hp1.xRelativeTo = "center";
        hp1.x = 300;
        hp1.y = 50;
        hp1.name = "hp1";
        hp1.addDrawing("hurt", AnimationHelper.getScaledSprite(ItemIconSprites.BlackHeart, 0.65))
        
        let hp2 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 90, 50);
        hp2.xRelativeTo = "center";
        hp2.x = 330;
        hp2.y = 50;
        hp2.name = "hp2";
        hp2.addDrawing("hurt", AnimationHelper.getScaledSprite(ItemIconSprites.BlackHeart, 0.65))

        hp2.customActions = () => {
            let pHP = (scene as LevelBase).player.hp;
            if (pHP < 2) {
                hp2.setDrawing("hurt");
            }
        }

        let hp3 = this.createUIIcon(ItemIconSprites.Heart, window.innerWidth - 60, 50);
        hp3.xRelativeTo = "center";
        hp3.x = 360;
        hp3.y = 50;
        hp3.name = "hp3";
        hp3.addDrawing("hurt", AnimationHelper.getScaledSprite(ItemIconSprites.BlackHeart, 0.65))

        hp3.customActions = () => {
            let pHP = (scene as LevelBase).player.hp;
            if (pHP < 3) {
                hp2.setDrawing("hurt");
            }
        }

        scene.add (hp1);
        scene.add (hp2);
        scene.add (hp3);

        let feedLabel = this.createUILabel("Customers Left: ", 0, 0, 140);
        feedLabel.xRelativeTo = "center";
        feedLabel.x = 270;
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

        return timer;
    }

    public static addTutorialButton (scene:LevelBase, nextLevel:string) {
        let tutorialButton = this.createUIIcon(Resources.TutorialButton.asSprite(), window.innerWidth / 2, window.innerHeight / 2);
        tutorialButton.xRelativeTo = "center";
        tutorialButton.yRelativeTo = "bottom";
        tutorialButton.y = -150;
        tutorialButton.x = 100;

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
            }
        });
    }
}


export class RecipeCard extends ViewportLockedUIElement {
    private cardTargetWidth = 75;
    private cardTargetHeight = 120;
    
    private cardFrame:Sprite;
    private resultSprite:Sprite;
    private ingredientSprites:Sprite[] = [];

    public setRecipe(recipe:Recipe) {
        this.cardFrame = Resources.CardFrame.asSprite();
        this.cardFrame.scale = vec(this.cardTargetWidth / this.cardFrame.width, this.cardTargetHeight / this.cardFrame.height );

        this.resultSprite =AnimationHelper.getScaledSprite(recipe.resultSprite, 0.6);
        
        recipe.ingredients.forEach(i => {
            this.ingredientSprites.push(AnimationHelper.getScaledSprite(ItemIconSprites[i], 0.6));
        });
    }

    public onPreDraw (ctx: CanvasRenderingContext2D, _delta: number) {
        this.cardFrame.draw(ctx, 0,0);
        this.resultSprite.draw(ctx, this.cardTargetWidth / 2 - this.resultSprite.width,5);

        this.ingredientSprites[0].draw(ctx, 5,50)
        
        if (this.ingredientSprites.length >= 2) {
            this.ingredientSprites[1].draw(ctx, 40,50)
        }

        if (this.ingredientSprites.length >= 3) {
            this.ingredientSprites[2].draw(ctx, 5, 85)
        }

        if (this.ingredientSprites.length >= 4) {
            this.ingredientSprites[3].draw(ctx, 40, 85)
        }
    }
}