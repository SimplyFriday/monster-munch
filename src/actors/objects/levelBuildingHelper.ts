import { Actor, Body, Collider, CollisionType, Color, Scene, ScreenElement, Sprite, Texture, vec } from "excalibur";
import { Item } from "./item";

export class levelBuildingHelper {
    static tileWidth = 50;
    static tileHeight = 50;


    public static createWallTile(scene: Scene, color: Color, xPos: number, yPos: number) {
        this.createTile(scene, color, xPos, yPos, true, 1);
    }

    public static createBackgroundTile(scene: Scene, color: Color, xPos: number, yPos: number) {
        this.createTile(scene, color, xPos, yPos, false, -1);
    }

    private static createTile(scene: Scene, color: Color, xPos: number, yPos: number, hasCollision: boolean, z: number) {
        let a = new Actor({
            scene: scene,
            width: this.tileWidth,
            height: this.tileHeight,
            color: color,
            pos: vec(xPos * this.tileWidth, yPos * this.tileHeight)
        });

        scene.add(a);
        a.setZIndex(z);

        if (hasCollision) {
            a.body.collider.type = CollisionType.Fixed;
        }
    }

    public static createItemOnTile(scene: Scene, sprite:Sprite, xPos: number, yPos: number): Item {
        const itemScale = 0.75;
        
        let a = new Item({
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

        return a;
    }
}