import { Link } from "react-router";

const Header_public = () => {

    return(
        <header className="header-public">

            <div className="header-link-container">
                <Link to='/'>Home</Link>
                <Link to='/aboutUs'>About Us</Link>
            </div>
            
            <div className="header-link-container">
                <Link to='register'>Register</Link>
                <Link to='login'>Login</Link>
            </div>
        </header>
    )
}

export default Header_public
