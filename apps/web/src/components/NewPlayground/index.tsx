import useStore from "@/state";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const NewPlayground = () => {
  const { selectedDeck, setPlaygroundRef } = useStore();

  const playgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playgroundRef.current) setPlaygroundRef(playgroundRef);
  }, [playgroundRef]);

  return (
    <Container ref={playgroundRef}>
      <DeckPlaceholder />
      {selectedDeck && (
        <motion.div key={selectedDeck.id}>{selectedDeck.name}</motion.div>
      )}
    </Container>
  );
};

export default NewPlayground;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  overflow: hidden;
`;

const DeckPlaceholder = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: rgb(226 226 226);
  border-radius: 8px;

  transform: rotate(45deg);
`;
