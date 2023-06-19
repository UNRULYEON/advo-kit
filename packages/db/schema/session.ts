import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { User } from "./user";

export const Session = mysqlTable("Session", {
  id: serial("id").primaryKey(),
  userId: int("userId").references(() => User.id),

  expires: timestamp("expires"),
  sessionToken: varchar("sessionToken", { length: 256 }),
});

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, {
    fields: [Session.userId],
    references: [User.id],
  }),
}));

export type Session = InferModel<typeof Session>;
export type NewSession = InferModel<typeof Session, "insert">;
