import React, { useState, useEffect } from "react";
import "./ProfilCandidat.css";
import profilePNG from "../../Assets/profile.png";
import { useNavigate } from "react-router-dom";

const defaultProfileDetails = {
  fullName: "Numele si prenumele utilizatorului",
  email: "Adresa de email",
  phone: "Numar de telefon",
  description:
    "Descrierea utilizatorului nu a fost completată. Actualizează setările contului pentru a adăuga detalii.",
  domains: "Domeniile in care doreste sa lucreze",
};

const defaultHobbies = ["Nu există hobby-uri adăugate încă."];

const ProfilCandidat = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [profileData, setProfileData] = useState(defaultProfileDetails);
  const [hobbies, setHobbies] = useState(defaultHobbies);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const loadProfileInfo = () => {
    if (!userId || typeof window === "undefined") {
      setProfilePic("");
      setProfileData(defaultProfileDetails);
      setHobbies(defaultHobbies);
      return;
    }

    const storedPic =
      localStorage.getItem(`settingsProfilePic_${userId}`) ||
      localStorage.getItem(`profilePic_${userId}`);
    setProfilePic(storedPic || "");

    const storedForm = localStorage.getItem(`settingsForm_${userId}`);
    if (storedForm) {
      const parsed = JSON.parse(storedForm);
      setProfileData({
        fullName: parsed.fullName || defaultProfileDetails.fullName,
        email: parsed.email || defaultProfileDetails.email,
        phone: parsed.phone || defaultProfileDetails.phone,
        description: parsed.description || defaultProfileDetails.description,
        domains: parsed.domains || defaultProfileDetails.domains,
      });

      const hobbyValues = (parsed.hobbies || "")
        .split(",")
        .map((hobby) => hobby.trim())
        .filter(Boolean);
      setHobbies(hobbyValues.length ? hobbyValues : defaultHobbies);
    } else {
      setProfileData(defaultProfileDetails);
      setHobbies(defaultHobbies);
    }
  };

  useEffect(() => {
    loadProfileInfo();
    const handleStorage = (event) => {
      if (!event.key) {
        loadProfileInfo();
        return;
      }
      if (
        event.key.includes("settingsForm") ||
        event.key.includes("profilePic")
      ) {
        loadProfileInfo();
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("profilePicUpdated", loadProfileInfo);
    window.addEventListener("settingsFormUpdated", loadProfileInfo);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("profilePicUpdated", loadProfileInfo);
      window.removeEventListener("settingsFormUpdated", loadProfileInfo);
    };
  }, [userId]);

  return (
    <div className="profil-candidat container">
      <h1 className="titlu-profil-candidat">Profil Candidat</h1>
      <div className="profil-section">
        <div className="profil-pic-container">
          <img
            src={profilePic || profilePNG}
            alt="Poza de profil"
            className="profil-pic"
          />
        </div>
        <div className="profil-details">
          <h4 className="profil-details-h4">{profileData.fullName}</h4>
          <h4 className="profil-details-h4">{profileData.email}</h4>
          <h4 className="profil-details-h4">{profileData.phone}</h4>
        </div>
      </div>
      <div className="profil-btn-section">
        <div className="descriere-section">
          <h4 className="descriere-section-h4">
            Scurta descriere despre utilizator
            <p>{profileData.description}</p>
          </h4>
          <h4 className="descriere-section-h4">
            Hobby-uri
            <div className="hobbies-list">
              {hobbies.map((hobby, index) => (
                <button key={index} className="hobby-btn">
                  {hobby}
                </button>
              ))}
            </div>
          </h4>
          <h4 className="descriere-section-h4">
            Domeniile in care doreste sa lucreze
            <p>{profileData.domains}</p>
          </h4>
        </div>
        <div className="btn-section-my">
          <button className="btn-my-profil">CV-ul Meu</button>
          <button className="btn-my-profil" onClick={() => navigate("/settings")}>
            Setari cont
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilCandidat;
