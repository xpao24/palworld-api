import { t } from "elysia";

export const queryIndexHotGames = t.Object({
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),

  name: t.Optional(t.String()),
  term: t.Optional(t.String()),
});
