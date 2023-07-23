import { useDeckCards } from "@/api/useDecks";
import useStore from "@/state";
import { Variants, motion, useAnimation, useDragControls } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

const Playground: FC = () => {
  const { selectedDeck } = useStore();
  const { cards } = useDeckCards(selectedDeck?.id);
  const constraintsRef = useRef(null);
  const deckControls = useAnimation();
  const cardsContainerControls = useAnimation();
  const cardsControls = useAnimation();
  const dragControls = useDragControls();

  const deckVariants: Variants = {
    shown: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      transitionEnd: {
        visibility: "hidden",
        zIndex: -1,
      },
    },
  };

  const cardContainerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    shown: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
  };

  const cardVariants: Variants = {
    disturbed: (i) => ({
      rotate: i % 2 === 0 ? 5 : -5,
    }),
  };

  useEffect(() => {
    if (cards) {
      void cardsContainerControls
        .start("shown")
        .then(() => deckControls.start("hidden"))
        .then(() => cardsControls.start("disturbed"));
    }
  }, [deckControls, cardsContainerControls, cardsControls, cards]);

  return (
    <Container ref={constraintsRef}>
      {cards && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "absolute", top: "12px" }}
        >
          Reshuffle
        </motion.button>
      )}
      {selectedDeck && (
        <Deck
          layout
          key={`playground-placeholder-${selectedDeck.id}`}
          layoutId={selectedDeck.id}
          initial="shown"
          variants={deckVariants}
          animate={deckControls}
        >
          <span>{selectedDeck.name}</span>
        </Deck>
      )}
      <CardContainer
        key={selectedDeck?.id}
        initial="hidden"
        variants={cardContainerVariants}
        animate={cardsContainerControls}
        exit="hidden"
      >
        {cards?.map((card, i) => (
          <Card
            key={card.id}
            custom={i}
            variants={cardVariants}
            animate={cardsControls}
            drag
            dragControls={dragControls}
            dragConstraints={constraintsRef}
            dragTransition={{
              bounceStiffness: 200,
              timeConstant: 100,
              power: 0.2,
            }}
          >
            {card.content}
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  overflow: hidden;
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

const CardContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 120px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  background-color: #d5d5d5;
  border-radius: 8px;

  user-select: none;

  :hover {
    cursor: grab;
  }

  > span {
    max-width: 105px;
  }
`;

export default Playground;
