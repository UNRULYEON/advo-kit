import { useAtom } from 'jotai'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { motion, useAnimationControls, Variants } from 'framer-motion'
import { Card as CardType } from '../constants'
import { selectedDeckAtom } from '../state'
import Card from './Card'

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
  const [deck, setDeck] = useState<
    ({ presented: boolean; discarded: boolean } & CardType)[]
  >([
    ...shuffle(
      useAtom(selectedDeckAtom)[0].cards.map((card) => ({
        ...card,
        presented: false,
        discarded: false,
      }))
    ),
  ])
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(-1)

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

  const handleOnClickBox = async () => {
    if (!isLidOpen) {
      await lidControls.start('open')
      setIsLidOpen(true)
    }

    const newCurrentCardIndex = currentCardIndex + 1
    const newDeck = [...deck]

    if (currentCardIndex >= 0) {
      newDeck[currentCardIndex].presented = false
      newDeck[currentCardIndex].discarded = true
    }

    newDeck[newCurrentCardIndex].presented = true

    setDeck(newDeck)
    setCurrentCardIndex(newCurrentCardIndex)
  }

  return (
    <Scene>
      <BoxStyled onClick={() => handleOnClickBox()}>
        <div className="front">Coolblue</div>
        <div className="right" />
        <div className="back" />
        <div className="left" />
        {deck.map((card) => (
          <Card
            key={card.id}
            question={card.question}
            presented={card.presented}
            discarded={card.discarded}
          />
        ))}
        <div className="inside-shadow" />
        <motion.div
          initial="closed"
          animate={lidControls}
          variants={lidVariants}
          className="top"
        />
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

const BoxStyled = styled.div`
  margin-top: 200px;
  width: 400px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: scale(0.8);

  :hover {
    cursor: pointer;
  }

  .front,
  .right,
  .back,
  .left {
    position: absolute;
    width: 400px;
    height: 300px;
  }

  .left,
  .right {
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  .front {
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    transform: translateZ(400px);

    background-color: #0090e3;
  }

  .right {
    transform: rotateY(90deg) translateZ(200px) translateX(-200px);

    background-color: #0090e3;
    box-shadow: inset -10px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .back {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

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
    position: absolute;
    width: 400px;
    height: 401px;

    transform-origin: top center;
    background: linear-gradient(
      0deg,
      rgba(0, 144, 227, 1) 0%,
      rgba(0, 104, 163, 1) 100%
    );
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
