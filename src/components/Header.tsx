import {Link} from "react-router-dom"

const Header = (props: { pages:{url:string, name:string}[]}) => {
  const {pages} = props
  return(
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container"> 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {pages.map(page => (
              <li className="nav-item" key={page.name}>
                <Link to={page.url} className="nav-link active" >{page.name}</Link>
              </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>)
}

export default Header