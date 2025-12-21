import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { generateCv, getProfile } from '../../utils/api';
import './CVulMeu.css';

import cv1 from '../Assets/Templates+CVs/cv1.png';
import cv2 from '../Assets/Templates+CVs/cv2.png';
import cv3 from '../Assets/Templates+CVs/cv3.png';
import cv4 from '../Assets/Templates+CVs/cv4.png';
import cv5 from '../Assets/Templates+CVs/cv5.png';
import cv6 from '../Assets/Templates+CVs/cv6.png';
import cv7 from '../Assets/Templates+CVs/cv7.png';
import cv8 from '../Assets/Templates+CVs/cv8.png';

const CVulMeu = () => {
  const { user, type } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Verificăm dacă userul are plan premium (deocamdată hardcodat false, va fi din backend)
  const isPremiumUser = user?.isPremium || false;

  const templates = [
    { id: 1, name: 'Template 1', image: cv1, isPremium: false },
    { id: 2, name: 'Template 2', image: cv2, isPremium: false },
    { id: 3, name: 'Template 3', image: cv3, isPremium: false },
    { id: 4, name: 'Template 4', image: cv4, isPremium: true },
    { id: 5, name: 'Template 5', image: cv5, isPremium: true },
    { id: 6, name: 'Template 6', image: cv6, isPremium: true },
    { id: 7, name: 'Template 7', image: cv7, isPremium: true },
    { id: 8, name: 'Template 8', image: cv8, isPremium: true },
  ];

  const handleTemplateClick = (templateId, isPremium) => {
    // Verificăm dacă template-ul necesită premium și userul nu are premium
    if (isPremium && !isPremiumUser) {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedTemplate(templateId);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    navigate('/subscription');
  };

  const handleGenerateCV = async () => {
    if (!selectedTemplate) {
      alert('Te rog selectează un template mai întâi!');
      return;
    }

    setIsGenerating(true);

    try {
      // Obținem datele utilizatorului din backend
      const profileResponse = await getProfile();
      const userData = profileResponse.user;

      // Generăm conținutul CV-ului cu AI
      const cvResponse = await generateCv();
      const cvContent = cvResponse.cvContent;

      console.log("Generated CV Data:", cvContent);
      console.log("User Data:", userData);

      // Navigăm către pagina de previzualizare cu toate datele
      navigate('/cv-generat', {
        state: {
          templateId: selectedTemplate,
          cvContent: cvContent,
          userData: {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phoneNumber: userData.phoneNumber || '',
            location: userData.location || '',
            skills: userData.skills || [],
            experience: userData.experience || [],
            education: userData.education || {}
          }
        }
      });
    } catch (err) {
      console.error("Error generating CV:", err);
      alert('A apărut o eroare la generarea CV-ului. Te rog încearcă din nou.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="cv-container">
      <h1 className="cv-title">CV-ul Meu</h1>
      <div className="cv-templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cv-template-card ${selectedTemplate === template.id ? 'selected' : ''} ${template.isPremium && !isPremiumUser ? 'locked' : ''}`}
            onClick={() => handleTemplateClick(template.id, template.isPremium)}
          >
            <img src={template.image} alt={template.name} className="cv-template-image" />
            <div className="cv-template-overlay">
              {selectedTemplate === template.id && !template.isPremium && (
                <div className="cv-selected-badge">✓</div>
              )}
              {template.isPremium && !isPremiumUser && (
                <div className="cv-locked-overlay">
                  <div className="lock-icon">🔒</div>
                  <div className="premium-badge">PREMIUM</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="cv-generate-section">
        <button 
          className={`cv-generate-btn ${isGenerating ? 'generating' : ''}`} 
          onClick={handleGenerateCV}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="btn-spinner"></span>
              Se generează...
            </>
          ) : (
            'Generează CV'
          )}
        </button>
      </div>

      {/* Modal pentru upgrade */}
      {showUpgradeModal && (
        <div className="upgrade-modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowUpgradeModal(false)}>×</button>
            <div className="modal-icon">🔒</div>
            <h2>Template Premium</h2>
            <p>Acest template este disponibil doar pentru utilizatorii cu abonament Premium.</p>
            <div className="modal-benefits">
              <h3>Beneficii Premium:</h3>
              <ul>
                <li>✅ Acces la toate cele 8 template-uri</li>
                <li>✅ Design-uri profesionale exclusive</li>
                <li>✅ Suport prioritar</li>
                <li>✅ Export nelimitat în PDF</li>
              </ul>
            </div>
            <div className="modal-actions">
              <button className="btn-upgrade" onClick={handleUpgrade}>
                Upgrade la Premium
              </button>
              <button className="btn-cancel" onClick={() => setShowUpgradeModal(false)}>
                Mai târziu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVulMeu;
