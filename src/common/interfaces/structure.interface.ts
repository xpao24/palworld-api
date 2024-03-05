import type { StructureTypesEnum } from "../enums";
import type { IItemRecipe } from "./recipe.interface";
import type { IStats } from "./stats.interface";

export interface IStructure {
  name: string;
  type: StructureTypesEnum;
  image: string;
  description: string;
  stats: IStats[];
  recipes: IItemRecipe[];
}