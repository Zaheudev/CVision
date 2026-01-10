import { useState, useEffect } from "react";
import MyJobsContainer from "../MyJobsContainer/MyJobsContainer.jsx";
import { getAllJobs, ApplyToJob } from "../../utils/api"; // Importăm funcția nouă
import "./MyJobs.css";

export default function CandidateJobs() {
    const [jobs, setJobs] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            try {
                // Aici chemăm funcția care aduce TOATE joburile de la toți angajatorii
                const data = await getAllJobs();
                setJobs(data || []); 
            } catch (err) {
                console.error("Eroare la preluarea joburilor:", err);
            }
            setLoading(false);
        };
        
        fetchAllJobs();
    }, []);

    const handleApply = async (jobId) => {
        if(!window.confirm("Ești sigur că dorești să aplici pentru acest job?")) return;
        try {
            await ApplyToJob(jobId);
            alert("Ai aplicat cu succes pentru acest job! Angajatorul va vedea profilul tău.");
        } catch (err) {
            console.error("Eroare la aplicarea pentru job:", err);
            if(err.response && err.response.data && err.response.data.message) {
                alert("Eroare: " + err.response.data.message);
            } else {
                alert("A apărut o eroare la aplicarea pentru acest job. Te rugăm să încerci din nou mai târziu.");
            }
        }
    };

    if (loading) return <p className="loading-message">Se încarcă oferta de joburi...</p>;

    return (
        <div className="my-jobs-page">
            <h1 className="my-jobs-title">
                Oferte de Angajare Disponibile
            </h1>
            
            <MyJobsContainer
                jobs={jobs}
                // Activăm modul "Candidat" care ascunde butoanele de Edit/Delete
                isCandidateView={true} 
                // Nu pasăm nicio funcție de acțiune (onEdit, etc.)
                //Dar pasăm funcția de aplicare
                onApply={handleApply}
                // Astfel, cardurile vor fi doar de vizualizare (Read-Only)
            />
        </div>
    );
}