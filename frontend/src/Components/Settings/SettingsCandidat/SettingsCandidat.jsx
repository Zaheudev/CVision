import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SettingsCandidat.css";
import profilePNG from "../../Assets/profile.png";

import { updateProfile } from '../../../utils/api';

const SettingsCandidat = () => {
  const [isTemplateListOpen, setIsTemplateListOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Selectează șablonul");
  const [profilePic, setProfilePic] = useState(profilePNG);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    experience: [],
    skills: [],
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const templates = [
    "Auto",
    "CV1",
    "CV2",
    "CV3",
    "CV4",
    "CV5",
    "CV6",
    "CV7",
    "CV8",
  ];

  const descriptionRef = useRef(null);
  const hobbiesRef = useRef(null);
  const domainsRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const autoResize = useCallback((ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, []);

  useEffect(() => {
    autoResize(descriptionRef);
    autoResize(hobbiesRef);
    autoResize(domainsRef);
    autoResize(fullNameRef);
    autoResize(emailRef);
    autoResize(phoneRef);
  }, [formData.description, formData.hobbies, formData.domains, formData.name, formData.email, formData.phone, autoResize]);

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

  const sendData = async () => {
    // Function to send data to backend if needed
    try{
      const response =  await updateProfile(formData);
      console.log('Profile updated successfully:', response);
    }catch(error){
      console.log('Error updating profile:', error);
    }
  }

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
          <div className="input-group auto-resize-group">
            <textarea
              ref={fullNameRef}
              className="auto-resize-textarea"
              name="nume-prenume"
              id="nume-prenume"
              placeholder="Nume și prenume"
              value={formData.name}
              onChange={handleInputChange("name")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={emailRef}
              className="auto-resize-textarea"
              name="adresa-email"
              id="adresa-email"
              placeholder="Adresa de email"
              value={formData.email}
              onChange={handleInputChange("email")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={phoneRef}
              className="auto-resize-textarea"
              name="numar-telefon"
              id="numar-telefon"
              placeholder="Număr de telefon"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={descriptionRef}
              className="auto-resize-textarea"
              name="scurta-descriere"
              id="scurta-descriere"
              placeholder="Scurtă descriere"
              value={formData.description}
              onChange={handleInputChange("description")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={hobbiesRef}
              className="auto-resize-textarea"
              name="hobby-uri"
              id="hobby-uri"
              placeholder="Hobby-uri"
              value={formData.hobbies}
              onChange={handleInputChange("hobbies")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={domainsRef}
              className="auto-resize-textarea"
              name="domenii"
              id="domenii"
              placeholder="Domeniile în care îți cauți job"
              value={formData.domains}
              onChange={handleInputChange("domains")}
              rows={1}
            />
          </div>
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
          <button className="btn-st" onClick={sendData}>Salvează modificările</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsCandidat;
