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
import AuthContainer from '../AuthContainer/AuthContainer.jsx';

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
        //Stergem eroarea daca utilizatorul selecteaza o optiune
        if(name==="role"){
            setError("");
        }
        //Eroarea apare daca emailul nu contine "@"
    if (name === "email") {
        if (!value.includes("@")) {
            setError("Adresa de email trebuie să fie in formatul @exemplu.com!");
        } else {
            setError("");
        } 
    }

    // Validare pentru parole care nu corespund. Eroarea apare in momentul in care utilizatorul modifica campul parola sau confirmare parola
    if (name === "password" || name === "confirmPassword") {
        const password = name === "password" ? value : formData.password;
        const confirmPassword = name === "confirmPassword" ? value : formData.confirmPassword;
            if (password !== confirmPassword) {
            setError("Parolele nu corespund!");
            } else {
            setError("");
            }
        }
    };

    const print = (e) => { 
        console.log(e.target[0].value);
        console.log(formData);
        e.preventDefault();
    }

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
            //Daca mesajul de eroare de la backend contine email (exista deja un cont cu adresa respectiva), atunci afisam eroarea 
            if(error?.response?.data?.message?.toLowerCase().includes("email")){
                setError("Exista deja un cont înregistrat cu acest email!");
            }else{
                setError("A apărut o eroare la înregistrare. Te rugăm să încerci din nou.");
            }
            console.log('Signup error: ', error);
        }
    }

    const[error, setError]=useState("")
    return (
        <AuthContainer title="Creează cont">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSignup}>
                {/* Aici am adaugat optiunea de a alege intre candidat si angajat, 
                iar dacă se alege candidat, să se afișeze un câmp suplimentar pentru detalii */}
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
                            ><FaBuilding />
                        </TextInput>
                    )}
                {/* Daca utilizatorul selecteaza optiunea - angajator, 
                automat dispare campul nume si prenume */ }
                {formData.role !== "Employer" && (
                        <TextInput
                            type="text"
                            name="username"
                            placeholder='Nume si prenume'
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={!formData.role}
                            onDisabledClick={() => setError("Te rugăm să selectezi o opțiune (Candidat sau Angajator)!")}
                        ><IoPerson />
                        </TextInput>
                )}
                    <TextInput
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={!formData.role}
                        onDisabledClick={() => setError("Te rugăm să selectezi o opțiune (Candidat sau Angajator)!")}
                        ><MdEmail />
                    </TextInput>
                    <TextInput
                        type="password"
                        name="password"
                        placeholder='Parola'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={!formData.role}
                        onDisabledClick={() => setError("Te rugăm să selectezi o opțiune (Candidat sau Angajator)!")}
                    ><FaLock />
                    </TextInput>

                    <TextInput
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirmă parola'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={!formData.role}  
                        onDisabledClick={() => setError("Te rugăm să selectezi o opțiune (Candidat sau Angajator)!")}
                        ><FaLock />
                    </TextInput>

                <ButtonPrimary
                    type="submit"
                    text="Creare cont"
                />
            </form>
        </AuthContainer>
    );
};

export default Register;
