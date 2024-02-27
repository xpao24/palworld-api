import elasticunr from "elasticlunr";
import type { IItem } from "../common/interfaces";
const file = Bun.file("src/items.json");

const items: IItem[] = await file.json();

const search = elasticunr<IItem>(function () {
  this.addField("type");
  this.addField("name");
  this.addField("description");
});

// pals.forEach((pal) => {
//   search.addDoc({
//     ...pal,
//     suitabilities: pal.suitability.map((suitability) => suitability.type),
//   });
// });

export const execute = (query?: string) => {
  if (!query) return items;
  const result = search.search(query);
  return items.filter((item) => result.some((resultItem) => +resultItem.ref === item.id));
};
