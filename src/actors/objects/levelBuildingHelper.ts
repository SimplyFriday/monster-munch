import { Actor, Body, Collider, CollisionType, Color, Engine, Scene, ScreenElement, Sprite, SpriteSheet, Texture, vec, Vector } from "excalibur";
import { Resources } from "../../resources";
import { AnimationHelper } from "./AnimationHelper";
import { Appliance, ApplianceType } from "./appliance";
import { Ingredient } from "./ingredient";
import { IngredientSpawner } from "./ingredientSpawner";
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

    public static createIngrediantSpawnerOnTile(scene: Scene, 
                                                xPos: number, 
                                                yPos: number, 
                                                ingredientName:string, 
                                                ingredientSprite:Sprite, 
                                                spawnerSprite?: Sprite): IngredientSpawner {
        let a = new IngredientSpawner({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: vec(xPos * this.tileWidth, yPos * this.tileHeight)
        });

        if (spawnerSprite) {
            let scaleX = this.tileWidth / spawnerSprite.width;
            let scaleY = this.tileHeight / spawnerSprite.height;
            spawnerSprite.scale = vec(scaleX, scaleY);
            a.addDrawing(spawnerSprite);
        }

        a.setupSpawner(ingredientName, ingredientSprite);

        scene.add(a);
        return a;
    }

    public static createIngredientAtPosition (scene: Scene, sprite:Sprite, name:string, xPos: number, yPos: number): Ingredient {
        const itemScale = 0.75;
        
        let a = new Ingredient({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: vec(xPos, yPos)
        });

        scene.add(a);
        a.setZIndex(40);

        AnimationHelper.getScaledSprite(sprite, itemScale);

        a.addDrawing(sprite);
        a.name = name;

        return a;
    }

    public static createIngredientOnTile(scene: Scene, sprite:Sprite, name:string, xPos: number, yPos: number): Ingredient {
        let xPosTile = xPos * this.tileWidth, yPosTile = yPos * this.tileHeight;
        return this.createIngredientAtPosition (scene, sprite, name, xPosTile, yPosTile);
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

        AnimationHelper.getScaledSprite(sprite, itemScale);

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

        AnimationHelper.getScaledSprite(sprite, itemScale);

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

        let attackAnimation = AnimationHelper.getScaledAnimation(engine, panAttackSprites, 0,3, itemScale, 150);
        attackAnimation.loop = false;
        a.attackAnimation = attackAnimation;

        let eSpr = AnimationHelper.getScaledSprite(Resources.PanEmpty.asSprite(), itemScale);
        let fSpr = AnimationHelper.getScaledSprite(Resources.PanFilled.asSprite(), itemScale);
        let dSpr = AnimationHelper.getScaledSprite(Resources.PanDone.asSprite(), itemScale);
        let bSpr = AnimationHelper.getScaledSprite(Resources.PanBurned.asSprite(), itemScale);
        
        let cookingSheet = new SpriteSheet({
            image: Resources.PanCooking ,
            rows:1,
            columns:3,
            spWidth:18,
            spHeight:9
        });

        let cAnim = AnimationHelper.getScaledAnimation(engine, cookingSheet, 0,3,itemScale,50);

        a.addDrawing("empty", eSpr);
        a.addDrawing("filled", fSpr);
        a.addDrawing("attack", attackAnimation);
        a.addDrawing("cooking", cAnim);
        a.addDrawing("burned", bSpr);
        a.addDrawing("done", dSpr);
        
        
        return a;
    }
}