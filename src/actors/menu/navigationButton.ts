import { Actor, CollisionType, Color, Engine, Input, ScreenElement, Util, vec } from 'excalibur';
import { Resources } from '../../resources';

export class NavigationButton extends ScreenElement {
    private targetScene: string;

    constructor(posX: number, posY: number, targetScene: string) {
        super({
            pos: vec(posX, posY),
            width: 120,
            height: 40,
            color: new Color(255, 255, 255)
        });
        this.targetScene = targetScene;
    }

    onInitialize() {
        this.on('pointerup', () => {
            alert("I've been clicked")
        })
    }

    public onPreUpdate(engine: Engine, delta: number) {

    }
}
