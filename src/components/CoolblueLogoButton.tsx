import { motion, useAnimationControls, Variants } from 'framer-motion'
import { FC } from 'react'
import styled from 'styled-components'
import CoolblueLogoText from './CoolblueLogoText'

type CoolblueLogoButtonProps = {
  onClick: () => void
}

const CoolblueLogoButton: FC<CoolblueLogoButtonProps> = ({ onClick }) => {
  const tooltipControls = useAnimationControls()
  const tooltipVariants: Variants = {
    hide: {
      opacity: 0,
      translateY: 80,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      translateY: 80,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <ButtonContainer>
      <ButtonStyled>
        <ButtonSideStyled />
        <ButtonFaceStyled
          onClick={() => onClick()}
          initial={{ translateY: 6 }}
          whileHover={{ translateY: 8 }}
          whileTap={{ translateY: 0.1 }}
          onHoverStart={() => tooltipControls.start('show')}
          onHoverEnd={() => tooltipControls.start('hide')}
        >
          <CoolblueLogoText width={60} height={60} />
          <TooltipStyled
            initial={'hide'}
            animate={tooltipControls}
            variants={tooltipVariants}
          >
            Click me to start
          </TooltipStyled>
        </ButtonFaceStyled>
      </ButtonStyled>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  position: absolute;
  width: 400px;
  height: 300px;
  transform: translateZ(401px);

  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonStyled = styled(motion.div)`
  position: relative;
`
const ButtonSideStyled = styled.div`
  position: absolute;

  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #983d00;
`
const ButtonFaceStyled = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;

  width: 100px;
  height: 100px;
  border-radius: 50%;

  background-color: #ff6600;

  :hover {
    cursor: pointer;
  }
`

const TooltipStyled = styled(motion.div)`
  position: absolute;
  padding: 8px 12px;

  border-radius: 4px;
  white-space: nowrap;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;

  background-color: #111111;

  user-select: none;
`

export default CoolblueLogoButton
