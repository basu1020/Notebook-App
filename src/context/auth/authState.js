import AuthContext from "./authContext";
import { useState } from "react";

const AuthState = (props) => {
    const host = 'http://localhost:5000'
    const [loggedIN, setLoggedIN] = useState(false)

    const login = async (email, passowrd) => {

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": passowrd})
        })
        const json = await response.json()
        return json
    }

    const createUser = async (name, email, password) => {

        const response = await fetch(`${host}/api/auth/createUser`,{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email":email, "password":password})
        })
        const json = await response.json()
        return json
    }

    return (
        <AuthContext.Provider value={{ loggedIN, setLoggedIN, login, createUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
