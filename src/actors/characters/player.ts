import { Actor, CollisionType, Color, Engine, Input, vec, Shape, SpriteSheet, Animation, Vector, Resource } from 'excalibur';
import { Game } from '../..';
import { Resources } from '../../resources';
import { DeathScreen } from '../../scenes/levels/death';
import { LevelBase } from '../../scenes/levels/levelBase';
import { AnimationHelper } from '../objects/animationHelper';
import { Appliance, ApplianceType } from '../objects/appliance';
import { Ingredient } from '../objects/ingredient';
import { Item } from '../objects/item';
import { LevelBuildingHelper } from '../objects/levelBuildingHelper';
import { Meal } from '../objects/meal';
import { Pan } from '../objects/pan';
import { Recipes } from '../objects/recipes';
import { Humanoid } from './humanoid';

export class Player extends Humanoid {
    constructor() {
        super({
            pos: vec(150, 150),
            width: 25,
            height: 25,
            color: new Color(100, 255, 100)
        });
    }

    protected spriteScale: number = 0.9;

    private hitboxScale: number = 0.8;
    private heldItem: Item;
    private immunityTime = 0;
    private boostTime = 0;

    public hp:number = 3;
    
    onInitialize(engine: Engine) {
        this.sprites = Resources.PlayerSprites;

        this.body.collider.type = CollisionType.Active;
        this.body.collider.shape = Shape.Box(LevelBuildingHelper.tileHeight * this.hitboxScale, LevelBuildingHelper.tileHeight * this.hitboxScale);
        
        super.onInitialize(engine);
    }

    public hurt() {
        if (this.immunityTime <= 0) {

            this.immunityTime = 1000;
            this.hp -= 1
            this.actions.blink(40,10,this.immunityTime/50);
            Resources.PlayerHurt.play();

            if (this.hp <= 0) {
                let deathScene = Game.CurrentGame.scenes["death"];
                
                if (deathScene instanceof DeathScreen) {
                    deathScene.lastLevel = this.scene as LevelBase;
                    Game.CurrentGame.goToScene("death");
                }
            }
        }
    }

    public onPreDraw (ctx: CanvasRenderingContext2D, delta:number) {
        if (this.boostTime > 0) {
            AnimationHelper.drawLine(ctx, vec(0,this.height + 20), vec(this.boostTime / 500, this.height + 20), 6, '#00FFFF')
        }
    }

    public onPreUpdate(engine: Engine, delta: number) {
        if (this.boostTime > 0) {
            this.boostTime -= delta;
        }

        super.onPreUpdate(engine, delta);

        if (this.immunityTime > 0) {
            this.immunityTime -= delta;
        }

        let attacking = false;

        if (this.heldItem instanceof Pan) {
            attacking = this.heldItem.isAttacking;
        }

        if (!attacking) {
            this.doMovement(engine);
            // force facing here, otherwise it can get janky when a solid object blocks
            // movement (and therefor facing).
            this.doFacing();
        } else {
            this.vel = vec(0, 0);
        }

        /////////////////////////////////
        /////// Object Interaction //////
        /////////////////////////////////
        if (!attacking) {
            if (this.heldItem) {
                this.heldItem.pos = vec(this.pos.x, this.pos.y - 40);
            }

            if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
                if (!this.heldItem) {
                    this.tryPickupItem();
                } else {
                    this.trySetDownItem();
                }
            }

            if (engine.input.keyboard.wasPressed(Input.Keys.E)) {
                if (this.heldItem instanceof Pan) {
                    this.heldItem.attack(this.getFacingTargetPos(0.7), this.facing);
                }

                if (this.heldItem instanceof Meal) {
                    if (this.heldItem.name != "inedible mush") {
                        this.boostTime += 5000 * Recipes[this.heldItem.name].ingredients.length;
                        this.heldItem.kill();
                        this.heldItem = null;
                        Resources.CustomerBite.play();
                    }
                }
            }

            if (engine.input.keyboard.wasPressed(Input.Keys.Q)) {
                this.examine();
            }
        }

        /////////////////////////////////
        ////////////// DEBUG ////////////
        /////////////////////////////////
        if (engine.input.keyboard.wasPressed(Input.Keys.Semicolon)) {
            let val = prompt("goto level", "level_");
            if (val) {
                engine.goToScene(val);
            }
        }

        if (engine.input.keyboard.wasPressed(Input.Keys.L)) {
            this.hurt();
        }
    }
    

    private doMovement(engine: Engine) {
        let velX: number = 0, velY: number = 0;
        let boost:number = 1;

        if (this.boostTime > 0) {
            boost = 1.3;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            velY -= 1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            velY += 1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            velX -= 1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            velX += 1;
        }

        let vecMag = Math.sqrt(Math.abs(velX) + Math.abs(velY));

        let adjustedVelY = velY / vecMag * this.baseSpeed * boost;
        let adjustedVelX = velX / vecMag * this.baseSpeed * boost;

        if (vecMag > 0) {
            this.vel = vec(adjustedVelX, adjustedVelY);
        } else {
            this.vel = vec(0, 0);
        }
    }

    private trySetDownItem() {
        let tPos = this.getFacingTargetPos(1.0);

        // check for trashcan first
        let tc = this.scene.actors.filter(x => x instanceof Appliance &&
                                               x.applianceType === ApplianceType.Trashcan &&
                                               x.contains(tPos.x, tPos.y));

        if (tc.length > 0 && this.heldItem.canBeTrashed) {
            this.heldItem.kill();
            this.heldItem = null;
            Resources.Trash.play();
            return;
        }

        // Now check for pans
        let pans = this.scene.actors.filter(x => x instanceof Pan &&
                                                 x.cookTime === 0 &&
                                                 x.contains(tPos.x, tPos.y));   
        
        if (this.heldItem instanceof Ingredient && pans.length > 0) {
            let p = pans[0] as Pan;
            
            if (p.ingredients.length < 4) {
                p.ingredients.push(this.heldItem.name);
                this.heldItem.kill();
                this.heldItem = null;
                Resources.CookPop3.play(0.45);
            }
            return;
        }

        var targets = this.scene.actors.filter(x => (x instanceof Item ||
            x instanceof Pan) &&
            !(x === this.heldItem) &&
            x.contains(tPos.x, tPos.y));

        if (targets.length === 0) {
            this.heldItem.pos = tPos
            this.heldItem.isHeld = false;
            this.heldItem = null;
        }
    }

    private tryPickupItem() {
        let tPos = [this.getFacingTargetPos(0.55), this.getFacingTargetPos(0.25), this.getFacingTargetPos(0.75)]

        tPos.forEach(pos => {
            var targets = this.scene.actors.filter(x => x instanceof Item &&
                x.contains(pos.x, pos.y));
    
            if (targets.length > 0) {
                this.heldItem = targets[0] as Item;
                this.heldItem.isHeld = true;
                return
            } 
        });
    }

    private examine() {
        let tPos = this.getFacingTargetPos(0.55);
        var targets = this.scene.actors.filter(x => (x instanceof Item || x instanceof Appliance) &&
            x.contains(tPos.x, tPos.y));

        let item = targets[0];

        if (item) {
            if (item instanceof Pan) {
                alert("Pan with contents: " + JSON.stringify(item.ingredients));
            }

            if (item instanceof Ingredient) {
                alert("Ingredient: " + item.name);
            }

            if (item instanceof Appliance) {
                alert("Appliance: " + item.applianceType);
            }

            if (item instanceof Meal) {
                alert("Meal: " + item.name);
            }
        }
    }
}
