import { Link } from "react-router"

const Missing = () => {

    return(
        <main>
            <h1>404 Page Not Found</h1>

            <section>
                <Link>Home</Link>
                <Link>Login</Link>
                <Link>Register</Link>
            </section>
        </main>
    )
}

export default Missing