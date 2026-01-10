import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import MyJobsContainer from "../MyJobsContainer/MyJobsContainer.jsx";
import ButtonPrimary from "../Buttons/Button.jsx";
import { getProfile, getJobs, createJob, deleteJob, updateJob, getJobApplicants } from "../../utils/api"; 
import { TextInput, DescriptionInput, SelectInput } from "../Inputs/inputs.jsx";
import "./MyJobs.css"; 

export default function EmployerJobs() {
    const { user, type } = useContext(UserContext);
    const [employerName, setEmployerName] = useState("Se încarcă...");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [showForm, setShowForm] = useState(false);
    // State nou pentru a ști dacă edităm un job specific (stocăm ID-ul)
    const [editingJobId, setEditingJobId] = useState(null);

    // State formular
    const [formData, setFormData] = useState({
        companyName: user?.companyName || "",
        department: "",
        jobType: "full-time",
        title: "",
        positionsAvailable: "",
        location: "",
        salary: "",
        description: "",
        requirements: "",
        experienceLevel: "entry",
    });

    const [applicants, setApplicants] = useState([]);
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);
    const [loadingApplicants, setLoadingApplicants] = useState(false);

    useEffect(() => {
        // Preluare nume angajator din profil
        const fetchEmployerData = async () => {
            if (type === "employer") {
                try {
                    const response = await getProfile();
                    // Verificăm dacă există date și le setăm
                    if (response && response.user && response.user.name) {
                        setEmployerName(response.user.name);
                        // Actualizăm și formData pentru a avea numele corect când deschidem formularul de adăugare
                        setFormData(prev => ({ ...prev, companyName: response.user.name }));
                    } else {
                        setEmployerName("Companie Necunoscută");
                    }
                } catch (error) {
                    console.error("Eroare la preluarea numelui companiei:", error);
                }
            }
        };
        fetchEmployerData();

        if(user?.companyName){
            setFormData(prev => ({ ...prev, companyName: user.companyName }));
        }

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
            companyName: employerName !== "Se încarcă..." ? employerName : (user?.companyName || ""), // Folosim numele din profil dacă e încărcat
            department: job.department || "", 
            jobType: job.type || "full-time",
            title: job.title || "",
            positionsAvailable: job.positionsAvailable || "", 
            location: job.location || "",
            salary: job.salary || "",
            description: job.description || "",
            requirements: job.requirements || "",
            experienceLevel: job.level || "entry",
        });

        setShowForm(true); // Deschidem formularul
    };

    // Resetăm formularul când dăm cancel sau după save
    const resetForm = () => {
        setShowForm(false);
        setEditingJobId(null);
        setFormData({
            companyName: employerName !== "Se încarcă..." ? employerName : "", 
            department: "", jobType: "full-time", title: "", 
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
                        name: employerName !== "Se încarcă..." ? employerName : (formData.companyName || "Compania Mea")
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

    const handleViewApplicants = async (jobId) => {
        setLoadingApplicants(true);
        setShowApplicantsModal(true);
        try {
            const data = await getJobApplicants(jobId);
            setApplicants(data);
        } catch (error) {
            console.error("Eroare la preluarea aplicanților:", error);
            alert("Nu s-au putut încărca aplicațiile.");
            setShowApplicantsModal(false);
        }finally{
            setLoadingApplicants(false);
        }
    };

    const closeApplicantsModal = () => {
        setShowApplicantsModal(false);
        setApplicants([]);
    }

    if (type !== "employer") return <p>Doar angajatorii pot accesa această pagină.</p>;
    if (loading) return <p>Se încarcă joburile...</p>;

    // Pregătim lista de joburi pentru afișare, introducand numele companiei din profil
    const jobsDisplay = jobs.map(job => ({
        ...job,
        companyName: (employerName && employerName !== "Se încarcă...") ? employerName : (job.companyName || "Compania Mea")
    }));

    if (showForm) {
        return (
            <div className="add-job-form-container">
                <div className="add-job-wrapper">
                    <div className="add-job-grid">
                        {/* Titlu dinamic pentru cazul in care se editeaza un job sau se adauga altul nou*/}
                        <h2 className="form-title">
                            {editingJobId ? "Editează jobul" : "Adaugă un job nou"}
                        </h2>
                        
                        <TextInput 
                            name="companyName" 
                            value={formData.companyName} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="Numele firmei" 
                            className="add-job-input"
                            disabled={true} 
                        />
                        <TextInput 
                            name="department" 
                            value={formData.department} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="Departament" 
                            className="add-job-input" 
                        />

                        <SelectInput
                            name="jobType" 
                            value={formData.jobType} 
                            onChange={handleInputChange}
                            className="add-job-input" 
                            options={[
                                { value: "full-time", label: "Full Time" },
                                { value: "part-time", label: "Part Time" },
                                { value: "contract", label: "Contract" },
                                { value: "internship", label: "Internship" }
                            ]}
                        />

                        <TextInput 
                            name="title" 
                            value={formData.title} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="Titlul poziției" 
                            className="add-job-input" 
                        />
                        <TextInput 
                            name="positionsAvailable" 
                            value={formData.positionsAvailable} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="Numărul de posturi" 
                            className="add-job-input" 
                        />
                        <TextInput 
                            name="location" 
                            value={formData.location} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="Oraș" 
                            className="add-job-input" 
                        />
                        <TextInput 
                            name="salary" 
                            value={formData.salary} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="Salariu (cifre)" 
                            className="add-job-input" 
                        />

                        <DescriptionInput 
                            name="description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                            placeholder="Descriere job" 
                            className="add-job-input" 
                        />
                        <TextInput 
                            name="requirements" 
                            value={formData.requirements} 
                            onChange={handleInputChange} 
                            type="text" 
                            placeholder="Cerințe" 
                            className="add-job-input" 
                        />

                        <SelectInput
                            name="experienceLevel" 
                            value={formData.experienceLevel} 
                            onChange={handleInputChange}
                            className="add-job-input"
                            options={[
                                { value: "entry", label: "Entry Level (Junior)" },
                                { value: "mid", label: "Mid Level" },
                                { value: "senior", label: "Senior" },
                                { value: "lead", label: "Lead / Manager" }
                            ]}
                        />

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
                jobs={jobsDisplay} // Folosim lista actualizată cu numele companiei
                onAddJob={() => {
                    setEditingJobId(null); // Ne asigurăm că nu suntem în mod editare
                    setFormData({ // Resetăm datele pentru form gol
                        companyName: employerName !== "Se încarcă..." ? employerName : "", 
                        department: "", jobType: "full-time", title: "", 
                        positionsAvailable: "", location: "", salary: "", 
                        description: "", requirements: "", experienceLevel: "entry"
                    });
                    setShowForm(true);
                }}
                onDeleteJob={handleDeleteJob}
                onEditJob={handleStartEdit} // Pasăm funcția nouă
                onViewApplicants={handleViewApplicants}
                applicants={applicants}
                showApplicantsModal={showApplicantsModal}
                closeApplicantsModal={closeApplicantsModal}
                loadingApplicants={loadingApplicants}
            />
        </div>
    );
}