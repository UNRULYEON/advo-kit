export type Card = {
  id: string;
  question: string;
};

export type Kit = {
  id: string;
  name: string;
  cards: Card[];
};
