export type Card = {
  question: string;
};

export type Kit = {
  id: string;
  name: string;
  cards: Card[];
};
