import React, {useRef, useState, useEffect, type FormEvent} from 'react'
import { Link } from 'react-router'
import { useRegisterMutation } from '../features/auth/authApiSlice'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {

    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLInputElement>(null)

    const [ user, setUser ] = useState('')
    const [ validUser, setValidUser ] = useState(false)
    const [ userFocus , setUserFocus ] = useState(false)

    const [ pwd, setPwd ] = useState('')
    const [ validPwd, setValidPwd ] = useState(false)
    const [ pwdFocus, setPwdFocus ] = useState(false)
    const [ showPwd, setShowPwd ] = useState(false)

    const [ matchPwd, setMatchPwd ] = useState('')
    const [ validMatch, setValidMatch ] = useState(false)

    const [ errMsg, setErrMsg ] = useState('')
    const [ errStatus, setErrStatus ] = useState(0)
    const [ success, setSuccess ] = useState(false) //may not need this - check mutation?
    const [ register ] = useRegisterMutation()

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {setUser(e.target.value)}
    const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {setPwd(e.target.value)}
    const handleMatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {setMatchPwd(e.target.value)}
    const handleShowPassword = () => {setShowPwd(prev => !prev)}

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        const username = USER_REGEX.test(user)
        setValidUser(username)
    }, [user])

    useEffect(() => {
        const password = PWD_REGEX.test(pwd)
        setValidPwd(password)
        const matched = pwd === matchPwd
        setValidMatch(matched)   
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

         setUser('')
            setPwd('')
            setMatchPwd('')

        try{
            const response = await register({username: user, pwd}).unwrap()
            console.log(response)
            setSuccess(true)
            setUser('')
            setPwd('')
            setMatchPwd('')
            setErrMsg('')
           
        } catch(err) {
            if(typeof err === 'object' && err !== null && 'status' in err) {
                const error = err as {
                    status: number, 
                    data: {
                        message: string
                    }}
                if(error.status === 400) {
                    setErrMsg('Missing username or password')
                    setErrStatus(error.status)
                } else {setErrMsg(error.data.message || 'Registration unsuccessful')}
            } //Double check for more error boundaries!
                else {
                    setErrMsg('No Server Response.')
                    setErrStatus(500)
                }
            errRef.current?.focus()
        }
    }
    return(
        <main className='login-page'>

            <section className={success ? 'overlay' : 'offscreen'}>
                <div className='login-container'>
                    <h2>Registration Successful!</h2>
                    <p>Thanks for registering, please feel free to now login.</p>
                    <Link className="button-one" to='/login'>Login</Link>
                    <Link className="button-one" to='/'>Home</Link>
                </div>
            </section>

            <section className={errMsg ? 'overlay' : 'offscreen'}>
                <div >
                    <h2>Error: {errStatus}</h2>
                    <p>{errMsg}</p>
                    <Link className="button-one" to='/reg'>Reload</Link>
                    <Link className="button-one" to='/'>Home</Link>
                </div>
            </section>

            <section className='reg-container'>
                <h1>Register</h1>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label className='login-label' htmlFor='user'>Username:</label>
                    <input className='login-input'
                    autoComplete='off'
                    id='user'
                    type='text'
                    ref={userRef}
                    aria-invalid={validUser ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    required
                    value={user}
                    onChange={handleUserChange}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}/>

                    <p id='uidnote' className={userFocus && user && !validUser ? 'instructions' : 'offscreen'}>
                        Must be 4 to 24 characters<br/>
                        Must begin with a letter<br/>
                        Can include: letters, numbers, hyphens and underscores.
                    </p>

                    <label className='login-label' htmlFor='pwd'>Password:</label>

                    <div className='pwd-container'>
                    <input className='login-input'
                    autoComplete='off'
                    id='pwd'
                    type={!showPwd ? 'password' : 'text'}
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    value={pwd}
                    required
                    onChange={handlePwdChange}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}/>
                    
                    <button type='button' className='button-mini' onClick={handleShowPassword}>{showPwd ? "hide" : "show"}</button>
                    </div>

                       <p id='pwdnote' className={pwdFocus && pwd && !validPwd ? 'instructions' : 'offscreen'}>
                        8 to 24 characters.<br/>
                        Must include uppercase and lowercase letters,<br/> 
                        a number and a special character.<br/>
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span>
                        <span aria-label="pond sign">£</span> <span aria-label="dollar sign">$</span> <span aria-label="percent symbol">%</span>
                    </p>

                    <label className='login-label' htmlFor='matchPwd'>Confirm Password:</label>
                    <input className='login-input'
                    autoComplete='off'
                    id='mtachPwd'
                    type='password'
                    aria-invalid={validMatch ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    value={matchPwd}
                    required
                    onChange={handleMatchChange}
                    />


                <button disabled={!validUser || !validPwd || !validMatch ? true : false}
                className='login-button'>Sign Up</button> 
                </form> 
            </section>
        </main>
    )
}

export default Register

//maybe sort out a variable classname for button to show when form is ready???