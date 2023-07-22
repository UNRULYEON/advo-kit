import useSWR from "swr";
import Deck from "@/models/deck";

const useDecks = () => {
  const { data, mutate, error, isLoading } = useSWR<Deck[], null>("/api/decks");

  return {
    decks: data?.sort((a, b) => a.name.localeCompare(b.name)) ?? [],
    mutateDecks: mutate,
    isLoading,
    isError: error,
  };
};

export default useDecks;
