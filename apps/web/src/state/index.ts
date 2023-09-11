import Deck from "@/models/deck";
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { RefObject } from "react";

interface AdvokitState {
  appRef: RefObject<HTMLDivElement> | undefined;
  playgroundRef: RefObject<HTMLDivElement> | undefined;
  playgroundDeckRef: RefObject<HTMLDivElement> | undefined;
  placeholderDecksRef: Map<Deck["id"], RefObject<HTMLDivElement>>;
  decksRef: Map<Deck["id"], RefObject<HTMLDivElement>>;
  selectedDeck: Deck | undefined;
  setAppRef: (ref: RefObject<HTMLDivElement>) => void;
  setPlaygroundRef: (ref: RefObject<HTMLDivElement>) => void;
  setPlaygroundDeckRef: (ref: RefObject<HTMLDivElement>) => void;
  setPlaceholderDeckRef: (
    deckId: Deck["id"],
    ref: RefObject<HTMLDivElement>
  ) => void;
  removePlaceholderDeckRef: (deckId: Deck["id"]) => void;
  setDeckRef: (deckId: Deck["id"], ref: RefObject<HTMLDivElement>) => void;
  removeDeckRef: (deckId: Deck["id"]) => void;
  setSelectedDeck: (deck: Deck) => void;
}

const useStore = create<AdvokitState>()((set) => ({
  appRef: undefined,
  playgroundRef: undefined,
  playgroundDeckRef: undefined,
  placeholderDecksRef: new Map(),
  decksRef: new Map(),
  selectedDeck: undefined,
  setAppRef: (ref) => set(() => ({ appRef: ref })),
  setPlaygroundRef: (ref) => set(() => ({ appRef: ref })),
  setPlaygroundDeckRef: (ref) => set(() => ({ playgroundDeckRef: ref })),
  setPlaceholderDeckRef: (deckId, ref) =>
    set((state) => ({
      placeholderDecksRef: state.placeholderDecksRef.set(deckId, ref),
    })),
  removePlaceholderDeckRef: (deckId) =>
    set((state) => {
      state.placeholderDecksRef.delete(deckId);
      return { placeholderDecksRef: state.placeholderDecksRef };
    }),
  setDeckRef: (deckId, ref) =>
    set((state) => ({ decksRef: state.decksRef.set(deckId, ref) })),
  removeDeckRef: (deckId) =>
    set((state) => {
      state.decksRef.delete(deckId);
      return { decksRef: state.decksRef };
    }),
  setSelectedDeck: (deck) => set(() => ({ selectedDeck: deck })),
}));

if (import.meta.env.MODE !== "production") {
  mountStoreDevtool("Store", useStore);
}

export default useStore;
