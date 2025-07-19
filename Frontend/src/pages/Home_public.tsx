import { Link } from "react-router"


const Home_public = () => {

    return(
        <main>
            <h1>Prospect Protector</h1>
            <h2>A CRM for small scale and reps and accounts holders.</h2>

            <section>
                <article>
                    Welcome to Proscpect Proptector! Here we pride ourselves of reliable, intuitative and cost-effective CRM.
                    If you are here for first time, feel free to the look at our about section, or register here. 
                    If you are one of our regular feel free to login. 

                </article>

                <Link to='aboutUs'>About Us</Link>
                <Link to='register'>Register</Link>
                <Link to='login'>Login</Link>

            </section>

        </main>
    )
}

export default Home_public