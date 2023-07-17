import useSWR from "swr";
import { deleteFetcher, patchFetcher, postFetcher } from ".";
import useSWRMutation from "swr/mutation";

export enum CARD_TYPE {
  "NORMAL" = "NORMAL",
}

export type Card = {
  id: string;
  deckId: string;
  content: string;
  cardType: CARD_TYPE;
  createdAt: string;
  updatedAt: string;
};

export const useDeckCards = (deckId?: string) => {
  const { data, mutate, error, isLoading } = useSWR<Card[], null>(
    deckId ? `/api/deck/${deckId}/cards` : null
  );

  return {
    deckCards: data,
    mutateDeckCards: mutate,
    isLoadingDeckCards: isLoading,
    isDeckCardsError: error,
  };
};

type CreateCard = {
  deckId: string;
  content: string;
  type: CARD_TYPE;
};

export const useCreateCard = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Card,
    null,
    string,
    CreateCard
  >("/api/card", postFetcher<CreateCard, Card>);

  return {
    createCard: trigger,
    isCreatingCard: isMutating,
    creatingCardError: error,
  };
};

type UpdateCard = { id: string; payload: Partial<CreateCard> };

export const useUpdateCard = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Card,
    null,
    string,
    UpdateCard
  >("/api/card", patchFetcher<UpdateCard, Card>);

  return {
    updateCard: trigger,
    isUpdatingDeck: isMutating,
    updatingDeckError: error,
  };
};

type DeleteCard = { id: string };

export const useDeleteCard = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    void,
    null,
    string,
    DeleteCard
  >("/api/card", deleteFetcher<DeleteCard>);

  return {
    deleteCard: trigger,
    isDeletingDeck: isMutating,
    deletingDeckError: error,
  };
};
