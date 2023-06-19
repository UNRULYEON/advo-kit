import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { accounts } from "./account";
import { sessions } from "./session";

export const users = mysqlTable("users", {
  id: varchar("cuid", { length: 256 }).primaryKey(),

  name: text("name"),
  email: text("email"),
  image: text("image"),
  emailVerified: timestamp("emailVerified"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;
