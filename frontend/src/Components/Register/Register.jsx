import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api.js';
import './Register.css';

const Register = () => {
    const navigator = useNavigate();
    const { saveToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await api.register({ username: e.target[0].value, email: e.target[1].value, password: e.target[2].value });
            console.log('Registration successful: ', res);

            // backend doesn't return token for register, so try auto-login
            try {
                const loginRes = await api.login(e.target[1].value, e.target[2].value);
                if (loginRes && loginRes.token) {
                    saveToken(loginRes.token);
                    navigator('/dashboard');
                    return;
                }
            } catch (err) {
                console.log('Auto-login failed: ', err);
            }

            setTimeout(() => navigator('/'), 800);
        } catch (error) {
            console.log('Signup error: ', error);
        }
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;