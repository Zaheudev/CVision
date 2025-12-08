import React, { useState, useEffect, useContext } from "react";
import "./Profil.css";
import profilePNG from "../Assets/profile.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getProfile } from "../../utils/api";

const Profil = () => {
  const navigate = useNavigate();
  const { type: userType } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState("");
  const [candidateData, setCandidateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    skills: [],
    experience: [],
    education: {
      highschool: "",
      bachelor: "",
    },
    description: "",
  });
  const [employerData, setEmployerData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    tags: [],
    industry: "",
    employeeCount: "",
    description: "",
    website: "",
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const type = userType?.toLowerCase();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await getProfile();

        if (type === "candidate" && response.user) {
          const data = {
            firstName: response.user.firstName || "",
            lastName: response.user.lastName || "",
            email: response.user.email || "",
            phoneNumber: response.user.phoneNumber || "",
            location: response.user.location || "",
            skills: response.user.skills || [],
            experience: response.user.experience || [],
            education: {
              highschool: response.user.education?.highschool || "",
              bachelor: response.user.education?.bachelor || "",
            },
            description: response.user.description || "",
          };
          setCandidateData(data);
        } else if (type === "employer" && response.user) {
          const data = {
            name: response.user.name || "",
            email: response.user.email || "",
            phoneNumber: response.user.phoneNumber || "",
            address: {
              street: response.user.address?.street || "",
              city: response.user.address?.city || "",
              state: response.user.address?.state || "",
              zipCode: response.user.address?.zipCode || "",
              country: response.user.address?.country || "",
            },
            tags: response.user.tags || [],
            industry: response.user.industry || "",
            employeeCount: response.user.employeeCount || "",
            description: response.user.description || "",
            website: response.user.website || "",
          };
          setEmployerData(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Load profile picture
    if (userId) {
      const storedPic =
        localStorage.getItem(`settingsProfilePic_${userId}`) ||
        localStorage.getItem(`profilePic_${userId}`);
      setProfilePic(storedPic || "");
    }

    // Listen for updates
    const handleUpdates = () => {
      fetchProfile();
      if (userId) {
        const storedPic =
          localStorage.getItem(`settingsProfilePic_${userId}`) ||
          localStorage.getItem(`profilePic_${userId}`);
        setProfilePic(storedPic || "");
      }
    };

    window.addEventListener("profilePicUpdated", handleUpdates);
    window.addEventListener("settingsFormUpdated", handleUpdates);

    return () => {
      window.removeEventListener("profilePicUpdated", handleUpdates);
      window.removeEventListener("settingsFormUpdated", handleUpdates);
    };
  }, [userId, type]);

  if (loading) {
    return (
      <div className="profil container">
        <p className="loading-message">Se încarcă profilul...</p>
      </div>
    );
  }

  if (type === "candidate") {
    const fullName = `${candidateData.firstName} ${candidateData.lastName}`.trim() || "Nume neconfigurat";
    const displayEmail = candidateData.email || "Email neconfigurat";
    const displayPhone = candidateData.phoneNumber || "Telefon neconfigurat";
    const displayLocation = candidateData.location || "Locație neconfigurată";
    const displayDescription = candidateData.description || "Descrierea nu a fost completată. Actualizează setările contului pentru a adăuga detalii.";
    const displaySkills = candidateData.skills.length > 0 ? candidateData.skills : ["Nu există competențe adăugate încă."];
    const displayExperience = candidateData.experience.length > 0 ? candidateData.experience : ["Nu există experiență adăugată încă."];
    const displayEducation = candidateData.education.highschool || candidateData.education.bachelor 
      ? [candidateData.education.highschool, candidateData.education.bachelor].filter(Boolean).join(", ")
      : "Nu există educație adăugată încă.";

    return (
      <div className="profil container">
        <h1 className="titlu-profil">Profil Candidat</h1>
        <div className="profil-section">
          <div className="profil-pic-container">
            <img
              src={profilePic || profilePNG}
              alt="Poza de profil"
              className="profil-pic"
            />
          </div>
          <div className="profil-details">
            <h4 className="profil-details-h4">{fullName}</h4>
            <h4 className="profil-details-h4">{displayEmail}</h4>
            <h4 className="profil-details-h4">{displayPhone}</h4>
            <h4 className="profil-details-h4">{displayLocation}</h4>
          </div>
        </div>
        <div className="profil-btn-section">
          <div className="descriere-section">
            <h4 className="descriere-section-h4">
              Scurtă descriere
              <p>{displayDescription}</p>
            </h4>
            <h4 className="descriere-section-h4">
              Competențe
              <div className="items-list">
                {displaySkills.map((skill, index) => (
                  <button key={index} className="item-btn">
                    {skill}
                  </button>
                ))}
              </div>
            </h4>
            <h4 className="descriere-section-h4">
              Experiență
              <div className="items-list">
                {displayExperience.map((exp, index) => (
                  <button key={index} className="item-btn">
                    {exp}
                  </button>
                ))}
              </div>
            </h4>
            <h4 className="descriere-section-h4">
              Educație
              <p>{displayEducation}</p>
            </h4>
          </div>
          <div className="btn-section-my">
            <button className="btn-my-profil">CV-ul Meu</button>
            <button className="btn-my-profil" onClick={() => navigate("/settings")}>
              Setări cont
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === "employer") {
    const displayName = employerData.name || "Numele companiei neconfigurat";
    const displayEmail = employerData.email || "Email neconfigurat";
    const displayPhone = employerData.phoneNumber || "Telefon neconfigurat";
    const displayAddress = [
      employerData.address.street,
      employerData.address.city,
      employerData.address.state,
      employerData.address.zipCode,
      employerData.address.country,
    ]
      .filter(Boolean)
      .join(", ") || "Adresă neconfigurată";
    const displayDescription = employerData.description || "Descrierea companiei nu a fost completată. Actualizează setările contului pentru a adăuga detalii.";
    const displayTags = employerData.tags.length > 0 ? employerData.tags : ["Nu există tag-uri adăugate încă."];
    const displayIndustry = employerData.industry || "Industrie neconfigurată";
    const displayEmployeeCount = employerData.employeeCount ? `${employerData.employeeCount} angajați` : "Număr angajați neconfigurat";
    const displayWebsite = employerData.website || "Website neconfigurat";

    return (
      <div className="profil container">
        <h1 className="titlu-profil">Profil Angajator</h1>
        <div className="profil-section">
          <div className="profil-pic-container">
            <img
              src={profilePic || profilePNG}
              alt="Logo companie"
              className="profil-pic"
            />
          </div>
          <div className="profil-details">
            <h4 className="profil-details-h4">{displayName}</h4>
            <h4 className="profil-details-h4">{displayEmail}</h4>
            <h4 className="profil-details-h4">{displayPhone}</h4>
            <h4 className="profil-details-h4">{displayAddress}</h4>
          </div>
        </div>
        <div className="profil-btn-section">
          <div className="descriere-section">
            <h4 className="descriere-section-h4">
              Despre companie
              <p>{displayDescription}</p>
            </h4>
            <h4 className="descriere-section-h4">
              Tag-uri
              <div className="items-list">
                {displayTags.map((tag, index) => (
                  <button key={index} className="item-btn">
                    {tag}
                  </button>
                ))}
              </div>
            </h4>
            <h4 className="descriere-section-h4">
              Industria
              <p>{displayIndustry}</p>
            </h4>
            <h4 className="descriere-section-h4">
              Număr angajați
              <p>{displayEmployeeCount}</p>
            </h4>
            <h4 className="descriere-section-h4">
              Website
              <p>{displayWebsite}</p>
            </h4>
          </div>
          <div className="btn-section-my">
            <button className="btn-my-profil">Joburile mele</button>
            <button className="btn-my-profil" onClick={() => navigate("/settings")}>
              Setări cont
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Profil;
