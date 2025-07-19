import { useEffect, useState, useRef, type FormEvent } from "react"
import { useNavigate } from "react-router"

import { useSelection } from "../hooks/useSelections"
import { useLoginMutation } from "../features/auth/authApiSlice"

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const [ user, setUser ] = useState('')
    const [ pwd, setPwd  ] = useState('')
    const [ errMsg, setErrMsg ] = useState('')

    const { setNewCredentials } = useSelection()
    const [ login, {isLoading} ] = useLoginMutation() 

    let content
    
    useEffect(() => {userRef.current?.focus()}, [])

    useEffect(() => {setErrMsg('')}, [user, pwd])

    const handleUserInput = (e:React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value) 
    const handlePwdInput = (e:React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await login({user, pwd}).unwrap()
            console.log(response)

            setNewCredentials({
                user: user,
                roles: response?.roles,
                accessToken: response?.accessToken
            })

            setPwd('')
            setUser('')
            navigate('/dashboard') //Will probably change this one, so go back to prev incase that they were locked out etc. 

        } catch(err) {
            if(typeof err === 'object' && err !== null && 'status' in err) {
                const error = err as {
                    status: number,
                    data: {
                        message: string
                    } 
                } 
            if(error.status === 400) {
                setErrMsg('Missing username or password.')
            } else if (error.status === 401) {
                setErrMsg('Unauthorised entry.')
            } else {setErrMsg(error.data.message || 'Login unsuccessful.')}
        }
            else setErrMsg('No Server Response.')
            errRef.current?.focus()
        } 
    }

    if(!isLoading) {content = (
        <main>

            <h1>Login</h1>

            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'}
            >{errMsg}</p>

            <form className="loginForm"
            onSubmit={handleLogin}>
                <label htmlFor="user">Username</label>
                <input
                type="text"
                ref={userRef}
                id="user"
                value={user}
                onChange={handleUserInput}
                placeholder="AlexTrill"
                required
                />
                <label htmlFor="pwd">Password</label>
                <input
                type="password"
                ref={userRef}
                id="pwd"
                value={pwd}
                onChange={handlePwdInput}
                required
                    />
                    <button>Login</button>
                </form>
    
        </main>
    )} else content = (<main><h1>Loading...</h1></main>)

    
    return(
        content
    )
}

export default Login