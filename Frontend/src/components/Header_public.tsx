import { Link } from "react-router";

const Header_public = () => {

    return(
        <header>

            <div>
                <Link>Home</Link>
                <Link>About Us</Link>
            </div>
            
            <div>
                <Link>Register</Link>
                <Link>Login</Link>
            </div>
        </header>
    )
}

export default Header_public
