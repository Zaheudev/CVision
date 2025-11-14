import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import api from '../../utils/api.js';
import useAuth from '../../hooks/useAuth';
import ButtonPrimary from '../Buttons/buttons.jsx'
import { TextInput } from '../Inputs/inputs.jsx'
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";

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
                <div>
                    <TextInput
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required>
                        <MdEmail/>
                    </TextInput>
                    
                </div>
                <div>
                    <TextInput
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Parola'
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required>
                        <FaLock/>
                    </TextInput>
                </div>
                    <ButtonPrimary 
                        type="submit"
                        text="Conectare"
                    />
                <p>Nu ai un cont? <a className="link-register" href='/register'>Înregistrează-te aici</a></p>
            </form>
        </div>

    )
}

export default Login;