import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api.js';
import './Register.css';
import { AuthContext } from '../../context/AuthContext.jsx';

const Register = () => {
    const navigator = useNavigate();
    const { saveToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '', // default to empty string
        roleDetail: ''
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
            <h2>Creează un cont</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label>Nume și prenume</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Aici am adaugat optiunea de a alege intre candidat si angajat, 
                iar dacă se alege candidat, să se afișeze un câmp suplimentar pentru detalii */}
                <div className="form-group">
                    <label>Candidat/Angajator</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="" disabled>Selectează o opțiune</option>
                        <option value="candidate">Candidat</option>
                        <option value="employer">Angajator</option>
                    </select>
                    {formData.role === "employer" && (
                        <input
                            type="text"
                            name="roleDetail"
                            placeholder="Nume companie / Domeniu"
                            value={formData.roleDetail}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                   <label>Parola</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirmă parola</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Creare cont</button>
            </form>
        </div>
    );
};

export default Register;