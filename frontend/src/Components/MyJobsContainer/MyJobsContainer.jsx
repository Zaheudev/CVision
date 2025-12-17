import "./MyJobsContainer.css";
import Button from "../Buttons/Button.jsx";

export default function MyJobsContainer({ jobs }) {
    return (
        <div className="my-jobs-container">
            <h2>Joburile Mele</h2>
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
        </div>
    );
}