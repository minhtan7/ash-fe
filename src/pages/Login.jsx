import { useState, useEffect, useContext } from "react"
import { FaSignInAlt } from "react-icons/fa";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { login } = useContext(authContext)

    const { email, password } = formData;
    const navigate  = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        login(formData, ()=>{
            navigate("/dashboard")
        })
    }

    return <div className="container">
        <section className="heading">
            <h1>
                <FaSignInAlt />Login
            </h1>
            <p>Please sign in your account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="text" className="form-control" id="email"
                        name="email" value={email} placeholder='Enter your email'
                        onChange={onChange} />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" id="password"
                        name="password" value={password} placeholder='Enter your password'
                        onChange={onChange} />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-block">Sign in </button>
                </div>

            </form>
        </section>
    </div>
}

export default Login