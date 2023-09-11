import useDecks from "@/api/useDecks";
import styled from "styled-components";
import { Variants, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { DeckCollectionPlaceholder } from "@/components/Deck";

const Decks = () => {
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

  useEffect(() => {
    if (decks) void decksContainerControls.start("visible");
  }, [decksContainerControls, decks, isLoading]);

  return (
    <Container>
      <DecksContainer
        variants={decksContainerVariants}
        initial="hidden"
        animate={decksContainerControls}
      >
        {decks.map((deck) => (
          <DeckCollectionPlaceholder key={deck.id} deck={deck} />
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
  align-items: center;
  gap: 24px;
  height: 210px;

  overflow-y: hidden;
  overflow-x: auto;
`;

export default Decks;
