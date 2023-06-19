import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
import { Deck } from "./deck";

export const Card = mysqlTable("Card", {
  id: serial("id").primaryKey().autoincrement(),
  deckId: int("deckId").references(() => Deck.id),

  content: varchar("content", { length: 256 }),
  cardType: mysqlEnum("cardType", ["normal"]),
});

export const CardRelations = relations(Card, ({ one }) => ({
  deck: one(Deck, {
    fields: [Card.deckId],
    references: [Deck.id],
  }),
}));

export type Card = InferModel<typeof Card>;
export type NewCard = InferModel<typeof Card, "insert">;
