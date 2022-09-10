import { HeaderContainer } from './styles'
import logoIgnite from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Home">
          <Timer size={24} color="#00875F" />
        </NavLink>
        <NavLink to="/history" title="history">
          <Scroll size={24} color="#E1E1E6" />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
