import useSWR from "swr";
import Deck from "@/models/deck";
import Card from "@/models/card";

const useDecks = () => {
  const { data, mutate, error, isLoading } = useSWR<Deck[], null>("/api/decks");

  return {
    decks: data?.sort((a, b) => a.name.localeCompare(b.name)) ?? [],
    mutateDecks: mutate,
    isLoading,
    isError: error,
  };
};

export const useDeckCards = (deckId?: string) => {
  const { data, mutate, error, isLoading } = useSWR<Card[], null>(
    deckId ? `/api/deck/${deckId}/cards` : null
  );

  return {
    cards: data,
    mutateCards: mutate,
    isLoading,
    isError: error,
  };
};

export default useDecks;
