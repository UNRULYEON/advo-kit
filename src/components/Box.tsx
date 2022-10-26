import { useAtom } from 'jotai'
import { FC, useState } from 'react'
import styled from 'styled-components'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion'
import { Card as CardType } from '../constants'
import { selectedDeckAtom } from '../state'
import Card from './Card'
import CoolblueLogoButton from './CoolblueLogoButton'
import TopInsides from './TopInsides'
import RightInsides from './RightInsides'
import LeftInsides from './LeftInsides'
import BackInsides from './BackInsides'
import FrontInsides from './FrontInsides'

const shuffle = (arr: any[]) => {
  const tempArr = [...arr]

  for (let i = tempArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]]
  }

  return tempArr
}

const Box: FC = () => {
  const [isLidOpen, setIsLidOpen] = useState<boolean>(false)
  const [selectedDeck] = useAtom(selectedDeckAtom)
  const [deck, setDeck] = useState<CardType[]>([
    ...shuffle(selectedDeck.cards),
    {
      id: 'joker',
      question: "You've reached the end. Click to start over. ",
      image: 'avocado.png',
    },
  ])

  const boxControls = useAnimationControls()

  const lidControls = useAnimationControls()
  const lidVariants: Variants = {
    closed: {
      rotateX: 90,
    },
    open: {
      rotateX: 150,
      transition: {
        duration: 0.5,
        ease: 'backOut',
      },
    },
  }

  const deckControls = useAnimationControls()
  const deckVariants: Variants = {
    hidden: {
      translateX: -10,
      translateZ: 180,
    },
    visible: {
      zIndex: 1,
      translateX: -10,
      translateY: -400,
      translateZ: 400,
    },
  }

  const handleOnClickButton = async () => {
    if (!isLidOpen) {
      await lidControls.start('open').then(() => setIsLidOpen(true))
      await deckControls.start('visible')
    }
  }

  const moveCardToBack = (id: string) => {
    setDeck((od) => {
      const newDeck = [...od]
      const cardToMoveIndex = newDeck.findIndex((c) => c.id === id)
      const cardToMove = newDeck[cardToMoveIndex]
      newDeck.splice(cardToMoveIndex, 1)
      const reorderedDeck = [...newDeck, cardToMove]

      return reorderedDeck
    })
  }

  const filteredAndReversedDeck = deck
    .filter((c) => c.id !== deck[0].id)
    .reverse()

  return (
    <Scene>
      <BoxStyled
        animate={boxControls}
        onPan={(e, pointInfo) => {
          // console.log(pointInfo)
          boxControls.set({
            rotateY: pointInfo.offset.x / 10,
            rotateX: -pointInfo.offset.y / 10,
          })
        }}
      >
        <CoolblueLogoButton
          onClick={handleOnClickButton}
          alternateTooltipText={
            isLidOpen ? 'Click on me card mate!' : undefined
          }
        />
        <div className="right">
          <RightInsides />
        </div>
        <div className="left">
          <LeftInsides />
        </div>
        <div className="front">
          <FrontInsides />
        </div>
        <div className="back">
          <BackInsides />
        </div>
        <DeckStyled variants={deckVariants} animate={deckControls}>
          {filteredAndReversedDeck.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              question={card.question}
              image={card.image}
              deckName={selectedDeck.name}
              moveCardToBack={moveCardToBack}
            />
          ))}
        </DeckStyled>
        <div className="inside-shadow" />
        <motion.div
          initial="closed"
          animate={lidControls}
          variants={lidVariants}
          className="top"
        >
          <TopInsides />
        </motion.div>
      </BoxStyled>
    </Scene>
  )
}

const Scene = styled.div`
  grid-area: box;
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  perspective: 1000px;
  perspective-origin: 50% calc(50% - 150px);
`

const DeckStyled = styled(motion.div)`
  display: flex;
`

const BoxStyled = styled(motion.div)`
  margin-top: 200px;
  width: 400px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: scale(0.8) rotateY(0deg) rotateX(0deg) translateZ(-100px);

  .front,
  .right,
  .back,
  .left {
    position: absolute;
    width: 400px;
    height: 300px;
    transform-style: preserve-3d;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .front {
    transform: translateZ(400px);

    background-color: #0090e3;
  }

  .right {
    transform: rotateY(90deg) translateZ(200px) translateX(-200px);

    background-color: #0090e3;
    box-shadow: inset -10px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .back {
    transform: rotateY(180deg);

    background-color: #0090e3;
    box-shadow: inset -1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .left {
    transform: rotateY(270deg) translateZ(200px) translateX(200px);

    background-color: #0090e3;
    box-shadow: inset 10px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .top {
    position: relative;
    width: 400px;
    height: 400px;
    transform-style: preserve-3d;

    transform-origin: top center;
  }

  .inside-shadow {
    position: absolute;
    width: 400px;
    height: 400px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(255, 255, 255, 0) 100%
    );

    transform: translateY(-200px) translateZ(200px) rotateZ(90deg)
      rotateY(90deg);
  }

  .shadow {
    width: inherit;
    height: inherit;

    box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0, 0.1);

    /* background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.25) 100%
    ); */
  }
`

export default Box
