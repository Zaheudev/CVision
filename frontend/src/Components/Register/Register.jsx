import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api, { login } from '../../utils/api.js';
import './Register.css';
import useAuth from '../../hooks/useAuth.js';
import ButtonPrimary from '../Buttons/Button.jsx';
import { TextInput, SelectInput } from '../Inputs/inputs.jsx';
import { FaBuilding } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";

const Register = () => {
    const navigator = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '', // default to empty string
        roleDetail: ''
    });
    const { login } = useAuth();

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
            const res = await api.register({ name: e.target[1].value, email: e.target[2].value, password: e.target[3].value }, e.target[0].value);
            console.log('Registration successful: ', res);

            // backend doesn't return token for register, so try auto-login
            try {
                console.log('Attempting auto-login...');
                const loginRes = await api.login(e.target[2].value, e.target[3].value, e.target[0].value);
                console.log(loginRes)
                login(loginRes.user);
                navigator('/dashboard');
                return;
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
                {/* Aici am adaugat optiunea de a alege intre candidat si angajat, 
                iar dacă se alege candidat, să se afișeze un câmp suplimentar pentru detalii */}
                <div>
                    <SelectInput
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        options={[
                            { value: "Candidate", label: "Candidat" },
                            { value: "Employer", label: "Angajator" }
                        ]}

                    />

                    {formData.role === "Employer" && (
                        <TextInput
                            type="text"
                            name="roleDetail"
                            placeholder="Nume companie / Domeniu"
                            value={formData.roleDetail}
                            onChange={handleChange}
                        >
                            <FaBuilding />
                        </TextInput>
                    )}
                </div>
                {/* Daca utilizatorul selecteaza optiunea - angajator, 
                automat dispare campul nume si prenume */ }
                {formData.role !== "Employer" && (
                    <div>
                        <TextInput
                            type="text"
                            name="username"
                            placeholder='Nume si prenume'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        ><IoPerson />
                        </TextInput>
                    </div>
                )}
                <div>
                    <TextInput
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    ><MdEmail />
                    </TextInput>
                </div>
                <div>
                    <TextInput
                        type="password"
                        name="password"
                        placeholder='Parola'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    ><FaLock />
                    </TextInput>
                </div>
                <div>
                    <TextInput
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirmă parola'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    ><FaLock />
                    </TextInput>
                </div>
                <ButtonPrimary
                    type="submit"
                    text="Creare cont"
                />
            </form>
        </div>
    );
};

export default Register;