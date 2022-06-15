import React,{ useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../context/auth/authContext'

const SignUp = () => {
    const context = useContext(authContext)
    const { createUser } = context
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({name:"", email:"", password:"", cpassword: ""})

    const handleClick = async (e) => {
        e.preventDefault()
        if(newUser.cpassword === newUser.password && newUser.password){
            const response = await createUser(newUser.name, newUser.email, newUser.password)
            if(response.authToken){
                navigate("/")
            }
            else{
                alert(response.error)
            }
        }
        else{
            alert("Passwords don't match")
        }
    }

    const onChange = (e) => {
        setNewUser({...newUser, [e.target.name] : e.target.value})
    }

    return (
        <>
            <div className='container my-3'>
                <h3>Sign up here</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="SupName" name="name" value={newUser.name} onChange={onChange}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Email </label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="SupEmail" name="email" value={newUser.email} onChange={onChange}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"> Password </label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" id="SupPassword"  value={newUser.password} onChange={onChange}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="confirm-Password" className="col-sm-2 col-form-label"> Confirm Password </label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="cpassword" id="Cpassword" value={newUser.cpassword} onChange={onChange}/>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleClick}> Sign Up </button>
            </form>
        </div>
        </>
    )
}

export default SignUp