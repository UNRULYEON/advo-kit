import { LayoutGroup } from "framer-motion";
import Decks from "@/components/Decks";
import NewPlayground from "@/components/NewPlayground";
import useDecks from "@/api/useDecks";
import Deck from "@/components/Deck";
import useStore from "@/state";

const App = () => {
  const { placeholderDecksRef } = useStore();
  const { decks } = useDecks();

  return (
    <>
      <LayoutGroup>
        {placeholderDecksRef.size > 0 && (
          <>
            {decks.map((deck) => (
              <Deck key={deck.id} deck={deck} />
            ))}
          </>
        )}
        <Decks />
        <NewPlayground />
      </LayoutGroup>
      {/* <LayoutGroup id="test">
        <DeckCollection />
        <Playground />
      </LayoutGroup> */}
    </>
  );
};

export default App;
