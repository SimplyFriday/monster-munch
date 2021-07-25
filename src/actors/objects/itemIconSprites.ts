import { Sprite, SpriteSheet } from "excalibur";
import { Resources } from "../../resources";

export abstract class ItemIconSprites {
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

    public static get BlackHeart () {
        return this.iconSheet.getSprite(2);
    }

    public static get Skull () {
        return this.iconSheet.getSprite(6);
    }

    public static get FlourBag () {
        return this.iconSheet.getSprite(9);
    }

    public static get StormCloud () {
        return this.iconSheet.getSprite(11);
    }

    public static get SnowFlake () {
        return this.iconSheet.getSprite(13);
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
    
    public static get Poison () {
        return this.iconSheet.getSprite(39);
    }
    
    public static get Apple () {
        return this.iconSheet.getSprite(40);
    }
    
    public static get Banana () {
        return this.iconSheet.getSprite(42);
    }

    public static get BananaPeel () {
        return this.iconSheet.getSprite(43);
    }

    public static get Bread () {
        return this.iconSheet.getSprite(44);
    }
    
    public static get Cheese () {
        return this.iconSheet.getSprite(45);
    }
    
    public static get Drumstick () {
        return this.iconSheet.getSprite(46);
    }
    
    public static get Cookie () {
        return this.iconSheet.getSprite(47);
    }
    
    public static get Burger () {
        return this.iconSheet.getSprite(48);
    }
    
    public static get Fries () {
        return this.iconSheet.getSprite(49);
    }
    
    public static get Hotdog () {
        return this.iconSheet.getSprite(50);
    }
    
    public static get PizzaPlain () {
        return this.iconSheet.getSprite(52);
    }
    
    public static get PizzaToppings () {
        return this.iconSheet.getSprite(53);
    }
    
    public static get Meat () {
        return this.iconSheet.getSprite(54);
    }
    
    public static get EggRaw () {
        return this.iconSheet.getSprite(55);
    }
    
    public static get EggCooked () {
        return this.iconSheet.getSprite(56);
    }

    public static get Taco () {
        return this.iconSheet.getSprite(57);
    }
    
    public static get Burrito () {
        return this.iconSheet.getSprite(58);
    }

    public static get Ketchup () {
        return this.iconSheet.getSprite(61);
    }

    public static get Mayo () {
        return this.iconSheet.getSprite(62);
    }

    public static get Relish () {
        return this.iconSheet.getSprite(63);
    }

    public static get PieYellow () {
        return this.iconSheet.getSprite(71);
    }

    public static get PieRed () {
        return this.iconSheet.getSprite(72);
    }
    
    public static get PiePurple () {
        return this.iconSheet.getSprite(73);
    }
    
    public static get Cake () {
        return this.iconSheet.getSprite(74);
    }

    public static get IceCreamCone () {
        return this.iconSheet.getSprite(75);
    }

    public static get FreezePopPink () {
        return this.iconSheet.getSprite(76);
    }

    public static get FreezePopBlue () {
        return this.iconSheet.getSprite(77);
    }

    public static get CandyRed () {
        return this.iconSheet.getSprite(78);
    }

    public static get CandyYellow () {
        return this.iconSheet.getSprite(79);
    }

    public static get SyringeRed () {
        return this.iconSheet.getSprite(80);
    }

    public static get SyringeGreen () {
        return this.iconSheet.getSprite(81);
    }

    public static get SyringeBlue () {
        return this.iconSheet.getSprite(82);
    }

    public static get SyringePurple () {
        return this.iconSheet.getSprite(83);
    }

    public static get SyringeYellow () {
        return this.iconSheet.getSprite(84);
    }

    public static get PinkBottle () {
        return this.iconSheet.getSprite(85);
    }

    public static get BrownBottle () {
        return this.iconSheet.getSprite(86);
    }

    public static get Champagne () {
        return this.iconSheet.getSprite(87);
    }

    public static get FlipPhone () {
        return this.iconSheet.getSprite(88);
    }

    public static get ToiletPaper () {
        return this.iconSheet.getSprite(89);
    }

    public static get FloppyDisk () {
        return this.iconSheet.getSprite(107);
    }

    public static get FloppyDiskTilt () {
        return this.iconSheet.getSprite(108);
    }

    public static get Trash () {
        return this.iconSheet.getSprite(109);
    }

    public static get Salt () {
        return this.iconSheet.getSprite(110);
    }

    public static get Sword () {
        return this.iconSheet.getSprite(112);
    }

    public static get Branch () {
        return this.iconSheet.getSprite(113);
    }

    public static get Bat () {
        return this.iconSheet.getSprite(114);
    }

    public static get Axe () {
        return this.iconSheet.getSprite(115);
    }

    public static get Snake () {
        return this.iconSheet.getSprite(116);
    }

    public static get Staff () {
        return this.iconSheet.getSprite(117);
    }

    public static get TennisRacket () {
        return this.iconSheet.getSprite(118);
    }

    public static get Bone () {
        return this.iconSheet.getSprite(126);
    }

    public static get ChocolateBar () {
        return this.iconSheet.getSprite(137);
    }

    public static get Potato () {
        return this.iconSheet.getSprite(144);
    }

    public static get CowboyBoots () {
        return this.iconSheet.getSprite(0);
    }

    public static get EnergyDrink () {
        return this.iconSheet.getSprite(68);
    }
    
}