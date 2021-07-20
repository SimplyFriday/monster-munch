import { Actor, Body, Collider, CollisionType, Color, Engine, Scene, ScreenElement, Sprite, SpriteSheet, Texture, vec } from "excalibur";
import { Resources } from "../../resources";
import { Ingredient } from "./ingredient";
import { Item } from "./item";
import { Pan } from "./pan";

export abstract class levelBuildingHelper {
    static tileWidth = 50;
    static tileHeight = 50;


    public static createWallTile(scene: Scene, display: Color|Sprite, xPos: number, yPos: number) {
        this.createTile(scene, display, xPos, yPos, true, 1);
    }

    public static createBackgroundTile(scene: Scene, display: Color|Sprite, xPos: number, yPos: number) {
        this.createTile(scene, display, xPos, yPos, false, -1);
    }

    private static createTile(scene: Scene, display: Color|Sprite, xPos: number, yPos: number, hasCollision: boolean, z: number) {
        let a = new Actor({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: vec(xPos * this.tileWidth, yPos * this.tileHeight)
        });

        if (display instanceof Color) {
            a.color = display;
        } else {
            let scaleX = this.tileWidth / display.width;
            let scaleY = this.tileHeight / display.height;
            display.scale = vec(scaleX, scaleY);
            a.addDrawing(display);
        }

        scene.add(a);
        a.setZIndex(z);

        if (hasCollision) {
            a.body.collider.type = CollisionType.Fixed;
        }
    }

    public static createIngredientOnTile(scene: Scene, sprite:Sprite, name:string, xPos: number, yPos: number): Ingredient {
        const itemScale = 0.75;
        
        let a = new Ingredient({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: vec(xPos * this.tileWidth, yPos * this.tileHeight)
        });

        scene.add(a);
        a.setZIndex(40);

        let scaleX = this.tileWidth / sprite.width * itemScale;
        let scaleY = this.tileHeight / sprite.height * itemScale;
        sprite.scale = vec(scaleX, scaleY);

        a.addDrawing(sprite);
        a.Name = name;

        return a;
    }

    public static createPanOnTile(scene: Scene, engine:Engine, xPos: number, yPos: number): Pan {
        const itemScale = 0.75;
        
        let a = new Pan({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: vec(xPos * this.tileWidth, yPos * this.tileHeight)
        });

        scene.add(a);
        a.setZIndex(35);

        let panAttackSprites = new SpriteSheet({
            image: Resources.PanAttack,
            rows: 1,
            columns: 3,
            spWidth: 18,
            spHeight: 18
        });

        let scaleX = this.tileWidth / 18 * itemScale;
        let scaleY = this.tileHeight / 18 * itemScale;
        let attackAnimation = panAttackSprites.getAnimationForAll(engine, 50);
        attackAnimation.scale = vec(scaleX, scaleY);

        scaleX = this.tileWidth / Resources.PanEmpty.width * itemScale;
        scaleY = this.tileHeight / Resources.PanEmpty.height * itemScale;

        let eSpr = Resources.PanEmpty.asSprite();
        let fSpr = Resources.PanFilled.asSprite();
        eSpr.scale = vec(scaleX, scaleY);
        fSpr.scale = vec(scaleX, scaleY);

        a.addDrawing("empty", eSpr);
        a.addDrawing("filled", fSpr);
        a.addDrawing("attack", attackAnimation);
        
        return a;
    }
}