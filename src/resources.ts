import { SpriteSheet, Texture } from 'excalibur';
import sword from './images/sword.png';
import bag from './images/bag.png';
import itemIcons from './images/item_icons.png';
import playerSprites from './images/player_sprites.png'

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */

const Resources = {
    Sword: new Texture(sword),
    Bag: new Texture(bag),
    ItemIconSheet: new Texture(itemIcons),
    PlayerSprites: new Texture(playerSprites)
}

export { Resources }
