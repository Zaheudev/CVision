import "./MyJobsContainer.css";
import Button from "../Buttons/Button.jsx";

export default function MyJobsContainer({ jobs, onAddJob }) {
    // Verificăm dacă nu sunt joburi pentru a afișa mesajul și butonul
    if (!jobs || jobs.length === 0) {
        return (
            <div className="my-jobs-container empty-state">
                <div className="jobs-header">
                    <h2>Joburile Mele</h2>
                </div>
                <p className="no-jobs-text">Ups... Nu ai job-uri adăugate. Adaugă acum!</p>
                <div className="add-btn-wrapper">
                    <Button onClick={onAddJob} className="add-job-btn">+</Button>
                </div>
            </div>
        );
    }

    // Dacă sunt joburi, afișăm lista
    return (
        <div className="my-jobs-container">
            <div className="jobs-header">
                <h2>Joburile Mele</h2>
            </div>
            <ul>
                {jobs.map((job) => (
                    <li key={job._id} className="job-item">
                        <h3>{job.title}</h3>
                        <p>{job.company && typeof job.company === 'object' ? job.company.name : (job.company || "Companie necunoscută")}</p>
                        <p>{job.location || "Locație necunoscută"}</p>
                        {job.link ? (
                            <Button onClick={() => window.open(job.link, "_blank")}>Vezi Detalii</Button>
                        ) : (
                            <span style={{ color: "#888" }}>Fără detalii</span>
                        )}
                    </li>
                ))}
            </ul>
            
            {/* Butonul de adăugare sub listă */}
            <div className="add-action-footer">
                <Button onClick={onAddJob} className="add-job-btn">+</Button>
            </div>
        </div>
    );
}