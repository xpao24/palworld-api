import type { ItemTypesEnum } from "../enums";
import type { IDroppedBy } from "./droppedBy.interface";
import type { IIngredientInRecipe } from "./ingredientInRecipe";
import type { IItemRecipe } from "./recipe.interface";
import type { IStats } from "./stats.interface";


export interface IItem {
  name: string;
  type: ItemTypesEnum;
  image: string;
  description: string;
  stats: IStats[];
  recipes: IItemRecipe[];
  droppdeBys:IDroppedBy[];
  ingredientInRecipes:IIngredientInRecipe[];
}
