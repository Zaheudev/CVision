import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import user_icon from '../Assets/password.png'

import api from '../../utils/api.js';

export const Login = () => {

    const [action, setAction] = useState("Login");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await api.login(e.target[1].value, e.target[2].value);
            console.log("Login successful: ", user);
            navigate('/dashboard');
        } catch (error) {
            console.log("Login error: ", error);
        }
    }

    return (
        <form className="container" onSubmit={handleLogin}>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> : <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Nume și Prenume' />
                </div>}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Adresa de email' />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Parola' />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Ai uitat parola? <span>Apasa aici!</span></div>}
            <div className="submit-container">
                <button className={action === "Login" ? "submit gray" : "submit"}><Link to={"/register"}>Sign Up</Link></button>
                <button className={action === "Sign Up" ? "submit gray" : "submit"} action="submit">Login</button>
            </div>
        </form>
    )
}

export default Login;