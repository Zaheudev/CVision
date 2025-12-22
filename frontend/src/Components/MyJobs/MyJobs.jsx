import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import EmployerJobs from "./EmployerJobs"; 
import CandidateJobs from "./CandidateJobs"; 
import "./MyJobs.css"; 

export default function MyJobs() {
    const { type } = useContext(UserContext);

    // Dacă este angajator, afișăm componenta complexă cu formulare
    if (type === "employer") {
        return <EmployerJobs />;
    }
    // Dacă este candidat, afișăm lista simplă de joburi
    if (type === "candidate") {
        return <CandidateJobs />;
    }

    // Dacă tipul utilizatorului nu este recunoscut, afișăm un mesaj de eroare
    return (
        <div className="my-jobs-page">
            <p>Te rugăm să te autentifici pentru a vedea această pagină.</p>
        </div>
    );
}