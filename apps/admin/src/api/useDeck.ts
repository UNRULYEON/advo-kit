import useSWR from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { deleteFetcher, fetcher, patchFetcher, postFetcher } from ".";

type Deck = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const useDeck = (id?: string) => {
  const { data, mutate, error, isLoading } = useSWR<Deck>(
    id ? `/api/deck/${id}` : null
  );

  return {
    deck: data,
    mutate,
    isLoading,
    isError: error,
  };
};

type CreateDeck = Partial<Deck>;

export const useCreateDeck = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Deck,
    null,
    string,
    CreateDeck
  >("/api/deck", postFetcher<CreateDeck, Deck>);

  return {
    createDeck: trigger,
    isCreatingDeck: isMutating,
    creatingDeckError: error,
  };
};

type UpdateDeck = { id: string; payload: Partial<Deck> };

export const useUpdateDeck = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Deck,
    null,
    string,
    UpdateDeck
  >("/api/deck", patchFetcher<UpdateDeck, Deck>);

  return {
    updateDeck: trigger,
    isUpdatingDeck: isMutating,
    updatingDeckError: error,
  };
};

type DeleteDeck = { id: string };

export const useDeleteDeck = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    void,
    null,
    string,
    DeleteDeck
  >("/api/deck", deleteFetcher<DeleteDeck>);

  return {
    deleteDeck: trigger,
    isDeletingDeck: isMutating,
    deletingDeckError: error,
  };
};

export default useDeck;
