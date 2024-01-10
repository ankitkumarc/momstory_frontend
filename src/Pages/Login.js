import React, { useState, useEffect } from 'react'
import Google from "../images/google.png"
import Facebook from "../images/facebook.png"
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useLogin } from 'react-facebook';
import { LoginSocialFacebook } from "reactjs-social-login";
import useFetch from "../hooks/useFetch";
import axios from 'axios';
import "../Styles/login_style.css";
import pandaRead from "../images/panda-reading-book-p-1080.png"


const Login = (props) => {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const { handleGoogle } = useFetch(
        "https://momstory.onrender.com/api/auth/googlelogin"
    );


    let navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://momstory.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Login Successfully!!!", "success")
            navigate("/");
        }
        else {
            props.showAlert("Invalid credentials", "error")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => props.showAlert('Login Failed:', error)
    });

    useEffect(() => {
        const loginWithGoogle = async () => {
            try {
                if (user) {
                    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    });

                    setProfile(response.data);

                    const loginResponse = await fetch("http://localhost:4000/api/auth/googlelogin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: response.data.email, password: response.data.id }),
                    });

                    const loginJson = await loginResponse.json();
                    if (loginJson.success) {
                        // Save the auth token and redirect
                        props.showAlert("Login Successful!!", "success")
                        localStorage.setItem('token', loginJson.authToken);
                        navigate("/");
                    } else {
                        props.showAlert("Invalid credentials", "error");
                    }
                }
            } catch (error) {
            }
        };

        loginWithGoogle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


    return (
        <>
            <div className='flex items-center justify-center flex-col'>
                <div className="text-5xl font-bold mx-auto">LOGIN</div>
                <div className="container-form" id="container">
                    <div className="form-container log-in-container">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className='font-bold' style={{ fontWeight: "2 rem" }}>Login</div>
                            <div className="loginButton" onClick={() => handleGoogleLogin()}>
                                <img src={Google} alt="" className="icon" />Continue with Google
                            </div>
                            <LoginSocialFacebook
                                appId="1367041110550868"
                                onResolve={(response) => {
                                    setProfile(response.data);
                                }}
                                onReject={(error) => {
                                    props.showAlert(error, 'error');
                                }}
                            >
                                <div className="loginButton facebook">
                                    <img src={Facebook} alt="" className="icon" />Continue with Facebook
                                </div>
                            </LoginSocialFacebook>

                            <div className="loginButton line"></div>
                            <div className="social-container">
                                <p className='heading'>Username</p>
                                <input onChange={onChange} name="username" value={credentials.username} className="input-login" type="username" placeholder="Username" />
                                <p className='heading'>Password</p>
                                <input onChange={onChange} name="password" value={credentials.password} className="input-login" type="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="button-login">Log In</button>

                            <span>
                                <Link to={"/forgetpassword"}>Forgot Password?</Link>
                            </span>
                            <div className="loginButton line"></div>
                            <div>
                                Don't Have An Account?
                                <span>
                                    <Link to={"/signup"}>
                                        Sign Up
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

export default Login
