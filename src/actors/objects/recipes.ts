import { Sprite } from "excalibur";
import { ItemIconSprites } from "./itemIconSprites";

export class Recipe {
    public ingredients:string[];
    public resultName:string;
    public resultSprite:Sprite;

    constructor (ingredients:string[], resultName:string, resultSprite:Sprite) {
        this.ingredients = ingredients;
        this.resultSprite = resultSprite;
        this.resultName = resultName;
    }

    public ingredientsEqual(ingredientCheck:string[]) {
        if (
          !Array.isArray(this.ingredients)
          || !Array.isArray(ingredientCheck)
          || this.ingredients.length !== ingredientCheck.length
          ) {
            return false;
          }
        
        // .concat() to not mutate arguments
        const arr1 = this.ingredients.concat().sort();
        const arr2 = ingredientCheck.concat().sort();
        
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
             }
        }
        
        return true;
    }
}

const Recipes = {
    MonsterPie: new Recipe (["poison", "flour", "apple" ],"monsterPie",ItemIconSprites.PieRed)
}

export {Recipes}