import { createContext, useEffect, useState } from "react";
import api from "../apiService"
//Import the createContext and useState hooks from React.
//Create a new context object called authContext using the createContext hook.
export const authContext = createContext()

//Define a new functional component called AuthProvider, which takes a children prop and renders it as its child component.

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem("ashToken", accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem("ashToken");
        delete api.defaults.headers.common.Authorization;
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [initialize, setInitialize] = useState(false)

    useEffect(() => {
        const initialize = async () => {
            const accessToken = localStorage.getItem("ashToken")
            if (accessToken) {
                setSession(accessToken)
                const res = await api.get("/users/me")
                setUser(res.data)
                setIsAuthenticated(true)
            }
            setInitialize(true)
        }
        initialize()
    }, [])
    const login = async (formData, callback) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/users/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
        );
        const data = await response.json()
        localStorage.setItem("ashToken", data.data.accessToken)
        api.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
        setIsAuthenticated(true)
        setUser(data.data.user)
        callback()
    }
    const logout = (callback) => {
        setUser(null);
        setSession(null);
        callback()
        setIsAuthenticated(false)
    }

    const value = { user, initialize, isAuthenticated, login, logout }
    console.log(value)

    return (
        <authContext.Provider value={{ ...value }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider