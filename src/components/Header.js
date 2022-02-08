import { Link } from "react-router-dom"
import { useState } from "react"

export default function Header() {
  const [isActive, setActive] = useState(false)
  function handleClick() {
    setActive(!isActive)
  }
  return(
    <div className="header">
      <button className="hamburger" onClick={handleClick}>
      <img src="https://img.icons8.com/ios/50/ffffff/menu--v1.png" />
      </button>
      <div className={isActive ? "hidden menu-items" : "menu-items"}>
        <Link to='/'><h2>Home</h2></Link>
        <Link to='/About'><h2>About Me</h2></Link>
        <Link to='/Research'><h2>Research</h2></Link>
        <Link to='/CV'><h2>CV</h2></Link>
      </div>
    </div>
  )
}