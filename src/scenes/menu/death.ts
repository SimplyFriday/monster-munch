import { Color, Engine, Scene, ScreenElement } from "excalibur";
import { UIHelper } from "../../actors/objects/uiHelper";
import { LevelBase } from "../levels/levelBase";

export class DeathScreen extends Scene {
    public lastLevel:LevelBase;

    onInitialize(engine:Engine){
        engine.backgroundColor = Color.Black;

        UIHelper.addDeathUI(this, engine);
    }
    
    public onPreUpdate (engine:Engine) {
        engine.backgroundColor = Color.Black;
    }
}