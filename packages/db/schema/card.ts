import { mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { decks } from "./deck";

export const cards = mysqlTable("cards", {
  id: varchar("cuid", { length: 256 }).primaryKey(),
  deckId: text("deck_id"),

  content: text("content"),
  cardType: mysqlEnum("cardType", ["normal"]),
});

export const CardRelations = relations(cards, ({ one }) => ({
  deck: one(decks, {
    fields: [cards.deckId],
    references: [decks.id],
  }),
}));

export type Card = InferModel<typeof cards>;
export type NewCard = InferModel<typeof cards, "insert">;
