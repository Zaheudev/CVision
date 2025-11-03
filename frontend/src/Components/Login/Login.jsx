import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import user_icon from '../Assets/password.png'

import api from '../../utils/api.js';
import AuthContext from '../../context/AuthContext';

export const Login = () => {

    const [action, setAction] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { saveToken } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.login(email, password);
            console.log('Login successful: ', res);
            if (res && res.token) {
                saveToken(res.token);
            }
            navigate('/dashboard');
        } catch (error) {
            console.log('Login error: ', error);
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
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Adresa de email' required />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Parola' required />
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