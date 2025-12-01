import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SettingsAngajator.css";
import profilePNG from "../../Assets/profile.png";

const SettingsAngajator = () => {
  const [profilePic, setProfilePic] = useState(profilePNG);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    description: "",
    benefits: "",
    industry: "",
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const companyNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const descriptionRef = useRef(null);
  const benefitsRef = useRef(null);
  const industryRef = useRef(null);

  const autoResize = useCallback((ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, []);

  useEffect(() => {
    autoResize(companyNameRef);
    autoResize(emailRef);
    autoResize(phoneRef);
    autoResize(descriptionRef);
    autoResize(benefitsRef);
    autoResize(industryRef);
  }, [formData, autoResize]);

  useEffect(() => {
    if (!userId) return;

    const storedPic =
      localStorage.getItem(`settingsProfilePic_${userId}`) ||
      localStorage.getItem(`profilePic_${userId}`);
    if (storedPic) {
      setProfilePic(storedPic);
    }

    const storedForm = localStorage.getItem(`settingsFormEmployer_${userId}`);
    if (storedForm) {
      setFormData((prev) => ({ ...prev, ...JSON.parse(storedForm) }));
    }
  }, [userId]);

  const persistForm = (data) => {
    if (!userId) return;
    localStorage.setItem(`settingsFormEmployer_${userId}`, JSON.stringify(data));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("settingsFormUpdated"));
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
    <div className="settings-angajator container">
      <h1 className="titlu-settings-angajator">Setări Cont</h1>
      <div className="settings-section">
        <div className="settings-item profil-poza-section-st">
          <img
            className="poza-profil-st"
            src={profilePic}
            alt="Logo companie"
          />
          <input
            type="file"
            accept="image/*"
            id="profile-pic-input-employer"
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
          />
          <button
            type="button"
            className="schimba-poza-st"
            onClick={() => document.getElementById("profile-pic-input-employer").click()}
          >
            Setează logo companie
          </button>
        </div>
        <div className="settings-item text-section-st">
          <div className="input-group auto-resize-group">
            <textarea
              ref={companyNameRef}
              className="auto-resize-textarea"
              name="nume-companie"
              id="nume-companie"
              placeholder="Numele companiei"
              value={formData.companyName}
              onChange={handleInputChange("companyName")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={emailRef}
              className="auto-resize-textarea"
              name="adresa-email"
              id="adresa-email-employer"
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
              id="numar-telefon-employer"
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
              name="descriere-companie"
              id="descriere-companie"
              placeholder="Descriere companie"
              value={formData.description}
              onChange={handleInputChange("description")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={benefitsRef}
              className="auto-resize-textarea"
              name="beneficii"
              id="beneficii"
              placeholder="Beneficii oferite (separate prin virgulă)"
              value={formData.benefits}
              onChange={handleInputChange("benefits")}
              rows={1}
            />
          </div>
          <div className="input-group auto-resize-group">
            <textarea
              ref={industryRef}
              className="auto-resize-textarea"
              name="industrie"
              id="industrie"
              placeholder="Industria în care activați"
              value={formData.industry}
              onChange={handleInputChange("industry")}
              rows={1}
            />
          </div>
        </div>
        <div className="settings-item cv-section-st">
          <button className="btn-st">Salvează modificările</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAngajator;
