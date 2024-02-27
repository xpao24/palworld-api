import type { IItem} from "../../common/interfaces";
import * as elasticurnItemService from "../../services/index.item";


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
  key: keyof IItem,
  object: IItem
) => {
  if (typeof object[key as keyof IItem] === "string")
    return object[key as keyof IItem] === value;
};

export const execute = ({ page = 1, limit = 10, filter, term }: Props) => {
  const start = (page - 1) * limit;
  const end = page * limit;

  const items = elasticurnItemService.execute(term || "");

  const filters = Object.entries(filter || {});
  const content = items.filter((item) =>
    filters.every(([key, value]) => {
      if (!value) return true;
      return isSameValueOrIncludedInList(value, key as keyof IItem, item);
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
