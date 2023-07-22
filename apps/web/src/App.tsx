import DeckCollection from "@/components/DeckCollection";
import Playground from "@/components/Playground";
import { LayoutGroup } from "framer-motion";

const App = () => {
  return (
    <>
      <LayoutGroup id="test">
        <DeckCollection />
        <Playground />
      </LayoutGroup>
    </>
  );
};

export default App;
