import React, { useState } from "react";
import "./SettingsCandidat.css";
import profilePNG from "../../Assets/profile.png";
import { TextInput } from "../../Inputs/inputs";

const SettingsCandidat = () => {
  const [isTemplateListOpen, setIsTemplateListOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Selectează șablonul");

  const templates = [
    "Modern",
    "Minimal",
    "Creativ",
    "Profesional",
    "Corporate",
  ];

  const toggleTemplateList = () => setIsTemplateListOpen((prev) => !prev);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsTemplateListOpen(false);
  };

  return (
    <div className="settings-candidat container">
      <h1 className="titlu-settings-candidat">Setări Cont</h1>
      <div className="settings-section">
        <div className="settings-item profil-poza-section-st">
          <img
            className="poza-profil-st"
            src={profilePNG}
            alt="Poza de profil"
          />
          <a href="" className="schimba-poza-st">
            Schimbă poza de profil
          </a>
        </div>
        <div className="settings-item text-section-st">
          <TextInput
            className="text-input-st"
            name="nume-prenume"
            id="nume-prenume"
            placeholder="Nume și prenume"
          />
          <TextInput
            className="text-input-st"
            name="adresa-email"
            id="adresa-email"
            placeholder="Adresa de email"
          />
          <TextInput
            className="text-input-st"
            name="numar-telefon"
            id="numar-telefon"
            placeholder="Număr de telefon"
          />
          <TextInput
            className="text-input-st"
            name="scurta-descriere"
            id="scurta-descriere"
            placeholder="Scurtă descriere"
          />
          <TextInput
            className="text-input-st"
            name="hobby-uri"
            id="hobby-uri"
            placeholder="Hobby-uri"
          />
          <TextInput
            className="text-input-st"
            name="domenii"
            id="domenii"
            placeholder="Domeniile în care îți cauți job"
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
