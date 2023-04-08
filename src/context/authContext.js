import { createContext, useState } from "react";

export const authContext = createContext()

const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)

    const login = async (formData)=>{
        let url = "http://localhost:5000/api/users/login";
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // body data type must match "Content-Type" header
          }
          );
          const data  = await response.json()
          localStorage.setItem("accessToken", data.data)

          setUser(data.data)
    }
    const logout = ()=>{
        setUser(null);
    }


    const value = {...user, login,logout}
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider