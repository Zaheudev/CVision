import "./CandidatiContainer.css";
import Button from "../Buttons/Button.jsx";
import { useState } from "react";

// Date fictive pentru candidați - vor fi înlocuite cu date reale din backend
const mockCandidates = [
    {
        _id: "1",
        firstName: "Alexandru",
        lastName: "Popescu",
        email: "alexandru.popescu@email.com",
        phoneNumber: "0721 123 456",
        location: "București",
        skills: ["JavaScript", "React", "Node.js", "MongoDB"],
        experience: ["2 ani - Frontend Developer la TechCorp", "1 an - Junior Developer la StartupX"],
        education: {
            highschool: "Colegiul Național \"Mihai Eminescu\"",
            bachelor: "Universitatea Politehnica București - Informatică"
        },
        description: "Sunt un dezvoltator pasionat cu experiență în tehnologii web moderne. Îmi place să lucrez în echipă și să învăț lucruri noi.",
        appliedJobTitle: "Frontend Developer",
        appliedDate: "2026-01-05"
    },
    {
        _id: "2",
        firstName: "Maria",
        lastName: "Ionescu",
        email: "maria.ionescu@email.com",
        phoneNumber: "0732 234 567",
        location: "Cluj-Napoca",
        skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
        experience: ["3 ani - Backend Developer la CloudSolutions", "2 ani - Software Engineer la DataTech"],
        education: {
            highschool: "Liceul Teoretic \"Avram Iancu\"",
            bachelor: "Universitatea Babeș-Bolyai - Informatică"
        },
        description: "Dezvoltator backend cu experiență în arhitecturi scalabile și microservicii. Pasionată de clean code și best practices.",
        appliedJobTitle: "Backend Developer",
        appliedDate: "2026-01-03"
    },
    {
        _id: "3",
        firstName: "Andrei",
        lastName: "Dumitrescu",
        email: "andrei.dumitrescu@email.com",
        phoneNumber: "0743 345 678",
        location: "Timișoara",
        skills: ["Java", "Spring Boot", "Kubernetes", "React", "TypeScript"],
        experience: ["4 ani - Full Stack Developer la Enterprise Solutions"],
        education: {
            highschool: "Colegiul Național \"C.D. Loga\"",
            bachelor: "Universitatea Politehnica Timișoara - Calculatoare"
        },
        description: "Full stack developer cu experiență în aplicații enterprise. Interesat de DevOps și automatizare.",
        appliedJobTitle: "Full Stack Developer",
        appliedDate: "2026-01-08"
    },
    {
        _id: "4",
        firstName: "Elena",
        lastName: "Vasile",
        email: "elena.vasile@email.com",
        phoneNumber: "0754 456 789",
        location: "Iași",
        skills: ["UI/UX Design", "Figma", "Adobe XD", "CSS", "HTML"],
        experience: ["2 ani - UI/UX Designer la CreativeAgency", "1 an - Graphic Designer la DesignStudio"],
        education: {
            highschool: "Colegiul Național \"Costache Negruzzi\"",
            bachelor: "Universitatea de Arte \"George Enescu\" - Design"
        },
        description: "Designer cu ochi pentru detalii și pasiune pentru experiențe de utilizator intuitive.",
        appliedJobTitle: "UI/UX Designer",
        appliedDate: "2026-01-02"
    },
    {
        _id: "5",
        firstName: "Mihai",
        lastName: "Radu",
        email: "mihai.radu@email.com",
        phoneNumber: "0765 567 890",
        location: "Brașov",
        skills: ["C#", ".NET", "Azure", "SQL Server", "Angular"],
        experience: ["5 ani - Senior Developer la CorporateTech", "2 ani - .NET Developer la SoftwareHouse"],
        education: {
            highschool: "Colegiul Național \"Andrei Șaguna\"",
            bachelor: "Universitatea Transilvania - Informatică"
        },
        description: "Developer senior cu experiență vastă în ecosistemul Microsoft. Mentor și team lead.",
        appliedJobTitle: "Senior .NET Developer",
        appliedDate: "2026-01-06"
    },
    {
        _id: "6",
        firstName: "Ioana",
        lastName: "Marin",
        email: "ioana.marin@email.com",
        phoneNumber: "0776 678 901",
        location: "Constanța",
        skills: ["PHP", "Laravel", "MySQL", "Vue.js"],
        experience: ["3 ani - Web Developer la WebAgency"],
        education: {
            highschool: "Colegiul Național \"Mircea cel Bătrân\"",
            bachelor: "Universitatea Ovidius - Informatică"
        },
        description: "Dezvoltator web cu experiență în aplicații PHP și framework-uri moderne.",
        appliedJobTitle: "Web Developer",
        appliedDate: "2026-01-04"
    },
    {
        _id: "7",
        firstName: "Cristian",
        lastName: "Năstase",
        email: "cristian.nastase@email.com",
        phoneNumber: "0787 789 012",
        location: "Sibiu",
        skills: ["Go", "Rust", "Linux", "Microservices"],
        experience: ["4 ani - Systems Engineer la TechInfra", "2 ani - Backend Developer la StartupY"],
        education: {
            highschool: "Colegiul Național \"Samuel von Brukenthal\"",
            bachelor: "Universitatea Lucian Blaga - Calculatoare"
        },
        description: "Inginer de sisteme pasionat de performanță și limbaje low-level.",
        appliedJobTitle: "Systems Engineer",
        appliedDate: "2026-01-07"
    },
    {
        _id: "8",
        firstName: "Gabriela",
        lastName: "Florescu",
        email: "gabriela.florescu@email.com",
        phoneNumber: "0798 890 123",
        location: "Oradea",
        skills: ["Data Analysis", "Python", "SQL", "Tableau", "Power BI"],
        experience: ["2 ani - Data Analyst la Analytics Corp"],
        education: {
            highschool: "Liceul Teoretic \"Onisifor Ghibu\"",
            bachelor: "Universitatea din Oradea - Statistică"
        },
        description: "Analist de date cu abilități puternice în vizualizare și raportare.",
        appliedJobTitle: "Data Analyst",
        appliedDate: "2026-01-01"
    },
    {
        _id: "9",
        firstName: "Dan",
        lastName: "Petrescu",
        email: "dan.petrescu@email.com",
        phoneNumber: "0721 901 234",
        location: "Pitești",
        skills: ["iOS", "Swift", "Objective-C"],
        experience: ["3 ani - iOS Developer la MobileFirst", "1 an - Junior Developer la AppStudio"],
        education: {
            highschool: "Colegiul Național \"Ion C. Brătianu\"",
            bachelor: "Universitatea din Pitești - Informatică"
        },
        description: "Dezvoltator iOS cu aplicații publicate în App Store.",
        appliedJobTitle: "iOS Developer",
        appliedDate: "2026-01-09"
    },
    {
        _id: "10",
        firstName: "Laura",
        lastName: "Stoica",
        email: "laura.stoica@email.com",
        phoneNumber: "0732 012 345",
        location: "Galați",
        skills: ["Android", "Kotlin", "Java", "Firebase"],
        experience: ["2 ani - Android Developer la MobileDev"],
        education: {
            highschool: "Colegiul Național \"Vasile Alecsandri\"",
            bachelor: "Universitatea Dunărea de Jos - Informatică"
        },
        description: "Dezvoltator Android cu experiență în aplicații native.",
        appliedJobTitle: "Android Developer",
        appliedDate: "2026-01-08"
    },
    {
        _id: "11",
        firstName: "Vlad",
        lastName: "Chiriac",
        email: "vlad.chiriac@email.com",
        phoneNumber: "0743 123 456",
        location: "Craiova",
        skills: ["DevOps", "Jenkins", "Docker", "Kubernetes", "Terraform"],
        experience: ["5 ani - DevOps Engineer la CloudOps"],
        education: {
            highschool: "Colegiul Național \"Carol I\"",
            bachelor: "Universitatea din Craiova - Automatică"
        },
        description: "Inginer DevOps cu experiență în CI/CD și infrastructură cloud.",
        appliedJobTitle: "DevOps Engineer",
        appliedDate: "2026-01-06"
    },
    {
        _id: "12",
        firstName: "Simona",
        lastName: "Lazăr",
        email: "simona.lazar@email.com",
        phoneNumber: "0754 234 567",
        location: "Ploiești",
        skills: ["QA", "Selenium", "Cypress", "Postman"],
        experience: ["3 ani - QA Engineer la QualityFirst", "1 an - Tester la SoftwareTesting"],
        education: {
            highschool: "Colegiul Național \"Ion Luca Caragiale\"",
            bachelor: "Universitatea Petrol-Gaze - Informatică"
        },
        description: "QA Engineer cu experiență în automatizare și testare manuală.",
        appliedJobTitle: "QA Engineer",
        appliedDate: "2026-01-05"
    },
    {
        _id: "13",
        firstName: "Robert",
        lastName: "Dinu",
        email: "robert.dinu@email.com",
        phoneNumber: "0765 345 678",
        location: "Arad",
        skills: ["Ruby", "Ruby on Rails", "PostgreSQL", "Redis"],
        experience: ["4 ani - Ruby Developer la RailsShop"],
        education: {
            highschool: "Colegiul Național \"Moise Nicoară\"",
            bachelor: "Universitatea de Vest Timișoara - Informatică"
        },
        description: "Dezvoltator Ruby on Rails cu pasiune pentru cod curat.",
        appliedJobTitle: "Ruby Developer",
        appliedDate: "2026-01-03"
    },
    {
        _id: "14",
        firstName: "Oana",
        lastName: "Pârvu",
        email: "oana.parvu@email.com",
        phoneNumber: "0776 456 789",
        location: "Târgu Mureș",
        skills: ["Technical Writing", "Documentation", "Markdown", "Git"],
        experience: ["2 ani - Technical Writer la DocTeam"],
        education: {
            highschool: "Colegiul Național \"Alexandru Papiu Ilarian\"",
            bachelor: "Universitatea de Medicină și Farmacie - Informatică Medicală"
        },
        description: "Technical writer cu abilități excelente de comunicare.",
        appliedJobTitle: "Technical Writer",
        appliedDate: "2026-01-02"
    },
    {
        _id: "15",
        firstName: "Florin",
        lastName: "Neculae",
        email: "florin.neculae@email.com",
        phoneNumber: "0787 567 890",
        location: "Bacău",
        skills: ["Embedded", "C", "C++", "RTOS", "ARM"],
        experience: ["6 ani - Embedded Engineer la HardwareTech"],
        education: {
            highschool: "Colegiul Național \"Ferdinand I\"",
            bachelor: "Universitatea Tehnică Gheorghe Asachi Iași - Electronică"
        },
        description: "Inginer embedded cu experiență în sisteme în timp real.",
        appliedJobTitle: "Embedded Engineer",
        appliedDate: "2026-01-04"
    }
];

// Top 10 candidați ideali fictivi
const mockTopCandidates = [
    {
        _id: "t1",
        firstName: "Victor",
        lastName: "Marinescu",
        email: "victor.marinescu@email.com",
        phoneNumber: "0721 111 222",
        location: "București",
        skills: ["React", "Node.js", "TypeScript", "MongoDB", "GraphQL", "Docker"],
        experience: ["5 ani - Tech Lead la InnovateTech", "3 ani - Senior Developer la StartupHub"],
        education: {
            highschool: "Colegiul Național \"Sfântul Sava\"",
            bachelor: "Universitatea Politehnica București - Informatică, Master în Inteligență Artificială"
        },
        description: "Tech Lead cu experiență în conducerea echipelor și livrarea proiectelor complexe. Pasionat de mentoring și dezvoltare profesională.",
        matchScore: 98
    },
    {
        _id: "t2",
        firstName: "Diana",
        lastName: "Constantinescu",
        email: "diana.constantinescu@email.com",
        phoneNumber: "0732 222 333",
        location: "Cluj-Napoca",
        skills: ["Python", "Machine Learning", "TensorFlow", "AWS", "Data Science"],
        experience: ["4 ani - Data Scientist la AICompany", "2 ani - ML Engineer la DataDriven"],
        education: {
            highschool: "Liceul Teoretic \"Nicolae Bălcescu\"",
            bachelor: "Universitatea Babeș-Bolyai - Matematică-Informatică, PhD în ML"
        },
        description: "Data Scientist cu expertiză în machine learning și inteligență artificială. Publicații în conferințe internaționale.",
        matchScore: 95
    },
    {
        _id: "t3",
        firstName: "Cristian",
        lastName: "Popa",
        email: "cristian.popa@email.com",
        phoneNumber: "0743 333 444",
        location: "Timișoara",
        skills: ["DevOps", "Kubernetes", "Terraform", "CI/CD", "Linux", "Python"],
        experience: ["6 ani - DevOps Engineer la CloudFirst", "2 ani - System Administrator la ITServices"],
        education: {
            highschool: "Colegiul Național \"Nikolaus Lenau\"",
            bachelor: "Universitatea Politehnica Timișoara - Automatică"
        },
        description: "DevOps Engineer cu experiență în infrastructură cloud și automatizare. Certificări AWS și Azure.",
        matchScore: 93
    },
    {
        _id: "t4",
        firstName: "Ioana",
        lastName: "Gheorghe",
        email: "ioana.gheorghe@email.com",
        phoneNumber: "0754 444 555",
        location: "București",
        skills: ["Product Management", "Agile", "Scrum", "JIRA", "Data Analysis"],
        experience: ["4 ani - Product Manager la TechStartup", "3 ani - Business Analyst la Consulting"],
        education: {
            highschool: "Colegiul Național \"Ion Luca Caragiale\"",
            bachelor: "Academia de Studii Economice - Management, MBA"
        },
        description: "Product Manager cu experiență în lansarea produselor digitale și coordonarea echipelor cross-funcționale.",
        matchScore: 91
    },
    {
        _id: "t5",
        firstName: "Radu",
        lastName: "Stanescu",
        email: "radu.stanescu@email.com",
        phoneNumber: "0765 555 666",
        location: "Iași",
        skills: ["Java", "Spring Boot", "Microservices", "Kafka", "Redis"],
        experience: ["7 ani - Principal Engineer la FinTech", "3 ani - Senior Java Developer la Banking"],
        education: {
            highschool: "Colegiul Național \"Emil Racoviță\"",
            bachelor: "Universitatea Alexandru Ioan Cuza - Informatică"
        },
        description: "Architect software cu experiență în sisteme distribuite și aplicații financiare de mare scară.",
        matchScore: 89
    },
    {
        _id: "t6",
        firstName: "Ana",
        lastName: "Moldovan",
        email: "ana.moldovan@email.com",
        phoneNumber: "0776 666 777",
        location: "Cluj-Napoca",
        skills: ["iOS", "Swift", "SwiftUI", "Objective-C", "Firebase"],
        experience: ["5 ani - iOS Developer la MobileApps", "2 ani - Mobile Developer la Agency"],
        education: {
            highschool: "Liceul de Informatică \"Tiberiu Popoviciu\"",
            bachelor: "Universitatea Tehnică din Cluj-Napoca - Calculatoare"
        },
        description: "iOS Developer cu aplicații în App Store și experiență în dezvoltarea de la zero a produselor mobile.",
        matchScore: 87
    },
    {
        _id: "t7",
        firstName: "George",
        lastName: "Bălan",
        email: "george.balan@email.com",
        phoneNumber: "0787 777 888",
        location: "Brașov",
        skills: ["Android", "Kotlin", "Jetpack Compose", "Flutter", "Dart"],
        experience: ["4 ani - Android Developer la MobileTech", "2 ani - Cross-platform Developer la Startup"],
        education: {
            highschool: "Colegiul Național \"Dr. Ioan Meșotă\"",
            bachelor: "Universitatea Transilvania - Informatică Aplicată"
        },
        description: "Android Developer cu experiență în aplicații native și cross-platform. Contribuitor open source.",
        matchScore: 85
    },
    {
        _id: "t8",
        firstName: "Alina",
        lastName: "Neagu",
        email: "alina.neagu@email.com",
        phoneNumber: "0798 888 999",
        location: "București",
        skills: ["QA", "Selenium", "Cypress", "API Testing", "Performance Testing"],
        experience: ["5 ani - QA Lead la SoftwareCompany", "3 ani - QA Engineer la Testing"],
        education: {
            highschool: "Colegiul Național \"Gheorghe Lazăr\"",
            bachelor: "Universitatea din București - Informatică"
        },
        description: "QA Lead cu experiență în automatizare și procese de calitate. Expertă în testare end-to-end.",
        matchScore: 83
    },
    {
        _id: "t9",
        firstName: "Bogdan",
        lastName: "Iliescu",
        email: "bogdan.iliescu@email.com",
        phoneNumber: "0721 999 000",
        location: "Constanța",
        skills: ["Cybersecurity", "Penetration Testing", "Network Security", "Python", "Linux"],
        experience: ["4 ani - Security Engineer la CyberDefense", "2 ani - IT Security la Enterprise"],
        education: {
            highschool: "Colegiul Național \"Mircea cel Bătrân\"",
            bachelor: "Academia Tehnică Militară - Securitate Cibernetică"
        },
        description: "Security Engineer cu certificări CISSP și CEH. Experiență în audit și protecție infrastructură.",
        matchScore: 81
    },
    {
        _id: "t10",
        firstName: "Roxana",
        lastName: "Dobre",
        email: "roxana.dobre@email.com",
        phoneNumber: "0732 000 111",
        location: "Sibiu",
        skills: ["Scrum Master", "Agile Coach", "SAFe", "Team Building", "Conflict Resolution"],
        experience: ["6 ani - Scrum Master la AgileCompany", "3 ani - Project Manager la ITServices"],
        education: {
            highschool: "Colegiul Național \"Samuel von Brukenthal\"",
            bachelor: "Universitatea Lucian Blaga - Management"
        },
        description: "Scrum Master certificat cu experiență în transformări Agile la nivel enterprise.",
        matchScore: 79
    }
];

export default function CandidatiContainer() {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showTopCandidates, setShowTopCandidates] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSkill, setFilterSkill] = useState("");

    const closeDetails = () => setSelectedCandidate(null);

    // Formatare dată
    const formatDate = (dateString) => {
        if (!dateString) return "Data necunoscută";
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Candidații de afișat (normali sau top)
    const currentCandidates = showTopCandidates ? mockTopCandidates : mockCandidates;

    // Extrage toate skill-urile unice pentru filtru
    const allSkills = [...new Set(currentCandidates.flatMap(c => c.skills))].sort();

    // Filtrare candidați
    const filteredCandidates = currentCandidates.filter(candidate => {
        const fullName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesSkill = !filterSkill || candidate.skills.includes(filterSkill);
        
        return matchesSearch && matchesSkill;
    });

    return (
        <div className="candidati-container">
            <div className="candidati-header">
                <h1>{showTopCandidates ? "Top 10 Candidați Ideali" : "Candidați"}</h1>
                <Button 
                    onClick={() => setShowTopCandidates(!showTopCandidates)}
                    className="top-candidates-btn"
                >
                    {showTopCandidates ? "Vezi toți candidații" : "🏆 Top 10 candidați ideali"}
                </Button>
            </div>

            {/* Filtre */}
            <div className="candidati-filters">
                <input
                    type="text"
                    placeholder="Caută după nume, email sau locație..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Toate skill-urile</option>
                    {allSkills.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>
            </div>

            {filteredCandidates.length === 0 ? (
                <div className="empty-state">
                    <p className="no-candidates-text">Nu s-au găsit candidați care să corespundă criteriilor.</p>
                </div>
            ) : (
                <ul className="candidati-list">
                    {filteredCandidates.map((candidate) => (
                        <li key={candidate._id} className="candidate-item">
                            <div className="candidate-card-header">
                                <div className="candidate-info">
                                    <h3>{candidate.firstName} {candidate.lastName}</h3>
                                    <p className="candidate-location">📍 {candidate.location}</p>
                                </div>
                                {showTopCandidates && candidate.matchScore && (
                                    <div className="match-score">
                                        <span className="score-badge">{candidate.matchScore}% potrivire</span>
                                    </div>
                                )}
                            </div>

                            <div className="candidate-skills">
                                {candidate.skills.slice(0, 4).map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                                {candidate.skills.length > 4 && (
                                    <span className="skill-tag more">+{candidate.skills.length - 4}</span>
                                )}
                            </div>

                            <p className="candidate-experience">
                                💼 {candidate.experience.length} experiențe profesionale
                            </p>

                            {!showTopCandidates && candidate.appliedJobTitle && (
                                <p className="applied-info">
                                    📋 A aplicat pentru: <strong>{candidate.appliedJobTitle}</strong> 
                                    <span className="applied-date"> ({formatDate(candidate.appliedDate)})</span>
                                </p>
                            )}

                            <div className="candidate-actions">
                                <Button onClick={() => setSelectedCandidate(candidate)}>Vezi Detalii</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal detalii candidat */}
            {selectedCandidate && (
                <div className="candidate-modal-overlay" onClick={closeDetails}>
                    <div className="candidate-modal-content" onClick={(e) => e.stopPropagation()}>
                        
                        <div className="modal-header">
                            <h3>{selectedCandidate.firstName} {selectedCandidate.lastName}</h3>
                            <button className="close-modal-btn" onClick={closeDetails}>&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            {showTopCandidates && selectedCandidate.matchScore && (
                                <div className="modal-match-score">
                                    <span className="score-badge large">{selectedCandidate.matchScore}% potrivire cu profilul firmei</span>
                                </div>
                            )}

                            <div className="contact-section">
                                <h4>📞 Informații de contact</h4>
                                <p><strong>Email:</strong> <a href={`mailto:${selectedCandidate.email}`}>{selectedCandidate.email}</a></p>
                                <p><strong>Telefon:</strong> <a href={`tel:${selectedCandidate.phoneNumber}`}>{selectedCandidate.phoneNumber}</a></p>
                                <p><strong>Locație:</strong> {selectedCandidate.location}</p>
                            </div>

                            <hr className="modal-divider"/>

                            <div className="description-section">
                                <h4>👤 Despre candidat</h4>
                                <p className="details-text">{selectedCandidate.description || "Fără descriere."}</p>
                            </div>

                            <hr className="modal-divider"/>

                            <div className="skills-section">
                                <h4>🛠️ Competențe</h4>
                                <div className="modal-skills">
                                    {selectedCandidate.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <hr className="modal-divider"/>

                            <div className="experience-section">
                                <h4>💼 Experiență profesională</h4>
                                <ul className="experience-list">
                                    {selectedCandidate.experience.map((exp, index) => (
                                        <li key={index}>{exp}</li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="modal-divider"/>

                            <div className="education-section">
                                <h4>🎓 Educație</h4>
                                {selectedCandidate.education.highschool && (
                                    <p><strong>Liceu:</strong> {selectedCandidate.education.highschool}</p>
                                )}
                                {selectedCandidate.education.bachelor && (
                                    <p><strong>Facultate:</strong> {selectedCandidate.education.bachelor}</p>
                                )}
                            </div>

                            {!showTopCandidates && selectedCandidate.appliedJobTitle && (
                                <>
                                    <hr className="modal-divider"/>
                                    <div className="application-section">
                                        <h4>📋 Detalii aplicare</h4>
                                        <p><strong>Job aplicat:</strong> {selectedCandidate.appliedJobTitle}</p>
                                        <p><strong>Data aplicării:</strong> {formatDate(selectedCandidate.appliedDate)}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            <Button onClick={() => window.location.href = `mailto:${selectedCandidate.email}`} className="contact-btn email-btn">
                                ✉️ Trimite Email
                            </Button>
                            <Button onClick={() => window.location.href = `tel:${selectedCandidate.phoneNumber}`} className="contact-btn phone-btn">
                                📞 Sună
                            </Button>
                            <Button onClick={closeDetails}>Închide</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
