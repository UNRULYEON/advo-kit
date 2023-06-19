import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const decks = mysqlTable("decks", {
  id: varchar("cuid", { length: 256 }).primaryKey(),

  emoji: text("emoji"),
  name: text("name"),
});

export type Deck = InferModel<typeof decks>;
export type NewDeck = InferModel<typeof decks, "insert">;
