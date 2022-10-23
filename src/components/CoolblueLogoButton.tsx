import { motion } from 'framer-motion'
import { FC } from 'react'
import styled from 'styled-components'
import CoolblueLogoText from './CoolblueLogoText'

type CoolblueLogoButtonProps = {
  onClick: () => void
}

const CoolblueLogoButton: FC<CoolblueLogoButtonProps> = ({ onClick }) => {
  return (
    <ButtonStyled>
      <ButtonSideStyled />
      <ButtonFaceStyled
        onClick={() => onClick()}
        initial={{ translateY: 7 }}
        whileHover={{ translateY: 10 }}
        whileTap={{ translateY: 5 }}
      >
        <CoolblueLogoText width={60} height={60} />
      </ButtonFaceStyled>
    </ButtonStyled>
  )
}

const ButtonStyled = styled.div`
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

  width: 100px;
  height: 100px;
  border-radius: 50%;

  background-color: #ff6600;

  :hover {
    cursor: pointer;
  }
`

export default CoolblueLogoButton
