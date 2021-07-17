import { Color, Engine, Scene } from 'excalibur';
import { levelBuildingHelper } from '../../actors/objects/levelBuildingHelper';

/**
 * Managed scene
 */
export class LevelOne extends Scene {
    private returnScene:string;

    public onInitialize(engine: Engine) {
    }

    public onActivate(oldScene: Scene, newScene: Scene) {
        // this.returnScene = oldScene.
    }

    public onDeactivate() { }
}
