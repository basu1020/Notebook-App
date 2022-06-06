import AuthContext from "./authContext";
import { useContext, useState } from "react";
import noteContext from "../note/noteContext";

const AuthState = (props) => {
    const host = 'http://localhost:5000'
    const [loggedIN, setLoggedIN] = useState(false)
    const context = useContext(noteContext)
    const { setauthToken } = context

    const login = async (email, passowrd) => {

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": passowrd})
        })
        const json = await response.json()
        setauthToken(json.authToken)
    }

    return (
        <AuthContext.Provider value={{ loggedIN, setLoggedIN, login }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
