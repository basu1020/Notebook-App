import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../context/auth/authContext'

const Login = () => {
    const context = useContext(authContext)
    const { login, setLoggedIN } = context
    let navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        const inputEmail = document.querySelector('#inputEmail')
        const inputPassword = document.querySelector('#inputPassword')
        try {
            const json = await login(inputEmail.value, inputPassword.value)
            if(json){
                await setLoggedIN(true)
                localStorage.setItem("token", json.authToken)
                navigate("/user")
            }
            else{
                alert("error")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className='container my-3'>
                <h3> Login </h3>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Email </label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"> Password </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleClick}> Log in </button>
                </form>
            </div>
        </>
    )
}

export default Login