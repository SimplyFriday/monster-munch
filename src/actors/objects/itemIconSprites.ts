import { Sprite, SpriteSheet } from "excalibur";
import { Resources } from "../../resources";

export class ItemIconSprites {
    private static iconSheet = new SpriteSheet({
        image: Resources.ItemIconSheet,
        rows: 11,
        columns: 16,
        spWidth: 12,
        spHeight: 12
    });
    
    public static get Heart () {
        return this.iconSheet.getSprite(1);
    }

    public static get Skull () {
        return this.iconSheet.getSprite(6);
    }

    public static get MoneyBag () {
        return this.iconSheet.getSprite(9);
    }

    public static get RedGem () {
        return this.iconSheet.getSprite(25);
    }

    public static get BlueGem () {
        return this.iconSheet.getSprite(26);
    }

    public static get YellowGem () {
        return this.iconSheet.getSprite(27);
    }

    public static get PurpleGem () {
        return this.iconSheet.getSprite(28);
    }

    public static get GreenGem () {
        return this.iconSheet.getSprite(29);
    }

    public static get WhiteGem () {
        return this.iconSheet.getSprite(30);
    }

    public static get BlackGem () {
        return this.iconSheet.getSprite(31);
    }

    public static get GreenLeaf () {
        return this.iconSheet.getSprite(32);
    }

    public static get RedLeaf () {
        return this.iconSheet.getSprite(33);
    }

    public static get RedPot () {
        return this.iconSheet.getSprite(34);
    }

    public static get BluePot () {
        return this.iconSheet.getSprite(35);
    }

    public static get YellowPot () {
        return this.iconSheet.getSprite(36);
    }
    
    public static get GreenPot () {
        return this.iconSheet.getSprite(37);
    }
    
    public static get Posion () {
        return this.iconSheet.getSprite(39);
    }
    
    public static get Apple () {
        return this.iconSheet.getSprite(40);
    }
    
    public static get Banana () {
        return this.iconSheet.getSprite(42);
    }

    public static get Bread () {
        return this.iconSheet.getSprite(44);
    }
    
    
}