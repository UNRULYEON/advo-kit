import Deck from "@/models/deck";
import { create } from "zustand";

interface AdvokitState {
  selectedDeck: Deck["id"] | undefined;
}

const useStore = create<AdvokitState>()(() => ({
  selectedDeck: undefined,
}));

export default useStore;
