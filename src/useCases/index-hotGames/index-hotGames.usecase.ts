import type { IHotGame} from "../../common/interfaces";
import * as elasticurnHotGameService from "../../services/index.hotGame";


interface IFilter {
  name?: string;
  description?: string;
  type?: string;
}
interface Props {
  page?: number;
  limit?: number;
  filter?: IFilter;
  term?: string;
}

const isSameValueOrIncludedInList = (
  value: string,
  key: keyof IHotGame,
  object: IHotGame
) => {
  if (typeof object[key as keyof IHotGame] === "string"){
      // 如果是比较名称，将空格替换为短横线再进行比较
      if (key === "name") {
        return (object[key as keyof IHotGame] as string).replace(/\s/g, "-") === value;
      }
    return object[key as keyof IHotGame] === value;
  }
};

export const execute = ({ page = 1, limit = 10, filter, term }: Props) => {
  const start = (page - 1) * limit;
  const end = page * limit;

  const hotGames = elasticurnHotGameService.execute(term || "");

  const filters = Object.entries(filter || {});
  const content = hotGames.filter((hotGame) =>
    filters.every(([key, value]) => {
      if (!value) return true;
      return isSameValueOrIncludedInList(value, key as keyof IHotGame, hotGame);
    })
  );
  const contentSliced = content.slice(start, end);

  return {
    content: contentSliced,
    page,
    limit,
    count: contentSliced.length,
    total: content.length,
  };
};
