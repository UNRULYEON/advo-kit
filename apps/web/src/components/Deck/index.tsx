import { FC, RefObject, useEffect, useRef, useState } from "react";
import type Deck from "@/models/deck";
import useStore from "@/state";
import styled from "styled-components";
import { Variants, motion } from "framer-motion";

type DeckProps = {
  deck: Deck;
};

const Deck: FC<DeckProps> = ({ deck }) => {
  const { appRef, placeholderDecksRef, setDeckRef, removeDeckRef } = useStore();
  const deckRef = useRef<HTMLDivElement>(null);
  const [placeholderRef, setPlaceholderRef] = useState<
    RefObject<HTMLDivElement> | undefined
  >(undefined);

  useEffect(() => {
    if (deckRef.current) setDeckRef(deck.id, deckRef);

    return () => {
      if (deckRef.current) removeDeckRef(deck.id);
    };
  }, [deckRef]);

  useEffect(() => {
    const placeholder = placeholderDecksRef.get(deck.id);
    console.log(placeholder);

    if (placeholder?.current) {
      setPlaceholderRef(placeholder);
    }
  }, [placeholderDecksRef]);

  // useEffect(() => {
  //   if (!placeholderRef || !deckRef.current) return;

  //   if (placeholderRef.current) {
  //     const placeholderRect = placeholderRef.current.getBoundingClientRect();
  //     const deckRect = deckRef.current.getBoundingClientRect();

  //     const x = placeholderRect.x - deckRect.x;
  //     const y = placeholderRect.y - deckRect.y;

  //     deckRef.current.style.transform = `translate(${x}px, ${y}px)`;
  //   }
  // }, [placeholderRef, deckRef]);

  if (!placeholderRef || !deckRef) return null;

  return (
    <Container ref={deckRef} drag dragConstraints={appRef}>
      {deck.name}
    </Container>
  );
};

const Container = styled(motion.div)`
  position: absolute;
  width: 115px;
  height: 160px;

  background-color: royalblue;
  z-index: 1;
`;

export default Deck;

type DeckCollectionPlaceholderProps = {
  deck: Deck;
};

export const DeckCollectionPlaceholder: FC<DeckCollectionPlaceholderProps> = ({
  deck,
}) => {
  const { setPlaceholderDeckRef, removePlaceholderDeckRef } = useStore();
  const placeholderRef = useRef<HTMLDivElement>(null);

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
    if (placeholderRef.current) setPlaceholderDeckRef(deck.id, placeholderRef);

    return () => {
      if (placeholderRef.current) removePlaceholderDeckRef(deck.id);
    };
  }, [placeholderRef]);

  return (
    <DeckCollectionPlaceholderStyled
      ref={placeholderRef}
      variants={deckVariants}
      onUpdate={(latest) => console.log(latest)}
    >
      <AnchorPoint />
    </DeckCollectionPlaceholderStyled>
  );
};

const DeckCollectionPlaceholderStyled = styled(motion.div)`
  position: relative;
  min-width: 115px;
  height: 160px;
  outline: 4px dotted rgb(226 226 226);
  border-radius: 8px;

  :first-of-type {
    margin-left: 24px;
  }

  :last-of-type {
    margin-right: 24px;
  }
`;

const AnchorPoint = styled.div`
  position: absolute;
  top: calc(50% - 2.5px);
  left: calc(50% - 2.5px);
  width: 5px;
  height: 5px;
  border-radius: 50%;

  background-color: red;
`;
