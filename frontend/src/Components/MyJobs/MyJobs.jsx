import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import MyJobsContainer from "../MyJobsContainer/MyJobsContainer.jsx";
import Button from "../Buttons/Button.jsx";
import { getJobs } from "../../utils/api";
import ButtonPrimary from "../Buttons/Button.jsx";
import { TextInput, DescriptionInput } from "../Inputs/inputs.jsx";

export default function MyJobs() {
    const { user, type } = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [jobDescription, setJobDescription] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            if (type === "employer" && user?._id) {
                setLoading(true);
                try {
                    const data = await getJobs(user._id);
                    setJobs(data || []);
                } catch (err) {
                    setJobs([]);
                }
                setLoading(false);
            }
        };
        fetchJobs();
    }, [user, type]);

    if (type !== "employer") {
        return <p>Doar angajatorii pot accesa această pagină.</p>;
    }

    if (loading) {
        return <p>Se încarcă joburile...</p>;
    }

    if (showForm) {
        return (
            <div className="add-job-form-container">
                <h2>Adaugă un job nou</h2>
                <div className="add-job-form">
                    <TextInput type="text" placeholder="Numele firmei" className="add-job-input" />
                    <TextInput type="text" placeholder="Departament" className="add-job-input" />
                    <TextInput type="text" placeholder="Tip job" className="add-job-input" />
                    <TextInput type="text" placeholder="Pozițiile scoase la concurs" className="add-job-input" />
                    <TextInput type="text" placeholder="Numărul de posturi disponibile" className="add-job-input" />
                    <TextInput type="text" placeholder="Oraș" className="add-job-input" />
                    <DescriptionInput
                        placeholder="Descriere job"
                        value={jobDescription}
                        onChange={e => setJobDescription(e.target.value)}
                        name="jobDescription"
                        className="add-job-input"
                    />
                    <TextInput type="text" placeholder="Salariu+beneficii oferite" className="add-job-input" />
                    <TextInput type="text" placeholder="Cerințe" className="add-job-input" />
                    <TextInput type="text" placeholder="Nivel experiență" className="add-job-input" />
                    <div style={{ marginTop: "1rem" }}>
                        <ButtonPrimary onClick={() => setShowForm(false)}
                            text="Renunță"
                        />
                        <ButtonPrimary style={{ marginLeft: "1rem" }}
                            text="Salvează"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <MyJobsContainer jobs={jobs} />
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                {(!jobs || jobs.length === 0) && (
                    <p style={{ marginTop: "1rem" }}>Ups...Nu ai job-uri adaugate. Adauga acum!</p>
                )}
                <ButtonPrimary onClick={() => setShowForm(true)} 
                    title="Adaugă job"
                    text="+"
                />
            </div>
        </div>
    );
}