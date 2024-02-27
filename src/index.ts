import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { queryIndexPals,queryIndexItems } from "./schemas";
import { IndexPalsUseCase,IndexItemsUseCase } from "./useCases";

const port = process.env.PORT || 8080;
const app = new Elysia()
  .use(staticPlugin())
  .get(
    "/",
    ({ query: { page, limit, term, ...filter } }) =>
      IndexPalsUseCase.execute({ page, limit, term, filter }),
    {
      query: queryIndexPals,
    }
  )
  .get(
    "/items",
    ({ query: { page, limit, term, ...filter } }) =>
      IndexItemsUseCase.execute({ page, limit, term, filter }),
    {
      query: queryIndexItems,
    }
  )
  .listen(port);


console.log(`🦊 Elysia is running at on port ${app.server?.port}...`);
