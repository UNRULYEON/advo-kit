import { AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { useState } from 'react'
import styled from 'styled-components'
import { Deck } from '../constants'
import { decksAtom, selectedDeckAtom } from '../state'

const DeckSelector = () => {
  const [selectedDeck, setSelectedDeck] = useAtom(selectedDeckAtom)
  const [decks] = useAtom(decksAtom)
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleDeckChange = (deck: Deck) => {
    setIsActive(false)
    setSelectedDeck(deck)
  }

  const options = decks.filter((deck) => deck.id !== selectedDeck.id)

  return (
    <DeckSelectorStyled>
      <CurrentDeck onClick={() => setIsActive((a) => !a)}>
        {selectedDeck.name}
      </CurrentDeck>
      <AnimatePresence>
        {isActive && (
          <DeckOptionList>
            {options.map((deck) => (
              <DeckOption key={deck.id} onClick={() => handleDeckChange(deck)}>
                {deck.name}
              </DeckOption>
            ))}
            {options.length === 0 && (
              <DeckOptionListEmptyState>
                No other decks
              </DeckOptionListEmptyState>
            )}
          </DeckOptionList>
        )}
      </AnimatePresence>
    </DeckSelectorStyled>
  )
}

const DeckSelectorStyled = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
`

const CurrentDeck = styled.div`
  padding: 12px;
  border-radius: 6px;

  background-color: whitesmoke;
  color: black;

  transition: background-color 0.2s ease-in-out;

  :hover {
    background-color: #ececec;
    cursor: pointer;
  }
`

const DeckOptionList = styled.div`
  position: absolute;
  width: -webkit-fill-available;
  top: 52px;
  padding: 12px;

  display: flex;
  gap: 6px;
  border-radius: 6px;

  background-color: #ececec;
  color: black;
`

const DeckOption = styled.div`
  :hover {
    cursor: pointer;
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
