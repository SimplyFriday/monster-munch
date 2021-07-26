import { Engine, Loader, DisplayMode, Color, Timer } from 'excalibur';
import { Player } from './actors/characters/player';
import { Resources } from './resources';
import { DeathScreen } from './scenes/levels/death';
import { LevelBase } from './scenes/levels/levelBase';
import { LevelTest } from './scenes/levels/levelTest';
import { LevelTestRay } from './scenes/levels/levelTestRay';
import { Level1 } from './scenes/levels/level_1';
import { Level1a } from './scenes/levels/level_1a';
import { Level1b } from './scenes/levels/level_1b';
import { Level2 } from './scenes/levels/level_2';
import { Level2a } from './scenes/levels/level_2a';
import { Level2b } from './scenes/levels/level_2b';
import { Level3 } from './scenes/levels/level_3';
import { Level3a } from './scenes/levels/level_3a';
import { Level3b } from './scenes/levels/level_3b';
import { Tutorial1 } from './scenes/levels/tutorial_1';
import { Tutorial2 } from './scenes/levels/tutorial_2';

/**
 * Managed game class
 */
export class Game extends Engine {
    public static CurrentGame:Game;
    public static muteMusic:boolean = false;

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
        this.addLevel(new Level1a(this));
        this.addLevel(new Level1b(this));
        this.addLevel(new Level2(this));
        this.addLevel(new Level2a(this));
        this.addLevel(new Level2b(this));
        this.addLevel(new Level3(this));
        this.addLevel(new Level3a(this));
        this.addLevel(new Level3b(this));

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

