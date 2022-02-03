import { Link } from "react-router-dom"

export default function Header() {
  return(
    <div className="header">
      <Link to='/'><h2>Home</h2></Link>
      <Link to='/About'><h2>About</h2></Link>
      <Link to='/Research'><h2>Research</h2></Link>
      <Link to='CV'><h2>CV</h2></Link>
      <Link to='Contact'><h2>Contact</h2></Link>
    </div>
  )
}