import { Engine, Loader, DisplayMode } from 'excalibur';
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

        // We can change this later to make a cheapo start menu, if we don't have time to add saving or whatever
        loader.suppressPlayButton = true;

        return super.start(loader);
    }
}

const game = new Game();
game.start().then(() => {
    game.goToScene('levelTest');
});

document.oncontextmenu = () => {
    return false;
};
