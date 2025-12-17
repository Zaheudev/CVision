import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { generateCv } from '../../utils/api';
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
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { id: 1, name: 'Template 1', image: cv1 },
    { id: 2, name: 'Template 2', image: cv2 },
    { id: 3, name: 'Template 3', image: cv3 },
    { id: 4, name: 'Template 4', image: cv4 },
    { id: 5, name: 'Template 5', image: cv5 },
    { id: 6, name: 'Template 6', image: cv6 },
    { id: 7, name: 'Template 7', image: cv7 },
    { id: 8, name: 'Template 8', image: cv8 },
  ];

  const handleTemplateClick = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerateCV = async () => {
    if (!selectedTemplate) {
      alert('Te rog selectează un template mai întâi!');
      return;
    }

    try {
      const data = await generateCv();
      console.log("Generated CV Data:", data);
    } catch (err) {
      console.error("Error generating CV:", err);
    }
  };

  return (
    <div className="cv-container">
      <h1 className="cv-title">CV-ul Meu</h1>
      <div className="cv-templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cv-template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateClick(template.id)}
          >
            <img src={template.image} alt={template.name} className="cv-template-image" />
            <div className="cv-template-overlay">
              {selectedTemplate === template.id && (
                <div className="cv-selected-badge">✓</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="cv-generate-section">
        <button className="cv-generate-btn" onClick={handleGenerateCV}>
          Generează CV
        </button>
      </div>
    </div>
  );
};

export default CVulMeu;
