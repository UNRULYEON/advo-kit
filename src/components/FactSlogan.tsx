import { FC } from 'react'
import styled from 'styled-components'

type FactSloganProps = {
  fact: string
  slogan?: string
}

const FactSlogan: FC<FactSloganProps> = ({ fact, slogan }) => {
  return (
    <FactSloganContainer>
      <FactStyled>{fact}</FactStyled>
      <SloganStyled>{slogan}.</SloganStyled>
    </FactSloganContainer>
  )
}

const FactSloganContainer = styled.div`
  position: absolute;
  top: 75px;
  left: 75px;

  display: flex;
  flex-flow: column;
`

const FactStyled = styled.span`
  font-family: AvenirBlack;
  color: #285dab;
  font-style: normal;
  font-weight: 800;
  font-size: 58.1188px;
  text-transform: uppercase;

  &::after {
    content: '.';
    color: #ff6600;
  }
`
const SloganStyled = styled.span`
  margin-top: -25px;
  font-family: DobraBook;
  font-style: normal;
  font-weight: 400;
  font-size: 45.2035px;
  color: #0090e3;
`

export default FactSlogan
