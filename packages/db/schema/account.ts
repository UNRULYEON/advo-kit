import { mysqlTable, text, int, varchar } from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./user";

export const accounts = mysqlTable("accounts", {
  id: varchar("cuid", { length: 256 }).primaryKey(),
  userId: int("user_id"),

  type: text("type"),
  provider: text("provider"),
  providerAccountId: text("providerAccountId"),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: int("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export type Account = InferModel<typeof accounts>;
export type NewAccount = InferModel<typeof accounts, "insert">;
