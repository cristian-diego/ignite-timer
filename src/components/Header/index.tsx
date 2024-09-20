import { NavLink } from 'react-router-dom'
import {
  FlagButton,
  HeaderContainer,
  HeaderLeftContainer,
  StyledFlag,
} from './styles'
import { Flag, HandPalm, Scroll, Timer } from 'phosphor-react'
import logo from '../../assets/logo.svg'
import { useContext } from 'react'
import { CultureContext } from '../../contexts/CultureContext'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} />

      <nav>
        <HeaderLeftContainer>
          <LanguageSelectionPicker />
        </HeaderLeftContainer>
        <NavLink to='/' title='Timer'>
          <Timer size={24} />
        </NavLink>

        <NavLink to='/history' title='History'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

export default function LanguageSelectionPicker() {
  const { culture, changeCulture } = useContext(CultureContext)

  function handleChangeCulture(culture: 'pt' | 'en') {
    changeCulture(culture)
  }

  return (
    <>
      <FlagButton
        isActive={culture === 'pt'}
        onClick={() => handleChangeCulture('pt')}
      >
        <StyledFlag size={24} isActive={culture === 'pt'} />
        <span>Português</span>
      </FlagButton>

      <FlagButton
        isActive={culture === 'en'}
        onClick={() => handleChangeCulture('en')}
      >
        <StyledFlag size={24} isActive={culture === 'en'} />
        <span>English</span>
      </FlagButton>
    </>
  )
}
