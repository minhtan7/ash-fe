import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../context/authContext";

const AuthRequire = ({ children }) => {
    const auth = useContext(authContext);
    const location = useLocation();
    console.log("jere", auth)
    if (!auth.name) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};
export default AuthRequire;