import { motion, useAnimationControls, Variants } from 'framer-motion'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Deck } from '../constants'
import ArrowIcon from '../icons/ArrowIcon'
import { decksAtom, selectedDeckAtom } from '../state'

const DeckSelector = () => {
  const [selectedDeck, setSelectedDeck] = useAtom(selectedDeckAtom)
  const [decks] = useAtom(decksAtom)
  const [isActive, setIsActive] = useState<boolean>(false)

  const deckOptionListControls = useAnimationControls()
  const DeckOptionListVariants: Variants = {
    hide: {
      opacity: 0,
      translateY: 4,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      translateY: 8,
      transition: {
        duration: 0.2,
      },
    },
  }

  const handleDeckChange = (deck: Deck) => {
    setIsActive((ia) => !ia)
    setSelectedDeck(deck)
  }

  const options: Deck[] = [...decks, { id: 'soon', name: 'Soon...', cards: [] }]

  useEffect(() => {
    deckOptionListControls.start(isActive ? 'show' : 'hide')
  }, [deckOptionListControls, isActive])

  return (
    <DeckContainerStyled>
      <DeckSelectorStyled>
        <CurrentDeck onClick={() => setIsActive((a) => !a)} active={isActive}>
          {isActive ? 'Choose your kit' : selectedDeck.name}
        </CurrentDeck>
        <IconStyled active={isActive}>
          <ArrowIcon />
        </IconStyled>
        <DeckOptionList
          initial="hide"
          variants={DeckOptionListVariants}
          animate={deckOptionListControls}
        >
          {options.map((deck, i) => (
            <DeckOption
              key={deck.id}
              onClick={() => {
                if (i !== options.length - 1) handleDeckChange(deck)
              }}
              disabled={i === options.length - 1}
            >
              {deck.name}
            </DeckOption>
          ))}
          {options.length === 0 && (
            <DeckOptionListEmptyState>No other decks</DeckOptionListEmptyState>
          )}
        </DeckOptionList>
      </DeckSelectorStyled>
    </DeckContainerStyled>
  )
}

const DeckContainerStyled = styled.div`
  position: absolute;
  display: flex;
  top: 75px;
  right: 75px;
  width: 100%;
  max-width: 240px;
  justify-content: flex-start;
  flex-direction: column;
`

const DeckSelectorStyled = styled.div`
  position: relative;
  display: flex;
  height: 40px;
  justify-content: flex-start;
  flex-direction: column;
  justify-content: center;

  user-select: none;
`

const CurrentDeck = styled.div<{ active: boolean }>`
  position: absolute;
  padding: 9.5px 10px;
  width: 220px;
  border-radius: 4px;

  background-color: white;
  border: ${({ active }) =>
    active ? ' 1px solid #0090E3' : ' 1px solid #dddddd'};
  color: black;

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 146%;

  transition: 0.1s ease-in-out;

  :hover {
    cursor: pointer;
    border: ${({ active }) =>
      active ? ' 1px solid #0090E3' : ' 1px solid #a8a8a8'};

    transition: 0.1s ease-in-out;
  }
`

const IconStyled = styled.div<{ active: boolean }>`
  position: absolute;
  right: 16px;
  transition: 0.1s ease-in-out;
  transition: transform 0.2s ease-in-out;

  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0deg)')};

  > svg > path {
    fill: ${({ active }) => (active ? '#0090E3' : '#BBBBBB')};
    transition: 0.1s ease-in-out;
  }
`

const DeckOptionList = styled(motion.div)`
  position: absolute;
  width: -webkit-fill-available;
  top: 40px;

  display: flex;
  flex-flow: column;
  overflow: overlay;
  border-radius: 4px;

  background-color: white;
  color: black;
`

const DeckOption = styled.div<{ disabled?: boolean }>`
  padding: 10px;
  color: ${({ disabled }) => (disabled ? '#BBBBBB' : 'inherit')};

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  :hover {
    background-color: ${({ disabled }) => (disabled ? 'white' : '#f2f7fc')};
    cursor: ${({ disabled }) => (disabled ? 'not-allo' : 'pointer')};
  }
`

const DeckOptionListEmptyState = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  color: gray;
`

export default DeckSelector
