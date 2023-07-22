import Deck from "@/models/deck";
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface AdvokitState {
  selectedDeck: Deck | undefined;
  setSelectedDeck: (deck: Deck) => void;
}

const useStore = create<AdvokitState>()((set) => ({
  selectedDeck: undefined,
  setSelectedDeck: (deck) => set(() => ({ selectedDeck: deck })),
}));

if (import.meta.env.MODE !== "production") {
  mountStoreDevtool("Store", useStore);
}

export default useStore;
