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
  question: string
  image: string
  deckName: string
  moveCardToBack: (id: string) => void
}

const Card: FC<CardProps> = ({
  id,
  question,
  image,
  deckName,
  moveCardToBack,
}) => {
  const cardControls = useAnimationControls()
  const dragControls = useDragControls()

  const cardVariants: Variants = {
    'to-side': {
      translateX: 370,
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
      scale: 0.9,
      rotateZ: 0,
      zIndex: -1,
      transition: {
        duration: 0.25,
      },
      transitionEnd: {
        zIndex: 0,
        scale: 1,
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
      // index={invertedIndex}
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
      <CardContents>
        <ImageStyled src={`/images/${image}`} />
        <CardQuestion>{question}</CardQuestion>
        <DeckName>{deckName}</DeckName>
      </CardContents>
    </CardStyled>
  )
}

const CardStyled = styled(motion.div)`
  position: absolute;
  max-width: 220px;

  background-color: white;
  color: black;
  border-radius: 8px;

  user-select: none;

  :hover {
    cursor: pointer;
  }
`

const CardContents = styled.div`
  width: inherit;
  height: 100%;
  max-height: -webkit-fill-available;
  padding: 27px 16px 20px 16px;

  display: grid;
  grid-template-rows: 111px 120px min-content;
  grid-template-columns: 1fr;
`

const ImageStyled = styled.img`
  height: 110px;
  justify-self: center;
`

const CardQuestion = styled.div`
  display: flex;
  align-items: flex-end;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`

const DeckName = styled.div`
  margin-top: 20px;
  padding: 6px 8px;

  border-radius: 4px;

  background-color: #e0f6e0;

  color: #00b900;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 9px;
`

export default Card
