import useSWR from "swr";
import { Deck } from "@advo-kit/db";
import { fetcher } from "@/api";

const useDecks = () => {
  const { data, error, mutate } = useSWR<Deck[]>("/api/decks", fetcher);

  const loading = !data && !error;

  return {
    decks: data,
    loading,
    error,
    mutate,
  };
};

export default useDecks;
