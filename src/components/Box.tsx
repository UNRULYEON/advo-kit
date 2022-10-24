import { useAtom } from 'jotai'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { motion, useAnimationControls, Variants } from 'framer-motion'
import { Card as CardType } from '../constants'
import { selectedDeckAtom } from '../state'
import Card from './Card'
import CoolblueLogoButton from './CoolblueLogoButton'

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
  const [deck, setDeck] = useState<CardType[]>([
    ...shuffle(useAtom(selectedDeckAtom)[0].cards),
    { id: 'joker', question: 'JOKER' },
  ])

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
      translateZ: 200,
    },
    visible: {
      zIndex: 1,
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
      <BoxStyled>
        <div className="front">
          <CoolblueLogoButton onClick={handleOnClickButton} />
        </div>
        <div className="right" />
        <div className="back" />
        <div className="left" />
        <DeckStyled variants={deckVariants} animate={deckControls}>
          {filteredAndReversedDeck.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              question={card.question}
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

const BoxStyled = styled.div`
  margin-top: 200px;
  width: 400px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: scale(0.8) rotateY(0deg) rotateX(0deg);

  .front,
  .right,
  .back,
  .left {
    position: absolute;
    width: 400px;
    height: 300px;
  }

  .front {
    display: flex;
    justify-content: center;
    align-items: center;

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
    height: 401px;
    transform-style: preserve-3d;

    transform-origin: top center;
    /* background-color: rgba(0, 0, 0, 0.3); */
    /* background: linear-gradient(
      0deg,
      rgba(0, 144, 227, 1) 0%,
      rgba(0, 104, 163, 1) 100%
    ); */
  }

  .inside-shadow {
    position: absolute;
    width: 400px;
    height: 400px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(255, 255, 255, 0) 100%
    );

    transform: translateY(-200px) translateZ(200px) rotateZ(90deg)
      rotateY(90deg);
  }
`

export default Box

const TopInsides: FC = () => {
  return (
    <>
      <TopTop />
      <TopRightOutside />
      <TopRightInside />
      <TopRightCover />

      <TopLeftOutside />
      <TopLeftInside />
      <TopLeftCover />

      <TopFrontOutside />
      <TopFrontInside />
      <TopFrontCover />

      <TopBackOutside />
      <TopBackInside />
      <TopBackCover />
    </>
  )
}

// TOP
const TopTop = styled.div`
  position: absolute;
  width: 400px;
  height: 401px;

  transform: translateZ(30px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

// RIGHT
const TopRightOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) translateZ(385px) translateX(-15px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`
const TopRightInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) translateZ(365px) translateX(-15px) translateY(20px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

const TopRightCover = styled.div`
  position: absolute;
  height: 360px;

  border-right: 20px solid rgba(0, 0, 0, 0.15);
  /* border-right: 20px solid #0090e3; */
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;

  transform: translateX(380px);
`

// LEFT
const TopLeftOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) translateZ(-15px) translateX(-15px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

const TopLeftInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) translateZ(5px) translateX(-15px) translateY(20px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

const TopLeftCover = styled.div`
  position: absolute;
  height: 360px;

  border-left: 20px solid rgba(0, 0, 0, 0.15);
  /* border-left: 20px solid #0090e3; */
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;

  transform: translateX(0px);
`

// FRONT
const TopFrontOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(-200px) translateY(185px)
    translateX(-15px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

const TopFrontInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(-200px) translateY(185px)
    translateX(-15px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

const TopFrontCover = styled.div`
  position: absolute;
  width: 360px;

  border-bottom: 20px solid rgba(0, 0, 0, 0.15);
  /* border-bottom: 20px solid #0090e3; */
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  transform: translateY(380px);
`

// BACK
const TopBackOutside = styled.div`
  position: absolute;
  height: 400px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(200px) translateY(185px)
    translateX(-15px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

const TopBackInside = styled.div`
  position: absolute;
  height: 360px;
  width: 30px;

  transform: rotateY(90deg) rotateX(90deg) translateZ(160px) translateY(185px)
    translateX(-15px);

  background-color: rgba(0, 0, 0, 0.15);
  /* background-color: #0090e3; */
`

const TopBackCover = styled.div`
  position: absolute;
  width: 360px;

  border-top: 20px solid rgba(0, 0, 0, 0.15);
  /* border-top: 20px solid #0090e3; */
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  transform: translateY(0px);
`
