import { Engine, Loader, DisplayMode, Color } from 'excalibur';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { LevelTest } from './scenes/levels/levelTest';
import { Level1 } from './scenes/levels/level_1';

/**
 * Managed game class
 */
class Game extends Engine {

    constructor() {
        super({ displayMode: DisplayMode.FullScreen });
    }

    public start() {

        game.add('level_test', new LevelTest(this));
        game.add('level_1', new Level1(this));

        // Automatically load all default resources
        const loader = new Loader(Object.values(Resources));

        // TODO add custom loader screen 
        loader.suppressPlayButton = false;

        return super.start(loader);
    }
}

const game = new Game();
game.backgroundColor = new Color(245, 242, 254);
game.start().then(() => {
    game.goToScene('level_test');
});

document.oncontextmenu = () => {
    return false;
};
