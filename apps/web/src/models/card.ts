export enum CardType {
  "NORMAL" = "NORMAL",
}

export type Card = {
  id: string;
  content: string;
  cardType: CardType;
  deckId: string;
  createdAt: string;
  updatedAt: string;
};

export default Card;
