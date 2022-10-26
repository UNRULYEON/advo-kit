import { AnimatePresence, motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { FC, useState } from 'react'
import styled from 'styled-components'
import ListIcon from '../icons/ListIcon'
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
      <IconContainerStyled>
        <IconBackgroundStyled />
        <IconStyled
          whileHover={{ bottom: 3 }}
          whileTap={{ bottom: 0 }}
          onClick={() => setIsVisible((v) => !v)}
        >
          <ListIcon />
        </IconStyled>
      </IconContainerStyled>
    </MenuContainerStyled>
  )
}

const MenuContainerStyled = styled.div`
  position: absolute;
  left: 75px;
  bottom: 44px;
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

const IconContainerStyled = styled.div`
  position: relative;
  left: 0px;
  bottom: 0px;
`

const IconStyled = styled(motion.button)`
  position: absolute;
  left: 0px;
  bottom: 2px;
  padding: 14px 16px;

  border-radius: 4px;
  border: none;
  background-color: #285dab;

  :hover {
    cursor: pointer;
  }
`

const IconBackgroundStyled = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;

  border-radius: 4px;
  width: 52px;
  height: 48px;
  background-color: #19457e;
`

export default Menu
