import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import "../Styles/login_style.css";
import pandaRead from "../images/panda-reading-book-p-1080.png"

const ForgotPassword = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = credentials;
        const response = await fetch("http://localhost:4000/api/auth/signin", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Account Created Successfully!!!", "success")
        }
        else {
            props.showAlert("Invalid Details", "error")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <>
            <div>
                <title>Forgot Password</title>
                <div className="container-form" id="container">
                    <div className="form-container log-in-container">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <h1 style={{ fontWeight: "2 rem" }}>Password Reset</h1>
                            <div className="social-container">
                                <p style={{ alignItems: "center", color: "black" }}>Enter your MomStory username, or the email address that you used to register. We'll send you an email with your username and a link to reset your password.</p>
                                <input onChange={onChange} name="username" value={credentials.username} className="input-login" type="username" placeholder="Username" />
                            </div>
                            <button type="submit" className="button-login">Send</button>
                            <div className="loginButton line"></div>
                            <div>
                                If you still need help, check out
                                <span>
                                    <Link to={"/contactus"}>
                                        Momstory Support
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <img src={pandaRead} alt='panda-reading'></img>
                    </div>
                </div>
            </div>;
        </>

    )
}

export default ForgotPassword
