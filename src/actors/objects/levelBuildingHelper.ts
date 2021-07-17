import { Actor, Body, Collider, CollisionType, Color, vec } from "excalibur";

export class levelBuildingHelper {
  
  // Maybe
  public static createRectangularWallTile(width:number, height:number,color:Color, xPos:number, yPos:number) :Actor {
    let a = new Actor();
    a.width = width;
    a.height = height;
    a.color = color;
    a.body.collider.type = CollisionType.Fixed;
    a.pos = vec(xPos, yPos);

    return a;
  } 
}