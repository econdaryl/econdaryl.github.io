import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function Header() {
  const [isActive, setActive] = useState(false)
  return(
    <header className="header">
      <button
        className="hamburger"
        onClick={() => setActive(!isActive)}
        aria-label="Toggle navigation"
        aria-expanded={isActive}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={isActive ? "menu-items is-open" : "menu-items"} aria-label="Primary navigation">
        <NavLink to='/' onClick={() => setActive(false)}>Home</NavLink>
        <NavLink to='/About' onClick={() => setActive(false)}>About Me</NavLink>
        <NavLink to='/Research' onClick={() => setActive(false)}>Research</NavLink>
        <NavLink to='/CV' onClick={() => setActive(false)}>CV</NavLink>
      </nav>
    </header>
  )
}
