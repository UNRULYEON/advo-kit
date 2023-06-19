import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { User } from "./user";

export const Account = mysqlTable("Account", {
  id: serial("id").primaryKey(),
  userId: int("userId").references(() => User.id),

  type: varchar("type", { length: 256 }),
  provider: varchar("provider", { length: 256 }),
  providerAccountId: varchar("providerAccountId", { length: 256 }),
  refresh_token: varchar("refresh_token", { length: 256 }),
  access_token: varchar("access_token", { length: 256 }),
  expires_at: int("expires_at"),
  token_type: varchar("token_type", { length: 256 }),
  scope: varchar("scope", { length: 256 }),
  id_token: varchar("id_token", { length: 256 }),
  session_state: varchar("session_state", { length: 256 }),
});

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, {
    fields: [Account.userId],
    references: [User.id],
  }),
}));

export type Account = InferModel<typeof Account>;
export type NewAccount = InferModel<typeof Account, "insert">;
