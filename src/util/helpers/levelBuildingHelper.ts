import { Actor, Body, Collider, CollisionType, Color, Engine, FontStyle, Label, Scene, ScreenElement, Shape, Sprite, SpriteSheet, TextAlign, Texture, vec, Vector } from "excalibur";
import { Customer } from "../../actors/characters/customer";
import { Appliance, ApplianceType } from "../../actors/objects/appliance";
import { Ingredient } from "../../actors/objects/ingredient";
import { IngredientSpawner } from "../../actors/objects/ingredientSpawner";
import { Meal } from "../../actors/objects/meal";
import { Pan } from "../../actors/objects/pan";
import { Seat } from "../../actors/objects/seat";
import { Resources } from "../../resources";
import { InsideTileSprites } from "../spritesheet_wrappers/insideTileSprites";
import { ItemIconSprites } from "../spritesheet_wrappers/itemIconSprites";
import { AnimationHelper } from "./animationHelper";

export abstract class LevelBuildingHelper {
    static tileWidth = 50;
    static tileHeight = 50;

    public static createLabelAcrossTiles (scene:Scene, text:string, xPos:number, yPos:number, width:number, color:Color):Label {
        let label = new Label(text, xPos * this.tileWidth, yPos * this.tileHeight);
        label.maxWidth = width * this.tileWidth;
        label.textAlign = TextAlign.Center;
        label.color = color;
        label.fontSize = 20;     
        //label.useTextShadow(true);
        
        scene.add(label);
        
        return label;
    }

    public static createWallTile(scene: Scene, display: Color|Sprite, xPos: number, yPos: number): Actor {
        return this.createTile(scene, display, xPos, yPos, true, 1);
    }

    public static createBackgroundTile(scene: Scene, display: Color|Sprite, xPos: number, yPos: number): Actor {
        return this.createTile(scene, display, xPos, yPos, false, -1);
    }

    public static createSeat(scene: Scene, sprite: Sprite, facing:string, xPos: number, yPos: number): Seat {
        let s = this.createTile(scene, sprite, xPos, yPos, false, -1) as Seat;
        s.facing = facing;
        return s;
    }

    private static createTile(scene: Scene, 
                              display: Color|Sprite, 
                              xPos: number, yPos: number, 
                              hasCollision: boolean, 
                              z: number): Actor {
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

        return a;
    }

    public static createIngrediantSpawnerOnTile(scene: Scene, 
                                                xPos: number, 
                                                yPos: number, 
                                                ingredientName:string, 
                                                spawnerSprite?: Sprite): IngredientSpawner {
        
        console.log("adding spawner for: " + ingredientName);

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

        a.setupSpawner(ingredientName, ItemIconSprites[ingredientName]);

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

        let spr = AnimationHelper.getScaledSprite(sprite, itemScale);

        a.addDrawing(spr);
        a.name = name;
        a.body.collider.shape = Shape.Box(a.width * itemScale, a.height * itemScale);
        a.body.collider.type = CollisionType.Fixed;

        return a;
    }

    public static createIngredientOnTile(scene: Scene, sprite:Sprite, name:string, xPos: number, yPos: number): Ingredient {
        let xPosTile = xPos * this.tileWidth, yPosTile = yPos * this.tileHeight;
        return this.createIngredientAtPosition (scene, sprite, name, xPosTile, yPosTile);
    }

    public static createMeal(scene: Scene, sprite:Sprite, name:string, position:Vector): Meal {
        const itemScale = 0.8;
        
        let a = new Meal({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: position
        });

        scene.add(a);
        a.setZIndex(40);

        let spr = AnimationHelper.getScaledSprite(sprite, itemScale);

        a.addDrawing(spr);
        a.name = name;
        a.body.collider.shape = Shape.Box(a.width * itemScale, a.height * itemScale);
        a.body.collider.type = CollisionType.Fixed;

        return a;
    }

    public static createApplianceOnTile(scene: Scene, type:ApplianceType, xPos: number, yPos: number): Appliance {
        const itemScale = 0.75;

        let sprite:Sprite;
        let a = new Appliance({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: vec(xPos * this.tileWidth, yPos * this.tileHeight)
        });

        switch (type) {
            case ApplianceType.Stove:
                sprite = Resources.Stove.asSprite();
                break;
            case ApplianceType.ServingPlate:
                sprite = InsideTileSprites.Tray;
                break;
            case ApplianceType.Trashcan:
                sprite = Resources.Trashcan.asSprite();
                a.body.collider.shape = Shape.Box(a.width * itemScale, a.height * itemScale);
                a.body.collider.type = CollisionType.Fixed;
                break;
            default:
                throw new Error("unsupported appliance type: " + type);
        }

        scene.add(a);
        a.setZIndex(40);

        let spr = AnimationHelper.getScaledSprite(sprite, itemScale);
        
        a.addDrawing(spr);
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

    public static createCustomer(scene: Scene, position:Vector): Customer {
        let a = new Customer({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            pos: position
        });

        scene.add(a);
        a.setZIndex(40);

        return a;
    }
}