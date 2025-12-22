import "./MyJobsContainer.css";
import Button from "../Buttons/Button.jsx";
import { useState } from "react";

export default function MyJobsContainer({ jobs, onAddJob, onDeleteJob, onEditJob, isCandidateView=false }) {
    const [selectedJob, setSelectedJob] = useState(null);
    const closeDetails = () => setSelectedJob(null);
    
    //Functie pentru formatarea datei
    const formatDate = (dateString) => {
        if(!dateString) return "Data necunoscută";
        const date=new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    /*
    // Funcție pentru a verifica dacă jobul a fost editat
    // Comparăm datele ca string-uri simple (fără ore/secunde)
    const isEdited = (job) => {
        if (!job.updatedAt || !job.createdAt) return false;
        // Dacă timestamp-urile diferă cu mai mult de 1 minut, considerăm că e editat
        const created = new Date(job.createdAt).getTime();
        const updated = new Date(job.updatedAt).getTime();
        return (updated - created) > 60000; // diferență > 60 secunde
    };
    */

    return (
        <div className="my-jobs-container">
            <div className="jobs-header">
               {!isCandidateView && (
                <h1>
                Joburile Mele
                </h1>
                )}
            </div>

            {(!jobs || jobs.length === 0) ? (
                <div className="empty-state">
                    {isCandidateView ? (
                        <p className="no-jobs-text">Momentan nu există oferte de joburi disponibile. Te rugăm să revii mai târziu!</p>
                    ) : (
                        <p className="no-jobs-text">Ups... Nu ai job-uri adăugate. Adaugă acum!</p>
                    )}
                    <div className="add-btn-wrapper">
                        <Button onClick={onAddJob} className="add-job-btn">+</Button>
                    </div>
                </div>
            ) : (
                <>
                    <ul>
                        {jobs.map((job) => (
                            <li key={job._id} className="job-item">
                                <div className="job-card-header">
                                    <div>
                                        <h3>{job.title}</h3>
                                        <p className="job-company-name">
                                            {job.company && typeof job.company === 'object' ? job.company.name : "Companie"}
                                        </p>
                                    </div>
                                    {!isCandidateView && (
                                        <div className="container-butoane">
                                            <button
                                                className="delete-job-button"
                                                onClick={() => onDeleteJob(job._id)}
                                                title="Șterge acest job"
                                            >
                                                🗑️
                                            </button>

                                            <button
                                                className="edit-job-button"
                                                onClick={() => onEditJob(job)}
                                                title="Editează acest job"
                                            >
                                                ✏️
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <p>
                                    📍 {job.location || "Locație necunoscută"} | 💼 {job.type} | 🎓 {job.level}
                                </p>

                                <p className="date-info">
                                    📅 Adăugat pe: <strong>{formatDate(job.createdAt)}</strong>
                                </p>
                                <p className="salary-info">
                                    Salariu: {job.salary ? `${job.salary} RON` : "Nespecificat"}
                                </p>
                                <Button onClick={()=>setSelectedJob(job)}>Vezi Detalii</Button>
                            </li>
                        ))}
                    </ul>

                    {!isCandidateView && (
                    <div className="add-action-footer">
                        <Button onClick={onAddJob} className="add-job-btn">Adaugă job</Button>
                    </div>
                    )}
                </>
            )}
            {selectedJob && (
                <div className="job-details-modal-overlay" onClick={closeDetails}>
                    <div className="job-details-modal-content" onClick={(e) => e.stopPropagation()}>
                        
                        <div className="modal-header">
                            <h3>{selectedJob.title}</h3>
                            <button className="close-modal-btn" onClick={closeDetails}>&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            <p><strong>Companie:</strong> {selectedJob.company?.name || "Compania Mea"}</p>
                            <p><strong>Locație:</strong> {selectedJob.location}</p>
                            <p><strong>Tip:</strong> {selectedJob.type} | <strong>Nivel:</strong> {selectedJob.level}</p>
                            <p><strong>Salariu:</strong> {selectedJob.salary ? `${selectedJob.salary} RON` : "Confidențial"}</p>

                            <hr className="modal-divider"/>
                            
                            <h4>Descriere:</h4>
                            <p className="details-text">{selectedJob.description || "Fără descriere."}</p>
                            
                            {selectedJob.requirements && (
                                <>
                                    <h4>Cerințe:</h4>
                                    <p className="details-text">{selectedJob.requirements}</p>
                                </>
                            )}

                             {selectedJob.positionsAvailable && (
                                <p className="positions-info"><strong>Posturi disponibile:</strong> {selectedJob.positionsAvailable}</p>
                            )}
                             {selectedJob.department && (
                                <p><strong>Departament:</strong> {selectedJob.department}</p>
                            )}
                        </div>

                        <div className="modal-footer">
                            <Button onClick={closeDetails}>Închide</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}