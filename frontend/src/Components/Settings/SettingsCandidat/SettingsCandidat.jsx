import React, { useState, useEffect } from "react";
import "./SettingsCandidat.css";
import profilePNG from "../../Assets/profile.png";
import { TextInput } from "../../Inputs/inputs";

const SettingsCandidat = () => {
  const [isTemplateListOpen, setIsTemplateListOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Selectează șablonul");
  const [profilePic, setProfilePic] = useState(profilePNG);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    description: "",
    hobbies: "",
    domains: "",
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const templates = [
    "Modern",
    "Minimal",
    "Creativ",
    "Profesional",
    "Corporate",
  ];

  useEffect(() => {
    if (!userId) return;

    const storedPic =
      localStorage.getItem(`settingsProfilePic_${userId}`) ||
      localStorage.getItem(`profilePic_${userId}`);
    if (storedPic) {
      setProfilePic(storedPic);
    }

    const storedTemplate = localStorage.getItem(`settingsTemplate_${userId}`);
    if (storedTemplate) {
      setSelectedTemplate(storedTemplate);
    }

    const storedForm = localStorage.getItem(`settingsForm_${userId}`);
    if (storedForm) {
      setFormData((prev) => ({ ...prev, ...JSON.parse(storedForm) }));
    }
  }, [userId]);

  const persistForm = (data) => {
    if (!userId) return;
    localStorage.setItem(`settingsForm_${userId}`, JSON.stringify(data));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("settingsFormUpdated"));
    }
  };

  const toggleTemplateList = () => setIsTemplateListOpen((prev) => !prev);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsTemplateListOpen(false);
    if (userId) {
      localStorage.setItem(`settingsTemplate_${userId}`, template);
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
      if (userId) {
        localStorage.setItem(`settingsProfilePic_${userId}`, reader.result);
        localStorage.setItem(`profilePic_${userId}`, reader.result);
      }
      window.dispatchEvent(new Event("profilePicUpdated"));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      persistForm(updated);
      return updated;
    });
  };

  return (
    <div className="settings-candidat container">
      <h1 className="titlu-settings-candidat">Setări Cont</h1>
      <div className="settings-section">
        <div className="settings-item profil-poza-section-st">
          <img
            className="poza-profil-st"
            src={profilePic}
            alt="Poza de profil"
          />
          <input
            type="file"
            accept="image/*"
            id="profile-pic-input"
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
          />
          <button
            type="button"
            className="schimba-poza-st"
            onClick={() => document.getElementById("profile-pic-input").click()}
          >
            Setează poza de profil
          </button>
        </div>
        <div className="settings-item text-section-st">
          <TextInput
            className="text-input-st"
            name="nume-prenume"
            id="nume-prenume"
            placeholder="Nume și prenume"
            value={formData.fullName}
            onChange={handleInputChange("fullName")}
          />
          <TextInput
            className="text-input-st"
            name="adresa-email"
            id="adresa-email"
            placeholder="Adresa de email"
            value={formData.email}
            onChange={handleInputChange("email")}
          />
          <TextInput
            className="text-input-st"
            name="numar-telefon"
            id="numar-telefon"
            placeholder="Număr de telefon"
            value={formData.phone}
            onChange={handleInputChange("phone")}
          />
          <TextInput
            className="text-input-st"
            name="scurta-descriere"
            id="scurta-descriere"
            placeholder="Scurtă descriere"
            value={formData.description}
            onChange={handleInputChange("description")}
          />
          <TextInput
            className="text-input-st"
            name="hobby-uri"
            id="hobby-uri"
            placeholder="Hobby-uri"
            value={formData.hobbies}
            onChange={handleInputChange("hobbies")}
          />
          <TextInput
            className="text-input-st"
            name="domenii"
            id="domenii"
            placeholder="Domeniile în care îți cauți job"
            value={formData.domains}
            onChange={handleInputChange("domains")}
          />
        </div>
        <div className="settings-item cv-section-st">
          <h2>CV-ul meu</h2>
          <button className="template-toggle" onClick={toggleTemplateList}>
            {selectedTemplate}
          </button>
          <div
            className={`template-dropdown ${
              isTemplateListOpen ? "open" : ""
            }`}
          >
            <div className="template-options">
              {templates.map((template) => (
                <button
                  key={template}
                  className="template-option"
                  onClick={() => handleTemplateSelect(template)}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-st">Salvează modificările</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsCandidat;
