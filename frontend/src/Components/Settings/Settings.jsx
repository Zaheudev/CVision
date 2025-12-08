import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import "./Settings.css";
import profilePNG from "../Assets/profile.png";
import { UserContext } from "../../context/UserContext";
import { getProfile, updateCandidateProfile, updateEmployerProfile } from "../../utils/api";

const Settings = () => {
  const { type } = useContext(UserContext);
  const [isTemplateListOpen, setIsTemplateListOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Selectează șablonul");
  const [profilePic, setProfilePic] = useState(profilePNG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [initialData, setInitialData] = useState(null);
  
  // Candidate form data
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

  // Employer form data
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

  // Refs for auto-resize textareas
  const nameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const locationRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const highschoolRef = useRef(null);
  const bachelorRef = useRef(null);
  const descriptionRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipCodeRef = useRef(null);
  const countryRef = useRef(null);
  const tagsRef = useRef(null);
  const industryRef = useRef(null);
  const employeeCountRef = useRef(null);
  const websiteRef = useRef(null);

  const autoResize = useCallback((ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, []);

  // Auto-resize all textareas when data changes
  useEffect(() => {
    if (type === "candidate") {
      autoResize(firstNameRef);
      autoResize(lastNameRef);
      autoResize(emailRef);
      autoResize(phoneRef);
      autoResize(locationRef);
      autoResize(skillsRef);
      autoResize(experienceRef);
      autoResize(highschoolRef);
      autoResize(bachelorRef);
      autoResize(descriptionRef);
    } else if (type === "employer") {
      autoResize(nameRef);
      autoResize(emailRef);
      autoResize(phoneRef);
      autoResize(streetRef);
      autoResize(cityRef);
      autoResize(stateRef);
      autoResize(zipCodeRef);
      autoResize(countryRef);
      autoResize(tagsRef);
      autoResize(industryRef);
      autoResize(employeeCountRef);
      autoResize(descriptionRef);
      autoResize(websiteRef);
    }
  }, [candidateData, employerData, type, autoResize]);

  // Load data from backend on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!type) return;
      
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
          setInitialData(JSON.parse(JSON.stringify(data)));
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
          setInitialData(JSON.parse(JSON.stringify(data)));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setMessage({ text: "Eroare la încărcarea datelor!", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [type]);

  // Load template and profile pic from localStorage
  useEffect(() => {
    if (!userId) return;

    const storedPic =
      localStorage.getItem(`settingsProfilePic_${userId}`) ||
      localStorage.getItem(`profilePic_${userId}`);
    if (storedPic) {
      setProfilePic(storedPic);
    }

    if (type === "candidate") {
      const storedTemplate = localStorage.getItem(`settingsTemplate_${userId}`);
      if (storedTemplate) {
        setSelectedTemplate(storedTemplate);
      }
    }
  }, [userId, type]);

  // Warn user before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const persistCandidateForm = (data) => {
    // Removed localStorage persistence - data comes from backend
  };

  const persistEmployerForm = (data) => {
    // Removed localStorage persistence - data comes from backend
  };

  const handleSave = async () => {
    try {
      console.log("handleSave started");
      setSaving(true);
      setMessage({ text: "", type: "" });

      if (type === "candidate") {
        console.log("Updating candidate profile...", candidateData);
        
        // Format data before sending
        const formattedData = {
          ...candidateData,
          skills: Array.isArray(candidateData.skills) 
            ? candidateData.skills 
            : candidateData.skills.split(',').map(s => s.trim()).filter(s => s),
          experience: Array.isArray(candidateData.experience)
            ? candidateData.experience
            : candidateData.experience.split(',').map(e => e.trim()).filter(e => e),
        };
        
        await updateCandidateProfile(formattedData);
        console.log("Candidate profile updated successfully");
        setInitialData(JSON.parse(JSON.stringify(candidateData)));
        setHasUnsavedChanges(false);
        setMessage({ text: "Profilul a fost actualizat cu succes!", type: "success" });
      } else if (type === "employer") {
        console.log("Updating employer profile...", employerData);
        
        // Format data before sending
        const formattedData = {
          ...employerData,
          tags: Array.isArray(employerData.tags)
            ? employerData.tags
            : employerData.tags.split(',').map(t => t.trim()).filter(t => t),
          employeeCount: employerData.employeeCount ? parseInt(employerData.employeeCount, 10) : 0,
        };
        
        await updateEmployerProfile(formattedData);
        console.log("Employer profile updated successfully");
        setInitialData(JSON.parse(JSON.stringify(employerData)));
        setHasUnsavedChanges(false);
        setMessage({ text: "Profilul a fost actualizat cu succes!", type: "success" });
      }

      // Dispatch event for other components
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("settingsFormUpdated"));
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage({ text: "Eroare la salvarea modificărilor!", type: "error" });
      
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    } finally {
      setSaving(false);
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

  const handleCandidateInputChange = (field, subfield = null) => (event) => {
    const value = event.target.value;
    setCandidateData((prev) => {
      let updated;
      if (subfield) {
        updated = {
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: value,
          },
        };
      } else if (field === "skills" || field === "experience") {
        // Convert comma-separated string to array
        updated = {
          ...prev,
          [field]: value.split(",").map((item) => item.trim()).filter(Boolean),
        };
      } else {
        updated = { ...prev, [field]: value };
      }
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  const handleEmployerInputChange = (field, subfield = null) => (event) => {
    const value = event.target.value;
    setEmployerData((prev) => {
      let updated;
      if (subfield) {
        updated = {
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: value,
          },
        };
      } else if (field === "tags") {
        // Convert comma-separated string to array
        updated = {
          ...prev,
          [field]: value.split(",").map((item) => item.trim()).filter(Boolean),
        };
      } else {
        updated = { ...prev, [field]: value };
      }
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  if (!type) {
    return <div className="settings container">Loading...</div>;
  }

  if (loading) {
    return (
      <div className="settings container">
        <h1 className="titlu-settings">Setări Cont</h1>
        <div className="loading-message">Se încarcă datele...</div>
      </div>
    );
  }

  return (
    <div className={`settings container settings-${type}`}>
      <h1 className="titlu-settings">Setări Cont</h1>
      {hasUnsavedChanges && (
        <div className="unsaved-warning">
          ⚠️ Aveți modificări nesalvate
        </div>
      )}
      <div className="settings-section">
        <div className="settings-item profil-poza-section-st">
          <img
            className="poza-profil-st"
            src={profilePic}
            alt={type === "candidate" ? "Poza de profil" : "Logo companie"}
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
            {type === "candidate" ? "Setează poza de profil" : "Setează logo companie"}
          </button>
        </div>

        <div className="settings-item text-section-st">
          {type === "candidate" ? (
            <>
              <div className="input-group auto-resize-group">
                <label htmlFor="firstName">Prenume</label>
                <textarea
                  ref={firstNameRef}
                  className="auto-resize-textarea"
                  name="firstName"
                  id="firstName"
                  placeholder="Prenume"
                  value={candidateData.firstName}
                  onChange={handleCandidateInputChange("firstName")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="lastName">Nume de familie</label>
                <textarea
                  ref={lastNameRef}
                  className="auto-resize-textarea"
                  name="lastName"
                  id="lastName"
                  placeholder="Nume de familie"
                  value={candidateData.lastName}
                  onChange={handleCandidateInputChange("lastName")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="email">Adresa de email</label>
                <textarea
                  ref={emailRef}
                  className="auto-resize-textarea"
                  name="email"
                  id="email"
                  placeholder="Adresa de email"
                  value={candidateData.email}
                  onChange={handleCandidateInputChange("email")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="phoneNumber">Număr de telefon</label>
                <textarea
                  ref={phoneRef}
                  className="auto-resize-textarea"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Număr de telefon"
                  value={candidateData.phoneNumber}
                  onChange={handleCandidateInputChange("phoneNumber")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="location">Locație (oraș)</label>
                <textarea
                  ref={locationRef}
                  className="auto-resize-textarea"
                  name="location"
                  id="location"
                  placeholder="Locație (oraș)"
                  value={candidateData.location}
                  onChange={handleCandidateInputChange("location")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="skills">Competențe</label>
                <textarea
                  ref={skillsRef}
                  className="auto-resize-textarea"
                  name="skills"
                  id="skills"
                  placeholder="Competențe (separate prin virgulă)"
                  value={Array.isArray(candidateData.skills) ? candidateData.skills.join(", ") : ""}
                  onChange={handleCandidateInputChange("skills")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="experience">Experiență</label>
                <textarea
                  ref={experienceRef}
                  className="auto-resize-textarea"
                  name="experience"
                  id="experience"
                  placeholder="Experiență (separate prin virgulă)"
                  value={Array.isArray(candidateData.experience) ? candidateData.experience.join(", ") : ""}
                  onChange={handleCandidateInputChange("experience")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="highschool">Liceu</label>
                <textarea
                  ref={highschoolRef}
                  className="auto-resize-textarea"
                  name="highschool"
                  id="highschool"
                  placeholder="Liceu"
                  value={candidateData.education?.highschool || ""}
                  onChange={handleCandidateInputChange("education", "highschool")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="bachelor">Universitate (Bachelor)</label>
                <textarea
                  ref={bachelorRef}
                  className="auto-resize-textarea"
                  name="bachelor"
                  id="bachelor"
                  placeholder="Universitate (Bachelor)"
                  value={candidateData.education?.bachelor || ""}
                  onChange={handleCandidateInputChange("education", "bachelor")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="description">Scurtă descriere</label>
                <textarea
                  ref={descriptionRef}
                  className="auto-resize-textarea"
                  name="description"
                  id="description"
                  placeholder="Scurtă descriere"
                  value={candidateData.description}
                  onChange={handleCandidateInputChange("description")}
                  rows={1}
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-group auto-resize-group">
                <label htmlFor="name-employer">Numele companiei</label>
                <textarea
                  ref={nameRef}
                  className="auto-resize-textarea"
                  name="name"
                  id="name-employer"
                  placeholder="Numele companiei"
                  value={employerData.name}
                  onChange={handleEmployerInputChange("name")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="email-employer">Adresa de email</label>
                <textarea
                  ref={emailRef}
                  className="auto-resize-textarea"
                  name="email"
                  id="email-employer"
                  placeholder="Adresa de email"
                  value={employerData.email}
                  onChange={handleEmployerInputChange("email")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="phoneNumber-employer">Număr de telefon</label>
                <textarea
                  ref={phoneRef}
                  className="auto-resize-textarea"
                  name="phoneNumber"
                  id="phoneNumber-employer"
                  placeholder="Număr de telefon"
                  value={employerData.phoneNumber}
                  onChange={handleEmployerInputChange("phoneNumber")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="street">Strada</label>
                <textarea
                  ref={streetRef}
                  className="auto-resize-textarea"
                  name="street"
                  id="street"
                  placeholder="Strada"
                  value={employerData.address?.street || ""}
                  onChange={handleEmployerInputChange("address", "street")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="city">Oraș</label>
                <textarea
                  ref={cityRef}
                  className="auto-resize-textarea"
                  name="city"
                  id="city"
                  placeholder="Oraș"
                  value={employerData.address?.city || ""}
                  onChange={handleEmployerInputChange("address", "city")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="state">Județ/Stat</label>
                <textarea
                  ref={stateRef}
                  className="auto-resize-textarea"
                  name="state"
                  id="state"
                  placeholder="Județ/Stat"
                  value={employerData.address?.state || ""}
                  onChange={handleEmployerInputChange("address", "state")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="zipCode">Cod poștal</label>
                <textarea
                  ref={zipCodeRef}
                  className="auto-resize-textarea"
                  name="zipCode"
                  id="zipCode"
                  placeholder="Cod poștal"
                  value={employerData.address?.zipCode || ""}
                  onChange={handleEmployerInputChange("address", "zipCode")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="country">Țară</label>
                <textarea
                  ref={countryRef}
                  className="auto-resize-textarea"
                  name="country"
                  id="country"
                  placeholder="Țară"
                  value={employerData.address?.country || ""}
                  onChange={handleEmployerInputChange("address", "country")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="tags">Tag-uri</label>
                <textarea
                  ref={tagsRef}
                  className="auto-resize-textarea"
                  name="tags"
                  id="tags"
                  placeholder="Tag-uri (separate prin virgulă)"
                  value={Array.isArray(employerData.tags) ? employerData.tags.join(", ") : ""}
                  onChange={handleEmployerInputChange("tags")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="industry">Industria în care activați</label>
                <textarea
                  ref={industryRef}
                  className="auto-resize-textarea"
                  name="industry"
                  id="industry"
                  placeholder="Industria în care activați"
                  value={employerData.industry}
                  onChange={handleEmployerInputChange("industry")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="employeeCount">Număr de angajați</label>
                <textarea
                  ref={employeeCountRef}
                  className="auto-resize-textarea"
                  name="employeeCount"
                  id="employeeCount"
                  placeholder="Număr de angajați"
                  value={employerData.employeeCount}
                  onChange={handleEmployerInputChange("employeeCount")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="description-employer">Descriere companie</label>
                <textarea
                  ref={descriptionRef}
                  className="auto-resize-textarea"
                  name="description"
                  id="description-employer"
                  placeholder="Descriere companie"
                  value={employerData.description}
                  onChange={handleEmployerInputChange("description")}
                  rows={1}
                />
              </div>
              <div className="input-group auto-resize-group">
                <label htmlFor="website">Website</label>
                <textarea
                  ref={websiteRef}
                  className="auto-resize-textarea"
                  name="website"
                  id="website"
                  placeholder="Website"
                  value={employerData.website}
                  onChange={handleEmployerInputChange("website")}
                  rows={1}
                />
              </div>
            </>
          )}
        </div>

        <div className="settings-item cv-section-st">
          {type === "candidate" && (
            <>
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
            </>
          )}
          {message.text && (
            <div className={`message-box ${message.type}`}>
              {message.text}
            </div>
          )}
          <button className="btn-st" onClick={handleSave} disabled={saving}>
            {saving ? "Se salvează..." : "Salvează modificările"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
