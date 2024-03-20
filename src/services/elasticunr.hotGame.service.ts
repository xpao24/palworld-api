import elasticunr from "elasticlunr";
import type { IHotGame } from "../common/interfaces";
const file = Bun.file("src/hotGames.json");

const items: IHotGame[] = await file.json();

const search = elasticunr<IHotGame>(function () {
  this.addField("name");
});

export const execute = (query?: string) => {
  if (!query) return items;
  const result = search.search(query);
  return items.filter((item) => result.some((resultItem) => +resultItem.ref === item.id));
};
