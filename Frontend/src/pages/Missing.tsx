import { Link } from "react-router"

const Missing = () => {

    return(
        <main>
            <h1>404 Page Not Found</h1>

            <section>
                <Link to='/'>Home</Link>
                <Link to='login'>Login</Link>
                <Link to='/register'>Register</Link>
            </section>
        </main>
    )
}
//maybe better to have back to prev or dashboard, since this isn't an unauthorised message 
export default Missing