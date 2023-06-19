import { mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { Account } from "./account";
import { Session } from "./session";

export const User = mysqlTable("User", {
  id: serial("id").primaryKey().autoincrement(),

  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  image: varchar("image", { length: 256 }),
  emailVerified: timestamp("emailVerified"),
});

export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
  sessions: many(Session),
}));

export type User = InferModel<typeof User>;
export type NewUser = InferModel<typeof User, "insert">;
