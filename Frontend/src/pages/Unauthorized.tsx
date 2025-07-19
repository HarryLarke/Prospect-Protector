import { Link } from 'react-router'


const Unauthorized = () => {

    return(
        <main>
            <h1>Unauthorized</h1>

            <section>
                <p>You do not have accesss to this page.</p>
                <br />
                <p>Please return to <Link to={'/'}>Home</Link></p>
            </section>
        </main>
    ) 
}

export default Unauthorized