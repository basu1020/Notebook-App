import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../context/auth/authContext'

const Login = () => {
    const context = useContext(authContext)
    const { login, setLoggedIN } = context
    let navigate = useNavigate()
    const [loginQuery, setLoginQuery] = useState({email : "", password: ""})

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/user")
        }
        else{
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const json = await login(loginQuery.email, loginQuery.password)
            if(json.authToken){
                await setLoggedIN(true)
                localStorage.setItem("token", json.authToken)
                navigate("/user")
            }
            else{
                alert(json.error)
            }
        } catch (error) {
            alert(error)
        }
    }

    const onChange = (e) => {
        setLoginQuery({...loginQuery, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className='container my-3'>
                <h3> Login </h3>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Email </label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" name="email" value={loginQuery.email} id="inputEmail" onChange={onChange}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"> Password </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" name="password" value={loginQuery.password} id="inputPassword" onChange={onChange}/>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleClick}> Log in </button>
                </form>
            </div>
        </>
    )
}

export default Login