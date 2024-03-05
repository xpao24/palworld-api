import type { IItem, IStructure} from "../../common/interfaces";
import * as elasticurnStructureService from "../../services/index.structure";


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
  key: keyof IStructure,
  object: IStructure
) => {
  if (typeof object[key as keyof IStructure] === "string"){
      // 如果是比较名称，将空格替换为短横线再进行比较
      if (key === "name") {
        return (object[key as keyof IStructure] as string).replace(/\s/g, "-") === value;
      }
    return object[key as keyof IStructure] === value;
  }
};

export const execute = ({ page = 1, limit = 10, filter, term }: Props) => {
  const start = (page - 1) * limit;
  const end = page * limit;

  const structures = elasticurnStructureService.execute(term || "");

  const filters = Object.entries(filter || {});
  const content = structures.filter((structure) =>
    filters.every(([key, value]) => {
      if (!value) return true;
      return isSameValueOrIncludedInList(value, key as keyof IStructure, structure);
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
