import { motion, useAnimationControls, Variants } from 'framer-motion'
import { useAtom } from 'jotai'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import ListIcon from '../icons/ListIcon'
import MagnifierIcon from '../icons/Magnifier'
import { decksAtom } from '../state'

const Menu: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [decks] = useAtom(decksAtom)
  const menuControls = useAnimationControls()
  const menuVariants: Variants = {
    hide: {
      opacity: 0,
      translateY: -58,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      translateY: -64,
      transition: {
        duration: 0.2,
      },
    },
  }

  useEffect(() => {
    menuControls.start(isVisible ? 'show' : 'hide')
  }, [isVisible, menuControls])

  return (
    <MenuContainerStyled>
      <MenuStyled initial="hide" animate={menuControls} variants={menuVariants}>
        <TitleStyled>List of questions</TitleStyled>
        <SearchContainer>
          <SearchStyled
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifierIconStyled />
        </SearchContainer>
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

const MenuStyled = styled(motion.div)`
  padding: 16px;
  /* margin-bottom: 12px; */
  width: calc(312px - 32px);
  height: 641px;
  position: absolute;
  left: 0px;
  bottom: 0px;

  display: flex;
  flex-flow: column;
  border-radius: 8px;
  gap: 16px;

  background-color: white;
  color: black;
`

const TitleStyled = styled.div`
  font-family: 'DobraMedium';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #285dab;
`

const SearchContainer = styled.div`
  position: relative;
  height: 42px;
  display: flex;
  align-items: center;
`

const SearchStyled = styled.input`
  position: absolute;
  height: inherit;
  width: 100%;
  padding: 0 48px 0 16px;

  border: 1px solid #dddddd;
  border-radius: 4px;

  color: black;
`

const MagnifierIconStyled = styled(MagnifierIcon)`
  position: absolute;
  right: 16px;
`

const QuestionsStyled = styled.div`
  overflow: auto;
`

const QuestionStyled = styled.div`
  margin: 12px 0;
  font-weight: 400;
  size: 14px;
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
