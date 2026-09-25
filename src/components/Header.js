import { Link } from "react-router-dom"
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
        <a href='/#intro' onClick={() => setActive(false)}>Home</a>
        <a href='/#research' onClick={() => setActive(false)}>Research</a>
        <a href='/#teaching' onClick={() => setActive(false)}>Teaching</a>
        <Link to='/CV' onClick={() => setActive(false)}>CV</Link>
      </nav>
    </header>
  )
}
