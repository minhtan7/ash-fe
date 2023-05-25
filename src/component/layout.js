import { Outlet } from "react-router-dom"
import Header from "./Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    return (
        <>
            <Header />
            <ToastContainer />
            <Outlet />
        </>
    )
}

export default MainLayout