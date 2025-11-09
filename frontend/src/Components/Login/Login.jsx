import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import user_icon from '../Assets/password.png'

import api from '../../utils/api.js';
import useAuth from '../../hooks/useAuth';

export const Login = () => {

    const [action, setAction] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.login(email, password);
            login(res.user);
            navigate('/dashboard');
        } catch (error) {
            console.log('Login error: ', error);
        }
    }

    return (
         <div className="login-container">
            <h2>Conectează-te</h2>
            <form onSubmit={handleLogin}>
                <div className="login-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required
                    />
                </div>
                <div className="login-group">
                   <label>Parola</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <div className="container-button">
                <button type="submit" >Conectează-te</button>
                </div>
                <p>Nu ai un cont? <Link to="/register">Înregistrează-te aici</Link></p>
            </form>
        </div>

    )
}

export default Login;