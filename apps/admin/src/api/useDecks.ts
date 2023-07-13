import useSWR from "swr";

type Deck = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const useDecks = () => {
  const { data, error, isLoading } = useSWR<Deck[]>("/api/decks");

  return {
    decks: data,
    isLoading,
    isError: error,
  };
};

export default useDecks;
