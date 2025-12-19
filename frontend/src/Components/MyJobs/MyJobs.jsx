import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import MyJobsContainer from "../MyJobsContainer/MyJobsContainer.jsx";
import ButtonPrimary from "../Buttons/Button.jsx";
import { getJobs, createJob, deleteJob, updateJob } from "../../utils/api"; 
import { TextInput, DescriptionInput } from "../Inputs/inputs.jsx";
import "./MyJobs.css"; 

export default function MyJobs() {
    const { user, type } = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [showForm, setShowForm] = useState(false);
    // State nou pentru a ști dacă edităm un job specific (stocăm ID-ul)
    const [editingJobId, setEditingJobId] = useState(null);

    // State formular
    const [formData, setFormData] = useState({
        companyName: "",
        department: "",
        jobType: "full-time",
        title: "",
        positionsAvailable: "",
        location: "",
        salary: "",
        description: "",
        requirements: "",
        experienceLevel: "entry"
    });

    useEffect(() => {
        const fetchJobs = async () => {
            if (type === "employer" && user?._id) {
                setLoading(true);
                try {
                    const data = await getJobs(user._id);
                    setJobs(data || []);
                } catch (err) {
                    console.error("Eroare la preluarea joburilor:", err);
                    setJobs([]);
                }
                setLoading(false);
            }
        };
        fetchJobs();
    }, [user, type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Logica pentru editarea unui job existent
    const handleStartEdit = (job) => {
        setEditingJobId(job._id); // Salvăm ID-ul jobului pe care îl edităm
        
        // Populăm formularul cu datele existente
        setFormData({
            companyName: job.company?.name || user?.companyName || "",
            department: job.department || "", // Asigură-te că există în obiectul job, altfel lasă gol
            jobType: job.type || "full-time",
            title: job.title || "",
            positionsAvailable: job.positionsAvailable || "", 
            location: job.location || "",
            salary: job.salary || "",
            description: job.description || "",
            requirements: job.requirements || "",
            experienceLevel: job.level || "entry"
        });

        setShowForm(true); // Deschidem formularul
    };

    // Resetăm formularul când dăm cancel sau după save
    const resetForm = () => {
        setShowForm(false);
        setEditingJobId(null);
        setFormData({
            companyName: "", department: "", jobType: "full-time", title: "", 
            positionsAvailable: "", location: "", salary: "", 
            description: "", requirements: "", experienceLevel: "entry"
        });
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm("Ești sigur că vrei să ștergi acest job?")) return;
        try {
            await deleteJob(jobId);
            setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error("Eroare la ștergere:", error);
            alert("Nu s-a putut șterge jobul.");
        }
    };

    // Logica pentru salvarea (creare sau actualizare a formularului)
    const handleSaveJob = async () => {
        try {
            const jobPayload = {
                title: formData.title || "Job Fără Titlu",
                location: formData.location || "Remote",
                description: formData.description || "Fără descriere disponibilă.",
                contactEmail: user.email || "email@lipsa.com", 
                requirements: formData.requirements || "Nu sunt specificate.",
                salary: parseInt(formData.salary) || 0,
                level: formData.experienceLevel,
                type: formData.jobType,
                // Am adaugat si departament si positionsAvailable, doar ca nu sunt in backend inca
                department: formData.department,
                positionsAvailable: formData.positionsAvailable
            };

            if (editingJobId) {
                // functie actualizare job - editare
                console.log("Se actualizează jobul:", editingJobId, jobPayload);
                const updatedJob = await updateJob(editingJobId, jobPayload);

                // Actualizăm lista locală
                setJobs(prevJobs => prevJobs.map(job => 
                    job._id === editingJobId ? { ...updatedJob, company: job.company } : job
                ));
                alert("Job actualizat cu succes!");

            } else {
                // functie adaugare job nou - creare
                console.log("Se creează job nou:", jobPayload);
                const savedJob = await createJob(jobPayload);
                
                const jobForDisplay = {
                    ...savedJob,
                    company: {
                        _id: user._id,
                        name: formData.companyName || (user && user.companyName) || "Compania Mea"
                    }
                };
                setJobs(prev => [...prev, jobForDisplay]);
                alert("Job adăugat cu succes!");
            }

            resetForm();

        } catch (error) {
            console.error("Eroare la salvarea jobului:", error);
            alert("Nu s-a putut salva jobul. Verifică consola.");
        }
    };

    if (type !== "employer") return <p>Doar angajatorii pot accesa această pagină.</p>;
    if (loading) return <p>Se încarcă joburile...</p>;

    if (showForm) {
        return (
            <div className="add-job-form-container">
                <div className="add-job-wrapper">
                    <div className="add-job-grid">
                        {/* Titlu dinamic pentru cazul in care se editeaza un job sau se adauga altul nou*/}
                        <h2 className="form-title">
                            {editingJobId ? "Editează jobul" : "Adaugă un job nou"}
                        </h2>
                        
                        <TextInput name="companyName" value={formData.companyName} onChange={handleInputChange} type="text" placeholder="Numele firmei" className="add-job-input" />
                        <TextInput name="department" value={formData.department} onChange={handleInputChange} type="text" placeholder="Departament" className="add-job-input" />

                        <select 
                            name="jobType" 
                            value={formData.jobType} 
                            onChange={handleInputChange}
                            className="add-job-input" 
                            style={{ height: '50px', padding: '10px' }}
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                        </select>

                        <TextInput name="title" value={formData.title} onChange={handleInputChange} type="text" placeholder="Titlul poziției" className="add-job-input" />
                        <TextInput name="positionsAvailable" value={formData.positionsAvailable} onChange={handleInputChange} type="text" placeholder="Numărul de posturi" className="add-job-input" />
                        <TextInput name="location" value={formData.location} onChange={handleInputChange} type="text" placeholder="Oraș" className="add-job-input" />
                        <TextInput name="salary" value={formData.salary} onChange={handleInputChange} type="text" placeholder="Salariu (cifre)" className="add-job-input" />
                        
                        <DescriptionInput name="description" value={formData.description} onChange={handleInputChange} placeholder="Descriere job" className="add-job-input" />
                        <TextInput name="requirements" value={formData.requirements} onChange={handleInputChange} type="text" placeholder="Cerințe" className="add-job-input" />
                        
                        <select 
                            name="experienceLevel" 
                            value={formData.experienceLevel} 
                            onChange={handleInputChange}
                            className="add-job-input"
                            style={{ height: '50px', padding: '10px' }}
                        >
                            <option value="entry">Entry Level (Junior)</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior</option>
                            <option value="lead">Lead / Manager</option>
                        </select>

                    </div>
                    <div className="add-job-buttons">
                        <ButtonPrimary onClick={resetForm} text="Renunță" />
                        <ButtonPrimary onClick={handleSaveJob} text={editingJobId ? "Actualizează" : "Salvează"} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-jobs-page">
            <MyJobsContainer
                jobs={jobs}
                onAddJob={() => {
                    setEditingJobId(null); // Ne asigurăm că nu suntem în mod editare
                    setFormData({ // Resetăm datele pentru form gol
                        companyName: "", department: "", jobType: "full-time", title: "", 
                        positionsAvailable: "", location: "", salary: "", 
                        description: "", requirements: "", experienceLevel: "entry"
                    });
                    setShowForm(true);
                }}
                onDeleteJob={handleDeleteJob}
                onEditJob={handleStartEdit} // Pasăm funcția nouă
            />
        </div>
    );
}