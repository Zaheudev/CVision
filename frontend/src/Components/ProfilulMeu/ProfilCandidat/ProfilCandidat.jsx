import React, { useState, useEffect } from "react";
import "./ProfilCandidat.css";

const ProfilCandidat = () => {
  const [profilePic, setProfilePic] = useState(""); // Inițial fără poză
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      const savedPic = localStorage.getItem(`profilePic_${userId}`);
      if (savedPic) {
        setProfilePic(savedPic);
      }
      const savedHobbies = localStorage.getItem(`hobbies_${userId}`);
      if (savedHobbies) {
        setHobbies(JSON.parse(savedHobbies));
      } else {
        // Set default hobbies if none saved
        setHobbies(["Nu există hobby-uri adăugate încă."]);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setProfilePic(result);
        const userId = localStorage.getItem("id");
        if (userId) {
          localStorage.setItem(`profilePic_${userId}`, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profil-candidat container">
      <h1 className="titlu-profile-candidat">Profilul Candidatului</h1>
      <div className="profile-section">
        <div className="profile-pic-container">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Poza de profil"
              className="profile-pic"
            />
          ) : (
            <div className="profile-pic-placeholder">Fără poză</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="file-input"
            style={{ display: "none" }}
          />
          <button onClick={() => document.getElementById("file-input").click()}>
            Selectează poza
          </button>
        </div>
        <div className="profile-details">
          <h4 className="profile-details-h4">
            Numele si prenumele utilizatorului
          </h4>
          <h4 className="profile-details-h4">Adresa de email</h4>
          <h4 className="profile-details-h4">Numar de telefon</h4>
        </div>
      </div>
      <div className="profile-btn-section">
        <div className="descriere-section">
          <h4 className="descriere-section-h4">
            Scurta descriere despre utilizator
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis risus et leo interdum, eu ornare nibh egestas. In
              fermentum finibus suscipit. Quisque quis enim at tortor
              sollicitudin lacinia sed quis dolor. Curabitur ullamcorper est sed
              est aliquet, fringilla scelerisque turpis pharetra. Maecenas
              pellentesque est vel arcu pharetra, vel finibus elit vehicula.
              Mauris sed nisl eu turpis hendrerit viverra. Fusce iaculis id
              lacus vel lobortis. Vivamus imperdiet vel metus non tempus. Proin
              vel maximus justo.
            </p>
          </h4>
          <h4 className="descriere-section-h4">
            Hobby-uri
            <div className="hobbies-list">
              {hobbies.length > 0 ? (
                hobbies.map((hobby, index) => (
                  <button key={index} className="hobby-btn">
                    {hobby}
                  </button>
                ))
              ) : (
                <p>Niciun hobby adăugat încă.</p>
              )}
            </div>
          </h4>
          <h4 className="descriere-section-h4">
            Domeniile in care doreste sa lucreze
            <p></p>
          </h4>
        </div>
        <div className="btn-section-my">
          <button className="btn-my-profile">CV-ul Meu</button>
          <button className="btn-my-profile"> Setari cont</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilCandidat;
