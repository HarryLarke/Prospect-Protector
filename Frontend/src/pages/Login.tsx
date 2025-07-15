

const Login = () => {

    return(
        <main>
            <h1>Login</h1>

            <section>
                <form action="submit">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    value={}
                    onChange={}
                    placeholder="AlexTrill"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={}
                    onChange={}
                    />
                    <button>Login</button>
                </form>
            </section>
        </main>
    )
}

export default Login