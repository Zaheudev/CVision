import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import html2pdf from 'html2pdf.js';
import './CVulMeuGenerat.css';

// Import templates
import Template1 from '../Templates/Template1/Template1';
import Template2 from '../Templates/Template2/Template2';
import Template3 from '../Templates/Template3/Template3';
import Template4 from '../Templates/Template4/Template4';

// Import template CSS
import '../Templates/Template1/Template1.css';
import '../Templates/Template2/Template2.css';
import '../Templates/Template3/Template3.css';
import '../Templates/Template4/Template4.css';

const CVulMeuGenerat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  const [loading, setLoading] = useState(true);
  const [cvData, setCvData] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  useEffect(() => {
    // Verificăm dacă avem date din navigare
    if (location.state) {
      const { templateId, cvContent, userData } = location.state;
      setSelectedTemplate(templateId || 1);
      setCvData({
        ...userData,
        cvContent: cvContent
      });
      setLoading(false);
    } else {
      // Dacă nu avem date, redirecționăm înapoi
      navigate('/cv');
      return;
    }

    // Încărcăm poza de profil din localStorage
    const userId = localStorage.getItem('id');
    if (userId) {
      const storedPic = 
        localStorage.getItem(`settingsProfilePic_${userId}`) ||
        localStorage.getItem(`profilePic_${userId}`);
      setProfilePic(storedPic || '');
    }
  }, [location.state, navigate]);

  const handleDownloadPDF = () => {
    const element = document.getElementById('cv-preview');
    
    const opt = {
      margin: 0,
      filename: `CV_${cvData?.firstName || 'Document'}_${cvData?.lastName || ''}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderTemplate = () => {
    const templateProps = {
      data: cvData,
      profilePic: profilePic
    };

    switch (selectedTemplate) {
      case 1:
        return <Template1 {...templateProps} />;
      case 2:
        return <Template2 {...templateProps} />;
      case 3:
        return <Template3 {...templateProps} />;
      case 4:
        return <Template4 {...templateProps} />;
      // Template 5-8 sunt goale momentan
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <div className="template-placeholder">
            <p>Template {selectedTemplate} - În curs de dezvoltare</p>
          </div>
        );
      default:
        return <Template1 {...templateProps} />;
    }
  };

  if (loading) {
    return (
      <div className="cv-generat-container">
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Se generează CV-ul tău...</p>
          <p className="loading-subtext">Aceasta poate dura câteva secunde</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-generat-container">
      <div className="cv-generat-header">
        <h1>CV-ul Tău Generat</h1>
        <div className="cv-generat-actions">
          <button className="btn-back" onClick={() => navigate('/cv')}>
            ← Înapoi la Template-uri
          </button>
          <button className="btn-download" onClick={handleDownloadPDF}>
            📥 Descarcă PDF
          </button>
        </div>
      </div>

      <div className="cv-preview-wrapper">
        <div id="cv-preview" className="cv-preview">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default CVulMeuGenerat;
