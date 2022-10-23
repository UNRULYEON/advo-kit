import {
  motion,
  PanInfo,
  useAnimationControls,
  useDragControls,
  Variants,
} from 'framer-motion'
import { FC } from 'react'
import styled from 'styled-components'

type CardProps = {
  id: string
  image?: string
  question: string
  moveCardToBack: (id: string) => void
}

const Card: FC<CardProps> = ({ id, question, moveCardToBack }) => {
  const cardControls = useAnimationControls()
  const dragControls = useDragControls()

  const cardVariants: Variants = {
    'to-side': {
      translateX: 320,
      translateY: 60,
      rotateZ: 5,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        zIndex: -1,
      },
    },
    'to-back': {
      translateX: 100,
      translateY: 60,
      rotateZ: 0,
      zIndex: -1,
      transition: {
        duration: 0.25,
      },
      transitionEnd: {
        zIndex: 0,
      },
    },
  }

  const handleOnDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // if (info.offset.x > 200 || info.offset.x < -200) {
    //   console.log('drag')
    //   cardControls.start('to-back').then(() => moveCardToBack(id))
    // }
  }

  const handleOnClick = async () => {
    await cardControls.start('to-side')
    await cardControls.start('to-back')
    moveCardToBack(id)
  }

  return (
    <CardStyled
      variants={cardVariants}
      animate={cardControls}
      initial={{
        translateX: 100,
        translateY: 60,
      }}
      whileTap={{ scale: 0.95 }}
      drag="x"
      dragControls={dragControls}
      whileDrag={{ scale: 1.05 }}
      dragConstraints={{ left: -250, right: 250 }}
      onDragEnd={handleOnDrag}
      dragSnapToOrigin
      onClick={handleOnClick}
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

  background-color: white;
  color: black;
  border-radius: 8px;

  user-select: none;

  :hover {
    cursor: pointer;
  }
`

export default Card
