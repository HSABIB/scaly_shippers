import React, { useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import { Link } from 'react-router-dom'

import AuthService from "../../../services/auth.service"
import { Spinner } from 'react-bootstrap';

const required = (value) => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">This field is required!</div>)
    }
}

const Signin = () => {
    const history = useHistory()
    const form = useRef()
    const checkBtn = useRef()


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checking, setChecking] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if ( localStorage.getItem('user') !== null ){
            history.push('/app/dashboard')
        } else {
            setChecking(false)
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
    
        setMessage("")
        setLoading(true)

        form.current.validateAll()
        
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.signin(username, password)
                .then( (data) => {
                    const { response_code, response_msg } = data
                    if ( response_code === 0 ){
                        history.push('/app/dashboard')
                    }
                    else {
                        setLoading(false);
                        setMessage(response_msg);
                    }
                }, (error) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    }

    return (
        checking
        ? 
        <div></div>
        :
        <div className="form-content">
            <h1 className="">Sign In to <a href="index.html"><span className="brand-name">SCALY</span></a></h1>
            <p className="signup-link"></p>
            <Form className="text-left" onSubmit={handleLogin} ref={form}>
                {message && (<div className="alert alert-danger" role="alert">{message}</div>)}
                <div className="form">
                    <div id="username-field" className="field-wrapper input">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <Input value={username} onChange={event => setUsername(event.target.value)} validations={[required]} id="username" name="username" type="text" className="form-control" placeholder="Username" />
                    </div>

                    <div id="password-field" className="field-wrapper input mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        <Input value={password} onChange={event => setPassword(event.target.value) } validations={[required]} id="password" name="password" type={ showPassword ? "text" : "password" } className="form-control" placeholder="Password" />
                    </div>
                    <div className="d-sm-flex justify-content-between">
                        <div className="field-wrapper toggle-pass">
                            <p className="d-inline-block">Show Password</p>
                            <label className="switch s-primary">
                                <input onChange={() => setShowPassword( !showPassword )} type="checkbox" id="toggle-password" className="d-none" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="field-wrapper">
                            <button disabled={loading} type="submit" className="btn btn-primary" >
                                {loading
                                    ?<><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /><span className="ml-2">Loading...</span></>
                                    :<span>Sign In</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            <p className="terms-conditions">
                © 2021 All Rights Reserved.<br />
                Shifty Management is a product of <a rel="noreferrer" target="_blank" rel="noreferrer" href="https://www.shiftysolutions.com">ShiftySolutions</a>. 
            </p>
        </div>
    )
}

export default Signin