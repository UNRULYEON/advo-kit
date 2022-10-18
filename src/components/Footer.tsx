import { FC } from 'react'
import styled from 'styled-components'

const Footer: FC = () => {
  return <FooterStyled>Powered by Advo-kit & Amar</FooterStyled>
}

const FooterStyled = styled.footer`
  grid-area: footer;
  padding: 12px;
`

export default Footer
