import { Sound, SpriteSheet, Texture } from 'excalibur';
import bag from './images/bag.png';
import itemIcons from './images/item_icons.png';
import balloonIcons from './images/balloon_1.png';
import playerSprites from './images/player_sprites.png';
import panAttack from './images/pan_attack.png';
import panEmpty from './images/pan_empty.png';
import panFilled from './images/pan_filled.png';
import panCooking from './images/pan_cooking.png';
import panDone from './images/pan_done.png';
import panBurned from './images/pan_burned.png';
import insideTilesB from './images/tileB_inside4.png';
import insideFloorsWalls from './images/tileA5_inside.png';
import stove from './images/stove.png';
import trashcan from './images/trashcan.png';
import customer1 from './images/customer_1.png';
import cardFrame from './images/card_frame.png';

const levelLoop1 = require('./audio/level_loop1.wav');
/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */

const Resources = {
    Bag: new Texture(bag),
    ItemIconSheet: new Texture(itemIcons),
    PlayerSprites: new Texture(playerSprites),
    LevelLoop1: new Sound(levelLoop1),
    BalloonIconSheet: new Texture(balloonIcons),
    PanAttack: new Texture(panAttack),
    PanEmpty: new Texture(panEmpty),
    PanFilled: new Texture(panFilled),
    PanCooking: new Texture(panCooking),
    PanDone: new Texture(panDone),
    PanBurned: new Texture(panBurned),
    InsideTilesB: new Texture(insideTilesB),
    InsideFloorsWalls: new Texture(insideFloorsWalls),
    Stove: new Texture(stove),
    Trashcan: new Texture(trashcan),
    Customer1: new Texture(customer1),
    CardFrame: new Texture(cardFrame)
}

export { Resources }
