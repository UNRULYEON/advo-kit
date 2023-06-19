import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { Card } from "./card";

export const Deck = mysqlTable("Deck", {
  id: serial("id").primaryKey().autoincrement(),

  emoji: varchar("emoji", { length: 256 }),
  name: varchar("name", { length: 256 }),
});

export const DeckRelations = relations(Card, ({ many }) => ({
  cards: many(Card),
}));

export type Deck = InferModel<typeof Deck>;
export type NewDeck = InferModel<typeof Deck, "insert">;
