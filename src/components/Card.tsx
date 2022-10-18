import { motion, useAnimationControls, Variants } from 'framer-motion'
import { FC, useEffect } from 'react'
import styled from 'styled-components'

type CardProps = {
  image?: string
  question: string
  presented: boolean
  discarded: boolean
}

const Card: FC<CardProps> = ({ question, presented, discarded }) => {
  const cardControls = useAnimationControls()
  const cardVariants: Variants = {
    hidden: {
      translateZ: 250,
      translateX: 100,
      translateY: 60,
    },
    presented: {
      translateZ: 395,
      translateX: 100,
      translateY: -330,
      transition: {
        duration: 0.4,
        ease: 'backOut',
      },
    },
    discarded: {
      opacity: 0,
      scale: 0.9,
      translateY: -310,
      // rotateZ: 8,
      // translateZ: 395,
      // translateX: 0,
      // translateY: -330,
    },
  }

  useEffect(() => {
    if (presented) cardControls.start('presented')
  }, [presented, cardControls])

  useEffect(() => {
    if (discarded) cardControls.start('discarded')
  }, [discarded, cardControls])

  return (
    <CardStyled
      variants={cardVariants}
      animate={cardControls}
      initial="hidden"
      whileTap={{ scale: 0.95 }}
    >
      {question}
    </CardStyled>
  )
}

const CardStyled = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateX(100px) translateY(60px) translateZ(250px);

  background-color: white;
  color: black;
  border-radius: 8px;

  :hover {
    cursor: pointer;
  }
`

export default Card
