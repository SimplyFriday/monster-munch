import { Engine, Loader, DisplayMode, Color, Timer } from 'excalibur';
import { Player } from './actors/characters/player';
import { Resources } from './resources';
import { DeathScreen } from './scenes/levels/death';
import { LevelBase } from './scenes/levels/levelBase';
import { LevelTest } from './scenes/levels/levelTest';
import { LevelTestRay } from './scenes/levels/levelTestRay';
import { Level1 } from './scenes/levels/level_1';
import { Tutorial1 } from './scenes/levels/tutorial_1';
import { Tutorial2 } from './scenes/levels/tutorial_2';

/**
 * Managed game class
 */
export class Game extends Engine {
    public static CurrentGame:Game;

    constructor() {
        super({ displayMode: DisplayMode.FullScreen });
        Game.CurrentGame = this;
    }

    public start() {
        this.addLevel(new LevelTest(this));
        this.addLevel(new Level1(this));
        this.addLevel(new LevelTestRay(this));
        this.addLevel(new Tutorial1(this));
        this.addLevel(new Tutorial2(this));

        game.add('death', new DeathScreen(this));

        // Automatically load all default resources
        const loader = new Loader(Object.values(Resources));

        // TODO add custom loader screen 
        loader.suppressPlayButton = false;

        return super.start(loader);
    }

    private addLevel(level: LevelBase) {
        game.add(level.levelName, level);
    }
}

const game = new Game();

game.start().then(() => {
    game.goToScene('tutorial_1');
});

document.oncontextmenu = () => {
    return false;
};
