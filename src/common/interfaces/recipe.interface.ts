import type { ItemRecipeTypeEnum } from "../enums";

export interface IItemRecipe {
  type: ItemRecipeTypeEnum;
  amount: number;
}
