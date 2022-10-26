import { FC } from 'react'
import styled from 'styled-components'

const Footer: FC = () => {
  return (
    <FooterStyled>
      Powered by team Advo-kit & Amar. Visit the UX page for{' '}
      <a
        href="https://sites.google.com/coolblue.nl/designer-supporter/"
        target="_blank"
        rel="noreferrer"
      >
        more information
      </a>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  grid-area: footer;
  padding: 12px 0 44px;

  color: #69a5c8;
`

export default Footer
