import React, { useState } from 'react'
import './LoginSignup.css'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import user_icon from '../Assets/password.png'

import api from '../../utils/api.js';

export const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

    const handleLogin = (e) => {
        e.preventDefault();
        api.login(e.target[1].value, e.target[2].value);
    }

    const handleSignup =async (e) => {
        e.preventDefault();
        try{
            await api.register({username:e.target[0].value, email:e.target[1].value, password:e.target[2].value});

        }catch(error){
            console.log("Signup error: ", error);
        }
    }

    return (
        <form className="container" onSubmit={handleSignup}>
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
                <button className={action === "Login" ? "submit gray" : "submit"} type="submit">Sign Up</button>
                <button className={action === "Sign Up" ? "submit gray" : "submit"}>Login</button>
            </div>
        </form>
    )
}
