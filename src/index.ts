import { Engine, Loader, DisplayMode, Color } from 'excalibur';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { LevelTest } from './scenes/levels/levelTest';

/**
 * Managed game class
 */
class Game extends Engine {
    private levelTest: LevelTest;

    constructor() {
        super({ displayMode: DisplayMode.FullScreen });
    }

    public start() {

        // Create new scene with a player
        this.levelTest = new LevelTest(this);

        game.add('levelTest', this.levelTest);

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
    game.goToScene('levelTest');
});

document.oncontextmenu = () => {
    return false;
};
