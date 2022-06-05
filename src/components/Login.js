import React,{useContext} from 'react'
import authContext from '../context/auth/authContext'

const Login = () => {
    const context = useContext(authContext)
    const { login, setLoggedIN } = context

    const handleClick = (e) => {
        e.preventDefault()
        const inputEmail = document.getElementById('inputEmail')
        const inputPassword = document.getElementById('inputPassowrd')
        console.log(inputEmail.value)
        login(inputEmail,inputPassword)
        setLoggedIN(true)
    }

    return (
        <>
        <div className='container my-3'>
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
                        <input type="text" className="form-control" id="inputPassword" />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleClick}> Log in </button>
            </form>
        </div>
        </>
    )
}

export default Login