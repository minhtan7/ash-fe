import { createContext, useEffect, useState } from "react";
import api from "../apiService"
//Import the createContext and useState hooks from React.
//Create a new context object called authContext using the createContext hook.
export const authContext = createContext()

//Define a new functional component called AuthProvider, which takes a children prop and renders it as its child component.

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem("accessToken");
        delete api.defaults.headers.common.Authorization;
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const initialize = async () => {
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                setSession(accessToken)
                const res = await api.get("/users/me")
                console.log(res)
                setUser(res.data)
            }
        }
        initialize()
    }, [])
    console.log(user)
    const login = async (formData, callback) => {
        let url = "http://localhost:5000/api/users/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
        );
        const data = await response.json()
        console.log(data)
        localStorage.setItem("accessToken", data.data.accessToken)

        setUser(data.data.user)
        callback()
    }
    const logout = (callback) => {
        setUser(null);
        setSession(null);
        callback()
    }

    const value = { user, login, logout }
    console.log(value)
    console.log(value.name)

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider