import useSWR from "swr";

type Deck = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const useDecks = () => {
  const { data, mutate, error, isLoading } = useSWR<Deck[], null>("/api/decks");

  return {
    decks: data,
    mutateDecks: mutate,
    isLoading,
    isError: error,
  };
};

export default useDecks;
