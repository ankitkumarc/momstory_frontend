import React, { useState, useEffect } from 'react'
import Google from "../images/google.png"
import Facebook from "../images/facebook.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "../Styles/login_style.css";
import pandaRead from "../images/panda-reading-book-p-1080.png"

const Signup = (props) => {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => props.showAlert(error, 'error')
    });


    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    useEffect(() => {
        const signupWithGoogle = async () => {
            try {
                if (user) {
                    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    });

                    setProfile(response.data);

                    const loginResponse = await fetch("https://momstory.onrender.com/api/auth/googlesignup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: response.data.email, password: response.data.id }),
                    });

                    const loginJson = await loginResponse.json();
                    if (loginJson.success) {
                        localStorage.setItem('token', loginJson.authToken);
                        props.showAlert("Congrats!! Account created Successfully", "success");
                        navigate("/");
                    } else {
                        props.showAlert("Invalid credentials", "error");
                    }
                }
            } catch (error) {
                props.showAlert("Invalid credentials", "error");
            }
        };

        signupWithGoogle();
    }, [navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = credentials;
        const response = await fetch("https://momstory.onrender.com/api/auth/signin", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
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
            <div className='flex items-center justify-center flex-col'>
                <div className="text-5xl font-bold mx-auto">SIGNUP</div>
                <div className="container-form" id="container">
                    <div className="form-container log-in-container">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className='font-bold' style={{ fontWeight: "2 rem" }}>SignUp</div>
                            <div className="loginButton" onClick={() => handleGoogleSignup()}>
                                <img src={Google} alt="" className="icon" />Continue with Google
                            </div>
                            <div className="loginButton facebook">
                                <img src={Facebook} alt="" className="icon" />Continue with Facebook
                            </div>
                            <div className="loginButton line"></div>
                            <div className="social-container">
                                <p className='heading'>Username</p>
                                <input onChange={onChange} name="username" value={credentials.username} className="input-login" type="username" placeholder="Username" />
                                <p className='heading'>Password</p>
                                <input onChange={onChange} name="password" value={credentials.password} className="input-login" type="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="button-login">Sign Up</button>
                            <div className="loginButton line"></div>
                            <div className='mb-2'>
                                Have An Account?
                                <span>
                                    <Link to={"/login"}>
                                        Log In
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

export default Signup
