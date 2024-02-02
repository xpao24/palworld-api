import type { ISuitability } from ".";
import type { TypesEnum } from "../enums";
import type { IAura } from "./aura.interface";
import type { IDrop } from "./drop.interface";
import type { ISkill } from "./skill.interface";
import type { IStats } from "./stats.interface";

export interface IPal {
  id: number;
  key: string;
  name: string;
  description: string;
  types: TypesEnum[];
  suitabilities: string[];
  suitability: ISuitability[];
  drops: IDrop[];
  image: string;
  aura: IAura;
  wiki: string;
  skills: ISkill[];
  power: number;
  order: number;
  rarity: number;
  stats: IStats[];
}
