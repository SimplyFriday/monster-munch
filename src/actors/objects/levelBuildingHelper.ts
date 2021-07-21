import { Actor, Body, Collider, CollisionType, Color, Engine, Scene, ScreenElement, Sprite, SpriteSheet, Texture, vec, Vector } from "excalibur";
import { Resources } from "../../resources";
import { Appliance, ApplianceType } from "./appliance";
import { Ingredient } from "./ingredient";
import { InsideTileSprites } from "./insideTileSprites";
import { Item } from "./item";
import { Meal } from "./meal";
import { Pan } from "./pan";

export abstract class LevelBuildingHelper {
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
        a.name = name;

        return a;
    }

    public static createMeal(scene: Scene, sprite:Sprite, name:string, position:Vector): Meal {
        const itemScale = 0.75;
        
        let a = new Meal({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: position
        });

        scene.add(a);
        a.setZIndex(40);

        let scaleX = this.tileWidth / sprite.width * itemScale;
        let scaleY = this.tileHeight / sprite.height * itemScale;
        sprite.scale = vec(scaleX, scaleY);

        a.addDrawing(sprite);
        a.name = name;

        return a;
    }

    public static createApplianceOnTile(scene: Scene, type:ApplianceType, xPos: number, yPos: number): Appliance {
        const itemScale = 0.75;

        let sprite:Sprite;

        switch (type) {
            case ApplianceType.Stove:
                sprite = Resources.Stove.asSprite();
                break;
            case ApplianceType.ServingPlate:
                sprite = InsideTileSprites.Tray;
                break;
            default:
                throw new Error("unsupported appliance type: " + type);
        }

        let a = new Appliance({
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
        a.applianceType = type;

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
        let attackAnimation = panAttackSprites.getAnimationForAll(engine, 150);
        attackAnimation.scale = vec(scaleX, scaleY);
        attackAnimation.loop = false;
        a.attackAnimation = attackAnimation;

        scaleX = this.tileWidth / Resources.PanEmpty.width * itemScale;
        scaleY = this.tileHeight / Resources.PanEmpty.height * itemScale;

        let eSpr = Resources.PanEmpty.asSprite();
        let fSpr = Resources.PanFilled.asSprite();
        let dSpr = Resources.PanDone.asSprite();
        let bSpr = Resources.PanBurned.asSprite();
        
        let cookingSheet = new SpriteSheet({
            image: Resources.PanCooking ,
            rows:1,
            columns:3,
            spWidth:18,
            spHeight:9
        });

        let cAnim = cookingSheet.getAnimationForAll(engine, 50);

        let scale = vec(scaleX, scaleY);
        eSpr.scale = scale;
        fSpr.scale = scale;
        cAnim.scale = scale;
        dSpr.scale = scale;
        bSpr.scale = scale;

        a.addDrawing("empty", eSpr);
        a.addDrawing("filled", fSpr);
        a.addDrawing("attack", attackAnimation);
        a.addDrawing("cooking", cAnim);
        a.addDrawing("burned", bSpr);
        a.addDrawing("done", dSpr);
        
        
        return a;
    }
}