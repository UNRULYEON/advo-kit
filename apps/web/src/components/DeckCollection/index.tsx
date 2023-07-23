import { FC, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import useDecks from "@/api/useDecks";
import useStore from "@/state";
import Deck from "@/models/deck";

const DeckCollection: FC = () => {
  const { selectedDeck, setSelectedDeck } = useStore();
  const { decks, isLoading } = useDecks();
  const decksContainerControls = useAnimation();

  const decksContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const deckVariants: Variants = {
    hidden: {
      y: -200,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: "circOut",
      },
    },
  };

  useEffect(() => {
    if (decks) void decksContainerControls.start("visible");
  }, [decksContainerControls, decks, isLoading]);

  const handleOnDeckTap = (deck: Deck) => {
    setSelectedDeck(deck);
  };

  return (
    <Container>
      <DecksContainer
        variants={decksContainerVariants}
        initial="hidden"
        animate={decksContainerControls}
      >
        {decks &&
          decks.map((deck, i) => (
            <DeckContainer key={`${i}-${deck.id}`} variants={deckVariants}>
              <DeckPlaceholder />
              <AnimatePresence mode="popLayout">
                {selectedDeck?.id !== deck.id && (
                  <Deck
                    key={deck.id}
                    layout
                    layoutId={deck.id}
                    onClick={() => handleOnDeckTap(deck)}
                  >
                    <span>{deck.name}</span>
                  </Deck>
                )}
              </AnimatePresence>
            </DeckContainer>
          ))}
      </DecksContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;

  background-color: #ededed;
`;

const DecksContainer = styled(motion.div)`
  display: flex;
  flex-flow: row;
  gap: 24px;
  height: 210px;

  overflow-y: hidden;
  overflow-x: auto;
`;

const DeckContainer = styled(motion.div)`
  position: relative;
  display: flex;
  min-width: 120px;
  width: 100%;
  max-width: 120px;
  height: 100%;
  justify-content: center;
  align-items: center;

  :first-of-type {
    margin-left: 24px;
  }

  :last-of-type {
    margin-right: 24px;
  }
`;

const DeckPlaceholder = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: rgb(226 226 226);
  z-index: 1;
  border-radius: 8px;

  transform: rotate(45deg);
`;

const Deck = styled(motion.div)`
  min-width: 120px;
  width: 100%;
  max-width: 120px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  background-color: #d5d5d5;
  border-radius: 8px;

  user-select: none;
  z-index: 2;

  :hover {
    cursor: pointer;
  }

  > span {
    max-width: 105px;
  }
`;

export default DeckCollection;
