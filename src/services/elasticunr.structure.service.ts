import elasticunr from "elasticlunr";
import type { IStructure } from "../common/interfaces";
const file = Bun.file("src/structures.json");

const items: IStructure[] = await file.json();

const search = elasticunr<IStructure>(function () {
  this.addField("type");
  this.addField("name");
  this.addField("description");
});

export const execute = (query?: string) => {
  if (!query) return items;
  const result = search.search(query);
  return items.filter((item) => result.some((resultItem) => +resultItem.ref === item.id));
};
