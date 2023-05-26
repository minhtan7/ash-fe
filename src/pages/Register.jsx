import { useState, useEffect, useContext } from "react"
import { FaUser } from "react-icons/fa";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const {register} = useContext(authContext)
    // Define the initial state using the useState hook
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    // Extract variables from the formData state
    const { name, email, password, password2 } = formData;
    // Define the onChange event handler to update the formData state
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const navigate = useNavigate()
    // Define the onSubmit event handler to handle form submission
    const onSubmit = (e) => {
        e.preventDefault()
        register(formData, ()=> navigate("/dashboard"))

    }
    // Render the Register component
    return <div className="container">
        <section className="heading">
            <h1>
                <FaUser />Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="name"
                        name="name" value={name} placeholder='Enter your name'
                        onChange={onChange} />
                </div>

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
                    <input type="text" className="form-control" id="password2"
                        name="password2" value={password2} placeholder='retype your password'
                        onChange={onChange} />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-block">submit</button>
                </div>

            </form>
        </section>
    </div>
}

export default Register