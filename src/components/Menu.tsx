import { AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { decksAtom } from '../state'

const Menu: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [decks] = useAtom(decksAtom)

  return (
    <MenuContainerStyled>
      <AnimatePresence>
        {isVisible && (
          <MenuStyled>
            <SearchStyled
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <QuestionsStyled>
              {decks.map((deck) =>
                deck.cards
                  .filter(
                    (card) =>
                      card.id.toLowerCase().includes(search) ||
                      card.question.toLowerCase().includes(search) ||
                      deck.name.toLowerCase().includes(search)
                  )
                  .map((card) => (
                    <QuestionStyled key={`${deck.id}-${card.id}`}>
                      {card.question}
                    </QuestionStyled>
                  ))
              )}
            </QuestionsStyled>
          </MenuStyled>
        )}
      </AnimatePresence>
      <IconStyled onClick={() => setIsVisible((v) => !v)}>Menu</IconStyled>
    </MenuContainerStyled>
  )
}

const MenuContainerStyled = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
`

const MenuStyled = styled.div`
  padding: 12px 0;
  margin-bottom: 12px;

  display: flex;
  flex-flow: column;
  border-radius: 8px;

  background-color: whitesmoke;
  color: black;
`

const SearchStyled = styled.input`
  margin: 6px 12px;
`

const QuestionsStyled = styled.div`
  overflow: auto;
`

const QuestionStyled = styled.div`
  margin: 6px 12px;
`

const IconStyled = styled.button`
  :hover {
    cursor: pointer;
  }
`

export default Menu
