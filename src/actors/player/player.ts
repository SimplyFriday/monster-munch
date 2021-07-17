import { Actor, CollisionType, Color, Engine, Input, Util, vec } from 'excalibur';
import { Resources } from '../../resources';

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 40,
      height: 40,
      color: new Color(255, 255, 255)
    });
  }

  private baseSpeed:number = 200;

  onInitialize() {
    this.addDrawing(Resources.Sword);
    this.body.collider.type = CollisionType.Active;
  }

  public onPreUpdate(engine: Engine, delta:number){
    
    // TODO: cleanup, some kind of maths here so that diag isn't faster than cardinal
    let velX: number = 0, velY:number = 0;

    if (engine.input.keyboard.isHeld(Input.Keys.W)){
      velY -= this.baseSpeed;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.S)){
      velY += this.baseSpeed;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.A)){
      velX -= this.baseSpeed;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.D)){
      velX += this.baseSpeed;
    }

    this.vel = vec(velX,velY);
  }
}
