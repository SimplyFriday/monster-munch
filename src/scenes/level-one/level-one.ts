import { Color, Engine, Scene } from 'excalibur';
import { levelBuildingHelper } from '../../actors/objects/levelBuildingHelper';

/**
 * Managed scene
 */
export class LevelOne extends Scene {
  public onInitialize(engine: Engine) {
    let wallColor = new Color(200,200,200);

    // TODO: something better than dropping in this crpa by hand
    // Also, these numbers seem odd, but it's midnight and my brain is mush
    this.add(levelBuildingHelper.createRectangularWallTile(250, 30, wallColor, 500, 300));
    this.add(levelBuildingHelper.createRectangularWallTile(250, 30, wallColor, 500, 500));
    this.add(levelBuildingHelper.createRectangularWallTile(30, 230, wallColor, 620, 400));
  }
  
  public onActivate() {}
  public onDeactivate() {}
}
