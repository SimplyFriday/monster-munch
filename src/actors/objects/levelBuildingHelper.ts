import { Actor, Body, Collider, CollisionType, Color, vec } from "excalibur";

export class levelBuildingHelper {
    static tileWidth = 50;
    static tileHeight = 50;
    // Maybe
    public static createWallTile(color: Color, xPos: number, yPos: number): Actor {
        let a = new Actor();
        a.width = this.tileWidth;
        a.height = this.tileHeight;
        a.color = color;
        a.body.collider.type = CollisionType.Fixed;
        
        a.pos = vec(xPos * this.tileWidth, yPos * this.tileHeight);

        return a;
    }
}