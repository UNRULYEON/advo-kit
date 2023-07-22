import useStore from "@/state";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";

const Playground: FC = () => {
  const { selectedDeck } = useStore();

  return (
    <Container>
      <AnimatePresence mode="popLayout">
        {selectedDeck && (
          <Deck layout key={selectedDeck.id} layoutId={selectedDeck.id}>
            <span>{selectedDeck.name}</span>
          </Deck>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  overflow: hidden;
`;

const Deck = styled(motion.div)`
  min-width: 120px;
  width: 100%;
  max-width: 120px;
  height: 150px;
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

export default Playground;
