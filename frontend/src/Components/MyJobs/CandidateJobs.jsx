import { useState, useEffect } from "react";
import MyJobsContainer from "../MyJobsContainer/MyJobsContainer.jsx";
import { getAllJobs } from "../../utils/api"; // Importăm funcția nouă
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

    if (loading) return <p style={{padding: "20px"}}>Se încarcă oferta de joburi...</p>;

    return (
        <div className="my-jobs-page">
            <h1 className="my-jobs-title">
                Oferte de Angajare Disponibile
            </h1>
            
            <MyJobsContainer
                jobs={jobs}
                // Activăm modul "Candidat" care ascunde butoanele de Edit/Delete
                isCandidateView={true} 
                // Nu pasăm nicio funcție de acțiune (onApply, onEdit, etc.)
                // Astfel, cardurile vor fi doar de vizualizare (Read-Only)
            />
        </div>
    );
}