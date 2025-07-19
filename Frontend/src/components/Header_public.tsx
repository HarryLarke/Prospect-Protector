import { Link } from "react-router";

const Header_public = () => {

    return(
        <header>

            <div>
                <Link to='/'>Home</Link>
                <Link to='/aboutUs'>About Us</Link>
            </div>
            
            <div>
                <Link to='register'>Register</Link>
                <Link to='login'>Login</Link>
            </div>
        </header>
    )
}

export default Header_public
