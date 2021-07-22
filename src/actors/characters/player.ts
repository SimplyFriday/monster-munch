import { Actor, CollisionType, Color, Engine, Input, vec, Shape, SpriteSheet, Animation, Vector, Resource } from 'excalibur';
import { Resources } from '../../resources';
import { AnimationHelper } from '../objects/animationHelper';
import { Appliance, ApplianceType } from '../objects/appliance';
import { Ingredient } from '../objects/ingredient';
import { Item } from '../objects/item';
import { LevelBuildingHelper } from '../objects/levelBuildingHelper';
import { Meal } from '../objects/meal';
import { Pan } from '../objects/pan';
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

    onInitialize(engine: Engine) {
        this.sprites = Resources.PlayerSprites;

        this.body.collider.type = CollisionType.Active;
        this.body.collider.shape = Shape.Box(LevelBuildingHelper.tileHeight * this.hitboxScale, LevelBuildingHelper.tileHeight * this.hitboxScale);
        
        super.onInitialize(engine);
    }

    public onPreUpdate(engine: Engine, delta: number) {
        super.onPreUpdate(engine, delta);

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
            }

            if (engine.input.keyboard.wasPressed(Input.Keys.Q)) {
                this.examine();
            }
        }

        /////////////////////////////////
        ////////////// DEBUG ////////////
        /////////////////////////////////
        if (engine.input.keyboard.wasPressed(Input.Keys.Semicolon)) {
            let val = prompt("goto level", "level_test");
            if (val) {
                engine.goToScene(val);
            }
        }
    }
    

    private doMovement(engine: Engine) {
        let velX: number = 0, velY: number = 0;

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

        let adjustedVelY = velY / vecMag * this.baseSpeed;
        let adjustedVelX = velX / vecMag * this.baseSpeed;

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
            return;
        }

        var targets = this.scene.actors.filter(x => x instanceof Item &&
            !(x instanceof Pan) &&
            !(x === this.heldItem) &&
            x.contains(tPos.x, tPos.y));

        if (targets.length === 0) {
            this.heldItem.pos = tPos
            this.heldItem.isHeld = false;
            this.heldItem = null;
        }
    }

    private tryPickupItem() {
        let tPos = this.getFacingTargetPos(0.55);
        var targets = this.scene.actors.filter(x => x instanceof Item &&
            x.contains(tPos.x, tPos.y));

        if (targets.length > 0) {
            this.heldItem = targets[0] as Item;
            this.heldItem.isHeld = true;
        }
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
