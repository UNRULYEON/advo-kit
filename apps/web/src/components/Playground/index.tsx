import useStore from "@/state";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";

const Playground: FC = () => {
  const { selectedDeck } = useStore();

  return (
    <Container>
      <AnimatePresence mode="popLayout">
        {selectedDeck ? (
          <Deck layout key={selectedDeck.id} layoutId={selectedDeck.id}>
            {selectedDeck.name}
          </Deck>
        ) : null}
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
  width: 115px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #d5d5d5;
  border-radius: 8px;

  user-select: none;
  z-index: 2;

  :hover {
    cursor: pointer;
  }
`;

export default Playground;
