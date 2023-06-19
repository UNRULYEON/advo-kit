import {
  mysqlTable,
  text,
  int,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { users } from "./user";

export const sessions = mysqlTable("sessions", {
  id: varchar("cuid", { length: 256 }).primaryKey(),
  userId: int("user_id"),

  expires: timestamp("expires"),
  sessionToken: text("sessionToken"),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type Session = InferModel<typeof sessions>;
export type NewSession = InferModel<typeof sessions, "insert">;
