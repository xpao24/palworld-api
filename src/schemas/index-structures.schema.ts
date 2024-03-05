import { t } from "elysia";

export const queryIndexStructures = t.Object({
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),

  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
  type: t.Optional(t.String()),
  term: t.Optional(t.String()),
});
