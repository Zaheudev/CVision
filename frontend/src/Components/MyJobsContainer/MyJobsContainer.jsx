import "./MyJobsContainer.css";
import Button from "../Buttons/Button.jsx";

export default function MyJobsContainer({ jobs, onAddJob, onDeleteJob, onEditJob }) {
    
    return (
        <div className="my-jobs-container">
            <div className="jobs-header">
                <h2>Joburile Mele</h2>
            </div>

            {(!jobs || jobs.length === 0) ? (
                <div className="empty-state">
                    <p className="no-jobs-text">Ups... Nu ai job-uri adăugate. Adaugă acum!</p>
                    <div className="add-btn-wrapper">
                        <Button onClick={onAddJob} className="add-job-btn">+</Button>
                    </div>
                </div>
            ) : (
                <>
                    <ul>
                        {jobs.map((job) => (
                            <li key={job._id} className="job-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <h3>{job.title}</h3>
                                        <p style={{ fontWeight: 'bold', color: '#555' }}>
                                            {job.company && typeof job.company === 'object' ? job.company.name : "Companie"}
                                        </p>
                                    </div>
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
                                </div>

                                <p>📍 {job.location || "Locație necunoscută"} | 💼 {job.type} | 🎓 {job.level}</p>
                                
                                {job.link ? (
                                    <Button onClick={() => window.open(job.link, "_blank")}>Vezi Detalii</Button>
                                ) : (
                                    <span className="salary-info">
                                        Salariu: {job.salary ? `${job.salary} RON` : "Nespecificat"}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="add-action-footer">
                        <Button onClick={onAddJob} className="add-job-btn">Adaugă job</Button>
                    </div>
                </>
            )}
        </div>
    );
}