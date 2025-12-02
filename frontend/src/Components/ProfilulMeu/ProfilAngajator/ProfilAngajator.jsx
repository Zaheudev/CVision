import React, { useState, useEffect } from "react";
import "./ProfilAngajator.css";
import profilePNG from "../../Assets/profile.png";
import { useNavigate } from "react-router-dom";

const defaultProfileDetails = {
  companyName: "Numele companiei",
  email: "Adresa de email",
  phone: "Număr de telefon",
  description:
    "Descrierea companiei nu a fost completată. Actualizează setările contului pentru a adăuga detalii.",
  industry: "Industria în care activează compania",
};

const defaultBenefits = ["Nu există beneficii adăugate încă."];

const ProfilAngajator = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [profileData, setProfileData] = useState(defaultProfileDetails);
  const [benefits, setBenefits] = useState(defaultBenefits);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const loadProfileInfo = () => {
    if (!userId || typeof window === "undefined") {
      setProfilePic("");
      setProfileData(defaultProfileDetails);
      setBenefits(defaultBenefits);
      return;
    }

    const storedPic =
      localStorage.getItem(`settingsProfilePic_${userId}`) ||
      localStorage.getItem(`profilePic_${userId}`);
    setProfilePic(storedPic || "");

    const storedForm = localStorage.getItem(`settingsFormEmployer_${userId}`);
    if (storedForm) {
      const parsed = JSON.parse(storedForm);
      setProfileData({
        companyName: parsed.companyName || defaultProfileDetails.companyName,
        email: parsed.email || defaultProfileDetails.email,
        phone: parsed.phone || defaultProfileDetails.phone,
        description: parsed.description || defaultProfileDetails.description,
        industry: parsed.industry || defaultProfileDetails.industry,
      });

      const benefitValues = (parsed.benefits || "")
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean);
      setBenefits(benefitValues.length ? benefitValues : defaultBenefits);
    } else {
      setProfileData(defaultProfileDetails);
      setBenefits(defaultBenefits);
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
        event.key.includes("settingsFormEmployer") ||
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
    <div className="profil-angajator container">
      <h1 className="titlu-profil-angajator">Profil Angajator</h1>
      <div className="profil-section">
        <div className="profil-pic-container">
          <img
            src={profilePic || profilePNG}
            alt="Logo companie"
            className="profil-pic"
          />
        </div>
        <div className="profil-details">
          <h4 className="profil-details-h4">{profileData.companyName}</h4>
          <h4 className="profil-details-h4">{profileData.email}</h4>
          <h4 className="profil-details-h4">{profileData.phone}</h4>
        </div>
      </div>
      <div className="profil-btn-section">
        <div className="descriere-section">
          <h4 className="descriere-section-h4">
            Despre companie
            <p>{profileData.description}</p>
          </h4>
          <h4 className="descriere-section-h4">
            Beneficii oferite
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <button key={index} className="benefit-btn">
                  {benefit}
                </button>
              ))}
            </div>
          </h4>
          <h4 className="descriere-section-h4">
            Industria
            <p>{profileData.industry}</p>
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
};

export default ProfilAngajator;
