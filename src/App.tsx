import styled from 'styled-components'
import Box from './components/Box'
import DeckSelector from './components/DeckSelector'
import FactSlogan from './components/FactSlogan'
import Footer from './components/Footer'
import Menu from './components/Menu'

const App = () => {
  return (
    <AppStyled>
      <Box />
      <FactSlogan fact="Advo-kit" slogan="Think outside the box" />
      <DeckSelector />
      <Footer />
      <Menu />
    </AppStyled>
  )
}

const AppStyled = styled.main`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;
  grid-template-areas:
    'box'
    'footer';
  justify-items: center;
  align-items: center;
  flex-flow: column;
`

export default App
