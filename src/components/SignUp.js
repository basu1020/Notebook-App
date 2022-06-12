import React,{ useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../context/auth/authContext'

const SignUp = () => {
    const context = useContext(authContext)
    const { createUser } = context
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        const Supname = document.getElementById('SupName')
        const Supemail = document.getElementById('SupEmail')
        const SupPassword = document.getElementById('SupPassword')
        const response = await createUser(Supname.value, Supemail.value, SupPassword.value)
        if(response.authToken){
            navigate("/")
        }
        else{
            alert(response.error)
        }
    }

    return (
        <>
            <div className='container my-3'>
                <h3>Sign up here</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="SupName"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Email </label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="SupEmail"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"> Password </label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="SupPassword"/>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleClick}> Sign Up </button>
            </form>
        </div>
        </>
    )
}

export default SignUp